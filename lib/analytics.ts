"use client";

import { track } from "@vercel/analytics";

export function trackShiftAdded() {
  track("shift_added");
}

export function trackExportPdfClicked() {
  track("export_pdf_clicked");
}

export function trackExportCsvClicked() {
  track("export_csv_clicked");
}

export function trackProModalOpened() {
  track("pro_modal_opened");
}

export function trackWaitlistSubmitted() {
  track("waitlist_submitted");
}
