import type { Shift, Settings } from "./types";

const SHIFTS_KEY = "overtid_shifts_v1";
const SETTINGS_KEY = "overtid_settings_v1";
const PRO_KEY = "overtid_pro_v1";
const WAITLIST_KEY = "overtid_waitlist_v1";
const METRICS_KEY = "overtid_metrics_v1";

export type Metrics = {
  pro_modal_open_count: number;
  pro_send_count: number;
  export_pdf_click_count: number;
  export_csv_click_count: number;
};

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
    return raw ? (JSON.parse(raw) as Shift[]) : [];
  } catch {
    return [];
  }
}

export function saveShifts(shifts: Shift[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
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
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadIsPro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(PRO_KEY);
    return raw === "true";
  } catch {
    return false;
  }
}

export function saveIsPro(isPro: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRO_KEY, String(isPro));
}

export function saveWaitlistEmail(email: string) {
  if (typeof window === "undefined") return;
  const existing = loadWaitlistEmails();
  if (!existing.includes(email)) {
    existing.push(email);
    localStorage.setItem(WAITLIST_KEY, JSON.stringify(existing));
  }
}

export function loadWaitlistEmails(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WAITLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function loadMetrics(): Metrics {
  if (typeof window === "undefined")
    return {
      pro_modal_open_count: 0,
      pro_send_count: 0,
      export_pdf_click_count: 0,
      export_csv_click_count: 0,
    };
  try {
    const raw = localStorage.getItem(METRICS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Metrics>;
      return {
        pro_modal_open_count: parsed.pro_modal_open_count || 0,
        pro_send_count: parsed.pro_send_count || 0,
        export_pdf_click_count: parsed.export_pdf_click_count || 0,
        export_csv_click_count: parsed.export_csv_click_count || 0,
      };
    }
  } catch {
    // Invalid data
  }
  return {
    pro_modal_open_count: 0,
    pro_send_count: 0,
    export_pdf_click_count: 0,
    export_csv_click_count: 0,
  };
}

export function incrementMetric(key: keyof Metrics) {
  if (typeof window === "undefined") return;
  const metrics = loadMetrics();
  metrics[key] = (metrics[key] || 0) + 1;
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
}
