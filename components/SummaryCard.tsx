"use client";

import type { CalcResult, Shift, Settings } from "@/lib/types";
import { exportToPDF, exportToCSV } from "@/lib/export";
import { trackEvent } from "@/lib/analytics";
import { formatHours, formatKr, formatPercent, formatPeriod, isoWeekLabel } from "@/lib/format";
import AnimatedNumber from "./AnimatedNumber";
import { DownloadIcon } from "./icons";

function formatPlusKr(n: number) {
  return `+${formatKr(n)}`;
}

function device() {
  return typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
}

export default function SummaryCard({
  result,
  shifts,
  settings,
  isExample,
  animateNumbers,
  onStartOwn,
}: {
  result: CalcResult;
  shifts: Shift[];
  settings: Settings;
  isExample: boolean;
  animateNumbers: boolean;
  onStartOwn: () => void;
}) {
  const hasShifts = shifts.length > 0;
  const dates = shifts.map((s) => s.date).sort();
  const period = hasShifts ? formatPeriod(dates[0], dates[dates.length - 1]) : "";
  const weekLabel =
    result.weekly.length === 1 ? isoWeekLabel(result.weekly[0].isoWeek) : `${result.weekly.length} uker`;
  const instant = !animateNumbers;

  const handleExport = (kind: "pdf" | "csv") => {
    trackEvent(kind === "pdf" ? "export_pdf_clicked" : "export_csv_clicked", {
      source: "summary_card",
      example: isExample,
      device: device(),
    });
    if (kind === "pdf") exportToPDF(shifts, settings, result);
    else exportToCSV(shifts, settings, result);
  };

  return (
    <section
      id="resultat"
      aria-labelledby="resultat-tittel"
      className="rounded-3xl border border-transparent bg-surface p-2 shadow-raised"
    >
      <div className="rounded-2xl bg-accent-soft px-4 pb-5 pt-4 sm:px-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="resultat-tittel" className="text-sm font-semibold text-accent-strong">
            {isExample ? "Eksempel" : "Resultat"}
          </h2>
          {hasShifts && (
            <p className="text-sm text-muted tabular-nums">
              {weekLabel} · {period}
            </p>
          )}
        </div>
        <p className="mt-4 text-sm text-muted">Totalt før skatt</p>
        <p className="mt-0.5 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.02em] tabular-nums sm:text-5xl">
          <AnimatedNumber value={result.totalPay} format={formatKr} instant={instant} />
        </p>
        <p className="mt-2 text-sm text-ink">
          Herav overtidstillegg{" "}
          <strong className="font-semibold tabular-nums">
            <AnimatedNumber value={result.overtimeExtra} format={formatPlusKr} instant={instant} />
          </strong>
        </p>
      </div>

      {isExample && (
        <div className="flex flex-col gap-3 px-3 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <p className="text-sm text-muted">
            En uke med 45 timer og to lange dager. Den første vakten du legger inn, erstatter eksempelet.
          </p>
          <button
            type="button"
            onClick={onStartOwn}
            className="press inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Legg inn egne vakter
          </button>
        </div>
      )}

      <div className="space-y-5 px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Timer" value={result.totalHours} instant={instant} />
          <Stat label="Ordinære" value={result.ordinaryHours} instant={instant} />
          <Stat label="Overtid" value={result.overtimeHours} instant={instant} accent={result.overtimeHours > 0} />
        </dl>

        <dl className="space-y-2.5 text-sm">
          <Line
            label="Grunnlønn"
            detail={`${formatHours(result.totalHours)} × ${formatKr(settings.hourlyRate)}`}
            value={result.basePay}
            instant={instant}
          />
          <Line
            label="Overtidstillegg"
            detail={`${formatHours(result.overtimeHours)} × ${formatPercent(settings.overtimeMultiplier)}`}
            value={result.overtimeExtra}
            instant={instant}
          />
        </dl>

        <div className="rounded-xl bg-canvas p-3 text-sm text-muted">
          <h3 className="font-medium text-ink">Slik er overtiden regnet</h3>
          <p className="mt-1">
            {!hasShifts
              ? "Legg inn en vakt, så ser du regnestykket her."
              : result.overtimeHours === 0
                ? `Ingen timer over ${formatHours(settings.dailyLimitHours)} per dag eller ${formatHours(settings.weeklyLimitHours)} per uke.`
                : `Over ${formatHours(settings.dailyLimitHours)} per dag: ${formatHours(result.dailyOvertimeSum)}. Over ${formatHours(settings.weeklyLimitHours)} per uke: ${formatHours(result.weeklyOvertimeSum)}. Det høyeste tallet teller, så samme time ikke telles to ganger.`}
          </p>
          {result.weekly.length > 1 && (
            <ul className="mt-2 space-y-0.5 tabular-nums">
              {result.weekly.map((w) => (
                <li key={w.isoWeek}>
                  {isoWeekLabel(w.isoWeek)}: {formatHours(w.hours)}
                  {w.overtime > 0 && `, ${formatHours(w.overtime)} over ukegrensen`}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ExportButton disabled={!hasShifts} onClick={() => handleExport("pdf")} label="PDF-rapport" />
          <ExportButton disabled={!hasShifts} onClick={() => handleExport("csv")} label="CSV-fil" />
        </div>

        <p className="text-xs leading-normal text-muted">
          Brutto, før skatt. Veiledende beregning – arbeidsavtalen eller tariffavtalen din kan ha andre grenser og
          satser.
        </p>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  instant,
  accent = false,
}: {
  label: string;
  value: number;
  instant: boolean;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl bg-canvas px-3 py-2.5">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd
        className={`mt-0.5 text-lg font-semibold tabular-nums transition-[color] duration-150 ease-out ${
          accent ? "text-accent-strong" : "text-ink"
        }`}
      >
        <AnimatedNumber value={value} format={formatHours} instant={instant} />
      </dd>
    </div>
  );
}

function Line({ label, detail, value, instant }: { label: string; detail: string; value: number; instant: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="min-w-0">
        <span className="font-medium text-ink">{label}</span>{" "}
        <span className="text-muted tabular-nums">{detail}</span>
      </dt>
      <dd className="shrink-0 font-semibold tabular-nums">
        <AnimatedNumber value={value} format={formatKr} instant={instant} />
      </dd>
    </div>
  );
}

function ExportButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface ps-3.5 pe-4 text-sm font-semibold text-ink hover:border-field hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-50"
    >
      <DownloadIcon className="size-4 text-muted" />
      {label}
    </button>
  );
}
