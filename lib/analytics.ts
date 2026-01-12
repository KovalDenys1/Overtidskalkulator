"use client";

/**
 * Send a tracked event to Vercel Web Analytics if available.
 * Guarded: if `window.va` is missing nothing happens.
 */
export function trackEvent(eventName: string, payload?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && (window as any).va && typeof (window as any).va.track === "function") {
      (window as any).va.track(eventName, payload ?? {});
    }
  } catch {
    // guard: ignore any errors when analytics unavailable
  }
}

// Backwards compatible small helpers (use `trackEvent` wherever possible)
// DEPRECATED: keep these wrappers for compatibility; TODO: remove later and update callers to use `trackEvent` directly.
export const trackShiftAdded = () => trackEvent("shift_added");
export const trackExportPdfClicked = () => trackEvent("export_pdf_clicked");
export const trackExportCsvClicked = () => trackEvent("export_csv_clicked");
export const trackProModalOpened = () => trackEvent("pro_modal_opened");
export const trackWaitlistSubmitted = () => trackEvent("waitlist_submitted");
