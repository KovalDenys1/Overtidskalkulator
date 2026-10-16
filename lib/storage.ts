import type { Shift, Settings } from "./types";

export const SHIFTS_KEY = "overtid_shifts_v1";
export const SETTINGS_KEY = "overtid_settings_v1";

export const defaultSettings: Settings = {
  hourlyRate: 250,
  overtimeMultiplier: 1.4,
  dailyLimitHours: 9,
  weeklyLimitHours: 40,
  weekStartsMonday: true,
};

export function loadShifts(): Shift[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SHIFTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Shift[]) : [];
  } catch {
    return [];
  }
}

export function saveShifts(shifts: Shift[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
  } catch {
    // Private mode or full storage: the calculator still works for this visit.
  }
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? ({ ...defaultSettings, ...(JSON.parse(raw) as Partial<Settings>) } as Settings) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // See saveShifts.
  }
}

// Runs in <head> before first paint: marks the page when saved data will replace the server-rendered example.
export const savedStateScript = `try{var s=localStorage.getItem(${JSON.stringify(SHIFTS_KEY)}),t=localStorage.getItem(${JSON.stringify(
  SETTINGS_KEY
)}),d=document.documentElement;if((s&&s!=="[]")||(t&&t!==${JSON.stringify(
  JSON.stringify(defaultSettings)
)})){d.classList.add("ot-saved");setTimeout(function(){d.classList.add("ot-reveal")},3000)}}catch(e){}`;
