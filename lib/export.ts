import type { Shift, Settings, CalcResult } from "./types";
import { calcShiftHours } from "./calc";

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV(shifts: Shift[], settings: Settings): void {
  const { hourlyRate, overtimeMultiplier, dailyLimitHours } = settings;

  // Headers
  const headers = [
    "Dato",
    "Start",
    "Slutt",
    "Pause (min)",
    "Timer",
    "Overtid (timer)",
    "Timesats",
    "Overtidstillegg",
    "Sum (kr)",
  ];

  // Sort shifts by date
  const sortedShifts = [...shifts].sort((a, b) => a.date.localeCompare(b.date));

  // Calculate rows
  const rows = sortedShifts.map((shift) => {
    const hours = calcShiftHours(shift.startTime, shift.endTime, shift.breakMinutes);
    const overtime = Math.max(0, hours - dailyLimitHours);
    const ordinaryPay = hours * hourlyRate;
    const overtimePay = overtime * hourlyRate * (overtimeMultiplier - 1);
    const sum = ordinaryPay + overtimePay;

    return [
      shift.date,
      shift.startTime,
      shift.endTime,
      shift.breakMinutes,
      hours.toFixed(2),
      overtime > 0 ? overtime.toFixed(2) : "",
      hourlyRate,
      `${((overtimeMultiplier - 1) * 100).toFixed(0)}%`,
      sum.toFixed(2),
    ];
  });

  // Create CSV content
  const csvLines = [headers.map(escapeCsvValue).join(",")];
  rows.forEach((row) => {
    csvLines.push(row.map(escapeCsvValue).join(","));
  });

  const csvContent = csvLines.join("\n");

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `overtidsrapport_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToPDF(shifts: Shift[], settings: Settings, result: CalcResult): void {
  // Store data in localStorage for the print page
  if (typeof window === "undefined") return;
  localStorage.setItem(
    "overtid_print_payload_v1",
    JSON.stringify({
      shifts,
      settings,
      result,
    })
  );
  window.open("/print", "_blank");
}

