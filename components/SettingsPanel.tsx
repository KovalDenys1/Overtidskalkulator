"use client";

import type { Settings } from "@/lib/types";

export default function SettingsPanel({
  settings,
  onChange,
  onReset,
}: {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Innstillinger</h2>
        <button
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium text-gray-700 transition-colors"
          onClick={onReset}
          type="button"
        >
          ↺ Tilbakestill
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Timesats (kr/time)</div>
          <input
            type="number"
            min={0}
            value={settings.hourlyRate}
            onChange={(e) => onChange({ hourlyRate: Number(e.target.value) || 0 })}
            className="w-full rounded-xl border px-3 py-2"
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Overtidstillegg</div>
          <select
            value={settings.overtimeMultiplier}
            onChange={(e) => onChange({ overtimeMultiplier: Number(e.target.value) })}
            className="w-full rounded-xl border px-3 py-2"
          >
            <option value={1.4}>+40% (1.4x)</option>
            <option value={1.5}>+50% (1.5x)</option>
            <option value={2.0}>+100% (2.0x)</option>
          </select>
          <div className="text-xs text-gray-600">Ekstra lønn per overtidstime</div>
        </label>

        <label className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Grense per dag (timer)</div>
          <input
            type="number"
            min={0}
            step={0.5}
            value={settings.dailyLimitHours}
            onChange={(e) => onChange({ dailyLimitHours: Number(e.target.value) || 0 })}
            className="w-full rounded-xl border px-3 py-2"
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Grense per uke (timer)</div>
          <input
            type="number"
            min={0}
            step={0.5}
            value={settings.weeklyLimitHours}
            onChange={(e) => onChange({ weeklyLimitHours: Number(e.target.value) || 0 })}
            className="w-full rounded-xl border px-3 py-2"
          />
        </label>
      </div>

      <p className="text-xs text-gray-600">
        Standard er veiledende (ofte 9t/dag og 40t/uke), men kan variere etter avtale/tariff.
      </p>
    </div>
  );
}
