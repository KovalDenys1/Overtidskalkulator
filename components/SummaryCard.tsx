"use client";

import { useState, useEffect } from "react";
import type { CalcResult, Shift, Settings } from "@/lib/types";
import { loadIsPro, incrementMetric } from "@/lib/storage";
import { exportToPDF, exportToCSV } from "@/lib/export";
import { trackExportPdfClicked, trackExportCsvClicked, trackProModalOpened } from "@/lib/analytics";
import ProModal from "./ProModal";

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
      trackProModalOpened();
      setShowProModal(true);
    }
  };

  const handleCSVClick = () => {
    if (isPro) {
      incrementMetric("export_csv_click_count");
      trackExportCsvClicked();
      exportToCSV(shifts, settings);
    } else {
      trackProModalOpened();
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
          helperText="Ekstra betaling for overtidstimer"
        />
        <div className="space-y-2">
          <Stat label="Totalt å få utbetalt" value={`${result.totalPay} kr`} highlight />
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

      <div className="space-y-2 text-xs opacity-70">
        <div>
          Daglig overtid (sum): <b>{result.dailyOvertimeSum}</b> t • Ukentlig overtid (sum): <b>{result.weeklyOvertimeSum}</b> t
          <br />
          <span className="opacity-60">
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
    <div className={`rounded-xl border p-3 ${highlight ? "bg-black/5 border-2 border-black/20" : ""}`}>
      <div className="text-xs opacity-70">{label}</div>
      <div className={`font-semibold ${highlight ? "text-xl" : "text-lg"}`}>{value}</div>
      {helperText && <div className="text-xs opacity-60 mt-1">{helperText}</div>}
    </div>
  );
}
