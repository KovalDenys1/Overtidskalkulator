"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CalcResult, Shift } from "@/lib/types";
import { calcShiftHours } from "@/lib/calc";
import { formatDateLong, formatDateShort, formatHours } from "@/lib/format";
import { TrashIcon } from "./icons";

export default function ShiftList({
  shifts,
  byDate,
  isExample,
  onDelete,
  onClear,
  onShowExample,
}: {
  shifts: Shift[];
  byDate: CalcResult["byDate"];
  isExample: boolean;
  onDelete: (id: string) => void;
  onClear: () => void;
  onShowExample: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [confirmingClear, setConfirmingClear] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // The pressed button leaves the DOM, so focus would fall back to the page start.
  const focusHeading = () => requestAnimationFrame(() => headingRef.current?.focus());
  const sorted = [...shifts].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
  const seenDates = new Set<string>();

  useEffect(() => {
    if (!confirmingClear) return;
    const timeout = setTimeout(() => setConfirmingClear(false), 4000);
    return () => clearTimeout(timeout);
  }, [confirmingClear]);

  const row = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.15, ease: "easeOut" as const } },
      };

  return (
    <section
      aria-labelledby="vakter-tittel"
      className="rounded-2xl border border-transparent bg-surface p-4 shadow-card sm:p-5"
    >
      <div className="flex min-h-11 items-center justify-between gap-3">
        <h2 id="vakter-tittel" ref={headingRef} tabIndex={-1} className="text-lg font-semibold leading-tight">
          {isExample ? "Vakter i eksempelet" : "Dine vakter"}{" "}
          {shifts.length > 0 && <span className="font-normal text-muted tabular-nums">{shifts.length}</span>}
        </h2>
        {!isExample && shifts.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirmingClear) {
                onClear();
                setConfirmingClear(false);
                focusHeading();
              } else {
                setConfirmingClear(true);
              }
            }}
            className={`press inline-flex min-h-11 items-center rounded-xl border px-3.5 text-sm font-semibold ${
              confirmingClear
                ? "border-danger bg-danger text-white"
                : "border-line bg-surface text-danger hover:border-danger/40 hover:bg-danger/5"
            }`}
          >
            {confirmingClear ? "Trykk igjen for å tømme" : "Tøm alt"}
          </button>
        )}
      </div>

      {shifts.length === 0 ? (
        <div className="mt-2 flex flex-col items-start gap-3 rounded-xl bg-canvas p-4">
          <p className="text-sm text-muted">Ingen vakter ennå. Legg inn den første i skjemaet over.</p>
          <button
            type="button"
            onClick={onShowExample}
            className="press inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-3.5 text-sm font-semibold text-ink hover:border-field"
          >
            Vis eksempelet igjen
          </button>
        </div>
      ) : (
        <ul className="relative mt-2">
          <AnimatePresence initial={false} mode="popLayout">
            {sorted.map((shift) => {
              const hours = calcShiftHours(shift.startTime, shift.endTime, shift.breakMinutes);
              const dailyOvertime = !seenDates.has(shift.date) ? (byDate[shift.date]?.dailyOvertime ?? 0) : 0;
              seenDates.add(shift.date);
              return (
                <motion.li
                  key={shift.id}
                  layout={reduceMotion ? false : "position"}
                  {...row}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex min-h-16 items-center gap-3 border-t border-line bg-surface py-2.5 first:border-t-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{formatDateShort(shift.date)}</p>
                    <p className="text-sm text-muted tabular-nums">
                      {shift.startTime}–{shift.endTime} · {shift.breakMinutes} min pause
                    </p>
                  </div>
                  <div className="shrink-0 text-end">
                    <p className="font-semibold tabular-nums">{formatHours(hours)}</p>
                    {dailyOvertime > 0 && (
                      <p className="text-xs font-medium text-accent-strong tabular-nums">
                        +{formatHours(dailyOvertime)} overtid
                      </p>
                    )}
                  </div>
                  {!isExample && (
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(shift.id);
                        focusHeading();
                      }}
                      aria-label={`Slett vakten ${formatDateLong(shift.date)} ${shift.startTime}–${shift.endTime}`}
                      className="press -me-2 grid size-11 shrink-0 place-items-center rounded-xl text-muted hover:bg-danger/5 hover:text-danger"
                    >
                      <TrashIcon className="size-[18px]" />
                    </button>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
