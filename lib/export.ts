import type { Shift, Settings, CalcResult } from "./types";
import { calcShiftHours } from "./calc";

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV(shifts: Shift[], settings: Settings, result: CalcResult): void {
  const { hourlyRate, overtimeMultiplier } = settings;

  // Headers
  const headers = ["Dato", "Start", "Slutt", "Pause (min)", "Timer"];

  // Sort shifts by date
  const sortedShifts = [...shifts].sort((a, b) => a.date.localeCompare(b.date));

  // Per-shift rows show raw worked hours only. Overtime/pay are NOT split per
  // row here: calcOvertid() reconciles daily vs. weekly limits by taking
  // Math.max(dailyOvertimeSum, weeklyOvertimeSum) across the whole period, so
  // there is no single-shift overtime figure that would sum back to that
  // total in every case. Summing per-row estimates (as this used to do) could
  // silently disagree with the totals shown on screen. Instead, mirror
  // exportToPDF()/print page: raw hours per row, accurate totals from the
  // already-reconciled CalcResult below.
  const rows = sortedShifts.map((shift) => {
    const hours = calcShiftHours(shift.startTime, shift.endTime, shift.breakMinutes);
    return [shift.date, shift.startTime, shift.endTime, shift.breakMinutes, hours.toFixed(2)];
  });

  const summaryRows = [
    [],
    ["Oppsummering"],
    ["Totale timer", result.totalHours],
    ["Ordinære timer", result.ordinaryHours],
    ["Overtidstimer", result.overtimeHours],
    ["Timesats", hourlyRate],
    ["Overtidstillegg", `${((overtimeMultiplier - 1) * 100).toFixed(0)}%`],
    ["Grunnlønn (kr)", result.basePay.toFixed(2)],
    ["Overtidstillegg (kr)", result.overtimeExtra.toFixed(2)],
    ["Totalt (kr)", result.totalPay.toFixed(2)],
  ];

  // Create CSV content
  const csvLines = [headers.map(escapeCsvValue).join(",")];
  rows.forEach((row) => {
    csvLines.push(row.map(escapeCsvValue).join(","));
  });
  summaryRows.forEach((row) => {
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

