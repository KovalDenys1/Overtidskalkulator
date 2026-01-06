"use client";

import { useState } from "react";
import type { Shift } from "@/lib/types";

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

  return (
    <form
      className="rounded-2xl border p-4 shadow-sm space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd({ date, startTime, endTime, breakMinutes });
      }}
    >
      <h2 className="text-lg font-semibold">Legg til vakt</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm opacity-80">Dato</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            required
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm opacity-80">Start</div>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            required
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm opacity-80">Slutt</div>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            required
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm opacity-80">Pause (min)</div>
          <input
            type="number"
            min={0}
            value={breakMinutes}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBreakMinutes(isNaN(val) || val < 0 ? 0 : val);
            }}
            className="w-full rounded-xl border px-3 py-2"
          />
        </label>
      </div>

      <button className="w-full rounded-xl border px-3 py-2 font-medium hover:bg-black/5" type="submit">
        Legg til
      </button>
    </form>
  );
}
