"use client";

import { useState, useEffect } from "react";
import type { CalcResult, Shift, Settings } from "@/lib/types";
import { loadIsPro, incrementMetric } from "@/lib/storage";
import { exportToPDF, exportToCSV } from "@/lib/export";
import { trackExportPdfClicked, trackExportCsvClicked, trackEvent } from "@/lib/analytics";
import ProModal from "./ProModalResolved";

export default function SummaryCard({
  result,
  shifts,
  settings,
}: {
  result: CalcResult;
  shifts: Shift[];
  settings: Settings;
}) {
  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

  useEffect(() => {
    setIsPro(loadIsPro());
  }, []);

  const handlePDFClick = () => {
    if (isPro) {
      incrementMetric("export_pdf_click_count");
      trackExportPdfClicked();
      exportToPDF(shifts, settings, result);
    } else {
      const device = typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "desktop";
      trackEvent("open_pro_modal", { source: "summary_card", type: "pdf", device });
      setShowProModal(true);
    }
  };

  const handleCSVClick = () => {
    if (isPro) {
      incrementMetric("export_csv_click_count");
      trackExportCsvClicked();
      exportToCSV(shifts, settings);
    } else {
      const device = typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "desktop";
      trackEvent("open_pro_modal", { source: "summary_card", type: "csv", device });
      setShowProModal(true);
    }
  };
  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-3">
      <h2 className="text-lg font-semibold">Oppsummering</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Totale timer" value={`${result.totalHours}`} />
        <Stat label="Ordinære timer" value={`${result.ordinaryHours}`} />
        <Stat label="Overtidstimer" value={`${result.overtimeHours}`} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Grunnlønn" value={`${result.basePay} kr`} />
        <Stat
          label="Overtidstillegg"
          value={`${result.overtimeExtra} kr`}
          helperText="Ekstra betaling for overtid (40%/50%/100%)"
        />
        <div className="space-y-2">
          <Stat label="Totalt (brutto)" value={`${result.totalPay} kr`} highlight />
          <button
            className="w-full rounded-xl border px-3 py-2 font-medium hover:bg-black/5 text-sm"
            onClick={handlePDFClick}
            type="button"
          >
            PDF-rapport (Pro – kommer snart)
          </button>
          <button
            className="w-full rounded-xl border px-3 py-2 font-medium hover:bg-black/5 text-sm"
            onClick={handleCSVClick}
            type="button"
          >
            CSV-rapport (Pro – kommer snart)
          </button>
        </div>
      </div>

      <ProModal isOpen={showProModal} onClose={() => setShowProModal(false)} shifts={shifts} settings={settings} result={result} />

      <div className="space-y-2 text-xs text-gray-700">
        <div>
          Daglig overtid (sum): <b>{result.dailyOvertimeSum}</b> t • Ukentlig overtid (sum): <b>{result.weeklyOvertimeSum}</b> t
          <br />
          <span className="text-gray-600">
            Vi bruker største av daglig/ukentlig for å unngå dobbelttelling av samme timer.
          </span>
        </div>
        {result.weekly.length > 0 && (
          <div className="space-y-1">
            <div className="font-medium">Uker:</div>
            <div className="space-y-0.5">
              {result.weekly.map((w) => (
                <div key={w.isoWeek}>
                  {w.isoWeek}: {w.hours}t {w.overtime > 0 && <span>({w.overtime}t overtid)</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  helperText,
  highlight,
}: {
  label: string;
  value: string;
  helperText?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-3 ${highlight ? "bg-blue-50 border-2 border-blue-400" : ""}`}>
      <div className="text-xs font-medium text-gray-600">{label}</div>
      <div className={`font-semibold ${highlight ? "text-xl" : "text-lg"}`}>{value}</div>
      {helperText && <div className="text-xs text-gray-600 mt-1">{helperText}</div>}
    </div>
  );
}
