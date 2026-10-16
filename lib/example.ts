import type { Shift } from "./types";

// 8 + 8 + 10,5 + 9,5 + 9 = 45 t: two long days over the daily limit and 5 t over the weekly one.
const EXAMPLE_DAYS: Array<Omit<Shift, "id" | "date">> = [
  { startTime: "07:30", endTime: "16:00", breakMinutes: 30 },
  { startTime: "07:30", endTime: "16:00", breakMinutes: 30 },
  { startTime: "07:30", endTime: "18:30", breakMinutes: 30 },
  { startTime: "07:30", endTime: "17:30", breakMinutes: 30 },
  { startTime: "07:30", endTime: "17:00", breakMinutes: 30 },
];

// Fixed Monday for the server render; the browser swaps in last week's dates after hydration.
export const EXAMPLE_ANCHOR = "2026-10-05";

function toISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function lastFullWeekMonday(today: Date) {
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  const weekday = monday.getDay() || 7;
  monday.setDate(monday.getDate() - (weekday - 1) - 7);
  return monday;
}

export function exampleShifts(anchor: Date | string = EXAMPLE_ANCHOR): Shift[] {
  const monday =
    typeof anchor === "string"
      ? new Date(`${anchor}T12:00:00`)
      : lastFullWeekMonday(anchor);
  return EXAMPLE_DAYS.map((day, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return { ...day, id: `example-${i}`, date: toISO(date) };
  });
}
