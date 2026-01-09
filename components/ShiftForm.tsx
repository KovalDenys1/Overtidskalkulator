"use client";

import { useState } from "react";
import type { Shift } from "@/lib/types";
import { trackShiftAdded } from "@/lib/analytics";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function ShiftForm({
  onAdd,
}: {
  onAdd: (shift: Omit<Shift, "id">) => void;
}) {
  const [date, setDate] = useState<string>(todayISO());
  const [startTime, setStartTime] = useState("16:00");
  const [endTime, setEndTime] = useState("22:00");
  const [breakMinutes, setBreakMinutes] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  return (
    <form
      className="w-full max-w-full rounded-2xl border p-4 shadow-sm space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await Promise.resolve(onAdd({ date, startTime, endTime, breakMinutes }));
        trackShiftAdded();
        setLoading(false);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 600);
      }}
    >
      <h2 className="text-lg font-semibold">Legg til vakt</h2>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="space-y-1 min-w-0 w-full block">
          <div className="text-sm font-medium text-gray-700">Dato</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full max-w-full min-w-0 rounded-xl border px-3 py-3 min-h-12 appearance-none"
            required
          />
        </label>

        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <label className="space-y-1 min-w-0">
            <div className="text-sm font-medium text-gray-700">Start</div>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              step="3600"
              className="w-full max-w-full min-w-0 rounded-xl border px-3 py-3 min-h-12 appearance-none bg-white"
              required
            />
          </label>

          <label className="space-y-1 min-w-0">
            <div className="text-sm font-medium text-gray-700">Slutt</div>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              step="3600"
              className="w-full max-w-full min-w-0 rounded-xl border px-3 py-3 min-h-12 appearance-none bg-white"
              required
            />
          </label>
        </div>

        <label className="space-y-1 min-w-0">
          <div className="text-sm font-medium text-gray-700">Pause (min)</div>
          <input
            type="number"
            min={0}
            value={breakMinutes}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBreakMinutes(isNaN(val) || val < 0 ? 0 : val);
            }}
            className="w-full max-w-full min-w-0 rounded-xl border px-3 py-3 min-h-12 appearance-none"
          />
          <div className="text-xs text-gray-600">Tid uten betaling (pauser/lunsj)</div>
        </label>
      </div>

      <button
        className={`w-full max-w-full rounded-xl px-4 py-3.5 min-h-12 font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm ${justAdded ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        type="submit"
        disabled={loading}
      >
        {justAdded ? "✓ Lagt til" : loading ? "Legger til..." : "Legg til vakt"}
      </button>
    </form>
  );
}
