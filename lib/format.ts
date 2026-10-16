// Hand-rolled instead of Intl so the server render and the browser always produce the same text.
const NBSP = " ";
const WEEKDAYS = ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."];
const WEEKDAYS_LONG = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
const MONTHS = ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."];
const MONTHS_LONG = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

function groupThousands(digits: string) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export function formatKr(value: number) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "−" : "";
  return `${sign}${groupThousands(String(Math.abs(rounded)))}${NBSP}kr`;
}

export function formatNumber(value: number, maxDecimals = 2) {
  const factor = 10 ** maxDecimals;
  const rounded = Math.round(value * factor) / factor;
  const [int, dec] = String(Math.abs(rounded)).split(".");
  const sign = rounded < 0 ? "−" : "";
  return `${sign}${groupThousands(int)}${dec ? `,${dec}` : ""}`;
}

export function formatHours(value: number) {
  return `${formatNumber(value)}${NBSP}t`;
}

export function formatPercent(multiplier: number) {
  return `${formatNumber((multiplier - 1) * 100, 0)}${NBSP}%`;
}

function parseISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function formatDateShort(iso: string) {
  const date = parseISODate(iso);
  if (isNaN(date.getTime())) return iso;
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()}. ${MONTHS[date.getMonth()]}`;
}

export function formatDateLong(iso: string) {
  const date = parseISODate(iso);
  if (isNaN(date.getTime())) return iso;
  return `${WEEKDAYS_LONG[date.getDay()]} ${date.getDate()}. ${MONTHS_LONG[date.getMonth()]}`;
}

export function formatPeriod(fromISO: string, toISO: string) {
  const from = parseISODate(fromISO);
  const to = parseISODate(toISO);
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return "";
  if (fromISO === toISO) return `${from.getDate()}. ${MONTHS[from.getMonth()]}`;
  if (from.getFullYear() === to.getFullYear() && from.getMonth() === to.getMonth()) {
    return `${from.getDate()}.–${to.getDate()}. ${MONTHS[to.getMonth()]}`;
  }
  return `${from.getDate()}. ${MONTHS[from.getMonth()]} – ${to.getDate()}. ${MONTHS[to.getMonth()]}`;
}

export function isoWeekLabel(isoWeek: string) {
  const week = Number(isoWeek.split("-W")[1]);
  return Number.isFinite(week) ? `Uke ${week}` : isoWeek;
}
