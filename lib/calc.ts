import type { Shift, Settings, CalcResult } from "./types";

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function parseTimeToMinutes(t: string): number {
  const [hh, mm] = t.split(":").map(Number);
  if (isNaN(hh) || isNaN(mm)) return 0;
  return hh * 60 + mm;
}

/**
 * Handles overnight shifts: if end <= start, assume it ends next day.
 */
function calcShiftMinutes(start: string, end: string) {
  const s = parseTimeToMinutes(start);
  const e = parseTimeToMinutes(end);
  if (e <= s) return (e + 24 * 60) - s;
  return e - s;
}

/**
 * Calculates shift hours after break (exported for UI display).
 * Uses the same logic as calcOvertid.
 */
export function calcShiftHours(startTime: string, endTime: string, breakMinutes: number): number {
  const rawMinutes = calcShiftMinutes(startTime, endTime);
  const validBreak = Math.max(0, breakMinutes || 0);
  const minutes = Math.max(0, rawMinutes - validBreak);
  return minutes / 60;
}

/**
 * Gets ISO week string (e.g., "2026-W02") from YYYY-MM-DD date.
 * ISO week starts on Monday (week 1 is the week containing Jan 4).
 */
function getISOWeek(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  if (isNaN(date.getTime())) return "0000-W00"; // Invalid date fallback
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = d.getUTCDay() || 7; // 1 = Monday, 7 = Sunday
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek); // Thursday of current week
  const year = d.getUTCFullYear();
  if (isNaN(year)) return "0000-W00"; // Safety check
  const jan4 = new Date(Date.UTC(year, 0, 4));
  jan4.setUTCDate(jan4.getUTCDate() - (jan4.getUTCDay() || 7) + 1); // Monday of week containing Jan 4
  const weekNo = Math.ceil(((d.getTime() - jan4.getTime()) / 86400000 + 1) / 7);
  return `${year}-W${weekNo.toString().padStart(2, "0")}`;
}

export function calcOvertid(shifts: Shift[], settings: Settings): CalcResult {
  const { hourlyRate, overtimeMultiplier, dailyLimitHours, weeklyLimitHours } = settings;

  const byDate: Record<string, { hours: number; dailyOvertime: number }> = {};

  for (const sh of shifts) {
    const rawMinutes = calcShiftMinutes(sh.startTime, sh.endTime);
    const validBreak = Math.max(0, sh.breakMinutes || 0);
    const minutes = Math.max(0, rawMinutes - validBreak);
    const hours = minutes / 60;

    if (!byDate[sh.date]) byDate[sh.date] = { hours: 0, dailyOvertime: 0 };
    byDate[sh.date].hours += hours;
  }

  // daily overtime
  let dailyOvertimeSum = 0;
  for (const d of Object.keys(byDate)) {
    const h = byDate[d].hours;
    const dailyOver = Math.max(0, h - dailyLimitHours);
    byDate[d].dailyOvertime = dailyOver;
    dailyOvertimeSum += dailyOver;
  }

  // weekly overtime: group by ISO week
  const byWeek: Record<string, number> = {};
  for (const sh of shifts) {
    const isoWeek = getISOWeek(sh.date);
    const rawMinutes = calcShiftMinutes(sh.startTime, sh.endTime);
    const validBreak = Math.max(0, sh.breakMinutes || 0);
    const minutes = Math.max(0, rawMinutes - validBreak);
    const hours = minutes / 60;
    if (!byWeek[isoWeek]) byWeek[isoWeek] = 0;
    byWeek[isoWeek] += hours;
  }

  const weekly: Array<{ isoWeek: string; hours: number; overtime: number }> = [];
  let weeklyOvertimeSum = 0;
  for (const [isoWeek, hours] of Object.entries(byWeek)) {
    const overtime = Math.max(0, hours - weeklyLimitHours);
    weeklyOvertimeSum += overtime;
    weekly.push({
      isoWeek,
      hours: round2(hours),
      overtime: round2(overtime),
    });
  }
  weekly.sort((a, b) => a.isoWeek.localeCompare(b.isoWeek));

  const totalHours = Object.values(byDate).reduce((a, v) => a + v.hours, 0);
  const weeklyHours = totalHours; // total for backward compatibility

  // avoid double counting: take the larger of daily sum vs weekly overtime sum
  const overtimeHours = Math.max(dailyOvertimeSum, weeklyOvertimeSum);
  const ordinaryHours = Math.max(0, totalHours - overtimeHours);

  const basePay = totalHours * hourlyRate;
  const overtimeExtra = overtimeHours * hourlyRate * (overtimeMultiplier - 1);
  const totalPay = basePay + overtimeExtra;

  return {
    totalHours: round2(totalHours),
    overtimeHours: round2(overtimeHours),
    ordinaryHours: round2(ordinaryHours),
    basePay: round2(basePay),
    overtimeExtra: round2(overtimeExtra),
    totalPay: round2(totalPay),
    byDate: Object.fromEntries(
      Object.entries(byDate).map(([k, v]) => [k, { hours: round2(v.hours), dailyOvertime: round2(v.dailyOvertime) }])
    ),
    weeklyHours: round2(weeklyHours),
    weeklyOvertime: round2(weeklyOvertimeSum), // backward compatibility: sum of weekly overtime
    weeklyOvertimeSum: round2(weeklyOvertimeSum),
    dailyOvertimeSum: round2(dailyOvertimeSum),
    weekly,
  };
}
