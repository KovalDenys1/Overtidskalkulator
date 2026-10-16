"use client";

import type { Settings } from "@/lib/types";
import { defaultSettings } from "@/lib/storage";
import NumberField from "./NumberField";
import { ChevronDownIcon, ResetIcon } from "./icons";

const MULTIPLIERS = [
  { value: 1.4, label: "40 % – lovens minimum" },
  { value: 1.5, label: "50 %" },
  { value: 2, label: "100 %" },
];

export default function SettingsPanel({
  settings,
  onChange,
  onReset,
}: {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onReset: () => void;
}) {
  const isDefault =
    settings.hourlyRate === defaultSettings.hourlyRate &&
    settings.overtimeMultiplier === defaultSettings.overtimeMultiplier &&
    settings.dailyLimitHours === defaultSettings.dailyLimitHours &&
    settings.weeklyLimitHours === defaultSettings.weeklyLimitHours;

  return (
    <section
      aria-labelledby="innstillinger-tittel"
      className="rounded-2xl border border-transparent bg-surface p-4 shadow-card sm:p-5"
    >
      <div className="flex min-h-11 items-center justify-between gap-3">
        <h2 id="innstillinger-tittel" className="text-lg font-semibold leading-tight">
          Lønn og grenser
        </h2>
        <button
          type="button"
          onClick={onReset}
          disabled={isDefault}
          className="press inline-flex min-h-11 items-center gap-1.5 rounded-xl ps-3 pe-3.5 text-sm font-semibold text-muted hover:bg-black/[0.04] hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ResetIcon className="size-4" />
          Tilbakestill
        </button>
      </div>

      <div className="mt-3 grid gap-x-3 gap-y-4 sm:grid-cols-2">
        <Field id="timelonn" label="Timelønn (kr)">
          <NumberField id="timelonn" value={settings.hourlyRate} onValue={(n) => onChange({ hourlyRate: n })} />
        </Field>

        <Field id="tillegg" label="Overtidstillegg">
          <div className="relative">
            <select
              id="tillegg"
              value={settings.overtimeMultiplier}
              onChange={(e) => onChange({ overtimeMultiplier: Number(e.target.value) })}
              className="field appearance-none ps-3 pe-9"
            >
              {MULTIPLIERS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-muted" />
          </div>
        </Field>

        <Field id="dagsgrense" label="Overtid etter (timer per dag)">
          <NumberField
            id="dagsgrense"
            value={settings.dailyLimitHours}
            onValue={(n) => onChange({ dailyLimitHours: n })}
          />
        </Field>

        <Field id="ukegrense" label="Overtid etter (timer per uke)">
          <NumberField
            id="ukegrense"
            value={settings.weeklyLimitHours}
            onValue={(n) => onChange({ weeklyLimitHours: n })}
          />
        </Field>
      </div>

      <p className="mt-4 text-sm text-muted">
        Standardverdiene følger arbeidsmiljøloven: 9 timer per dag, 40 timer per uke og minst 40 % tillegg. Tariffavtalen
        din kan ha lavere grenser eller høyere tillegg.
      </p>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
