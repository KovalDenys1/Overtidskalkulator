"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Shift } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";
import { calcShiftHours } from "@/lib/calc";
import { formatHours, formatKr } from "@/lib/format";
import NumberField from "./NumberField";
import { ArrowUpIcon, CheckIcon, ChevronDownIcon, PlusIcon } from "./icons";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];
const pad = (n: number) => n.toString().padStart(2, "0");

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function nextDayISO(iso: string) {
  const next = new Date(`${iso}T12:00:00`);
  next.setDate(next.getDate() + 1);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
}

export default function ShiftForm({
  onAdd,
  isExample,
  totals,
}: {
  onAdd: (shift: Omit<Shift, "id">) => void;
  isExample: boolean;
  totals: { hours: number; pay: number; count: number };
}) {
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(16);
  const [endMinute, setEndMinute] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(30);
  const [justAdded, setJustAdded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Today's date only exists in the browser; the server render leaves the field empty.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate((d) => d || todayISO());
  }, []);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(t);
  }, [justAdded]);

  const startTime = `${pad(startHour)}:${pad(startMinute)}`;
  const endTime = `${pad(endHour)}:${pad(endMinute)}`;
  const shiftHours = calcShiftHours(startTime, endTime, breakMinutes);
  const overnight = endHour * 60 + endMinute <= startHour * 60 + startMinute;

  const iconMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
      };

  return (
    <section
      aria-labelledby="ny-vakt-tittel"
      className="rounded-2xl border border-transparent bg-surface p-4 shadow-card sm:p-5"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!date) return;
          onAdd({ date, startTime, endTime, breakMinutes });
          trackEvent("add_shift", {
            source: "main_form",
            replacedExample: isExample,
            device: window.innerWidth < 768 ? "mobile" : "desktop",
          });
          setJustAdded(true);
          setDate(nextDayISO(date));
        }}
      >
        <h2 id="ny-vakt-tittel" className="text-lg font-semibold leading-tight">
          Legg til vakt
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
          <div className="col-span-2 space-y-1.5">
            <label htmlFor="vakt-dato" className="block text-sm font-medium text-ink">
              Dato
            </label>
            <input
              id="vakt-dato"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="field appearance-none px-3"
              required
            />
          </div>

          <TimeFieldset
            legend="Start"
            hour={startHour}
            minute={startMinute}
            onHour={setStartHour}
            onMinute={setStartMinute}
          />
          <TimeFieldset legend="Slutt" hour={endHour} minute={endMinute} onHour={setEndHour} onMinute={setEndMinute} />

          <div className="col-span-2 space-y-1.5">
            <label htmlFor="vakt-pause" className="block text-sm font-medium text-ink">
              Ubetalt pause (minutter)
            </label>
            <NumberField
              id="vakt-pause"
              value={breakMinutes}
              onValue={(n) => setBreakMinutes(Math.round(n))}
              decimals={false}
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-muted tabular-nums" aria-live="polite">
          {overnight ? "Vakten går over midnatt og blir " : "Vakten blir "}
          <strong className="font-semibold text-ink">{formatHours(shiftHours)}</strong> etter pause.
        </p>

        <button
          type="submit"
          className={`press mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl ps-4 pe-5 text-base font-semibold text-white ${
            justAdded ? "bg-positive" : "bg-accent hover:bg-accent-strong"
          }`}
        >
          <span className="grid size-5 place-items-center">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={justAdded ? "added" : "add"}
                {...iconMotion}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="[grid-area:1/1]"
              >
                {justAdded ? <CheckIcon className="size-5" /> : <PlusIcon className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </span>
          {justAdded ? "Lagt til" : isExample ? "Legg til første vakt" : "Legg til vakt"}
        </button>

        <p role="status" className="sr-only">
          {justAdded
            ? `Vakten er lagt til. Totalt ${formatKr(totals.pay)} før skatt for ${formatHours(totals.hours)}.`
            : ""}
        </p>

        {!isExample && totals.count > 0 && (
          <a
            href="#resultat"
            className="mt-3 flex min-h-11 items-center justify-center gap-1.5 rounded-lg text-sm text-muted tabular-nums hover:text-ink lg:hidden"
          >
            <span>
              Så langt: {formatHours(totals.hours)} · <strong className="font-semibold text-ink">{formatKr(totals.pay)}</strong>
            </span>
            <ArrowUpIcon className="size-3.5" />
          </a>
        )}
      </form>
    </section>
  );
}

function TimeFieldset({
  legend,
  hour,
  minute,
  onHour,
  onMinute,
}: {
  legend: string;
  hour: number;
  minute: number;
  onHour: (n: number) => void;
  onMinute: (n: number) => void;
}) {
  return (
    <fieldset className="min-w-0 space-y-1.5">
      <legend className="mb-1.5 text-sm font-medium text-ink">{legend}</legend>
      <div className="flex items-center gap-1.5">
        <Select label={`${legend}, time`} value={hour} onChange={onHour} options={HOURS} />
        <span aria-hidden="true" className="font-semibold text-muted">
          :
        </span>
        <Select label={`${legend}, minutt`} value={minute} onChange={onMinute} options={MINUTES} />
      </div>
    </fieldset>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  options: number[];
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="field appearance-none ps-3 pe-8"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {pad(o)}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute inset-y-0 end-2.5 my-auto size-4 text-muted" />
    </div>
  );
}
