"use client";

import type { Shift } from "@/lib/types";
import { calcShiftHours } from "@/lib/calc";

export default function ShiftTable({
  shifts,
  onDelete,
  onClear,
}: {
  shifts: Shift[];
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Vakter</h2>
        <div className="flex gap-2">
          <button
            className="text-sm underline opacity-80 hover:opacity-100"
            onClick={onClear}
            type="button"
            disabled={shifts.length === 0}
          >
            Tøm alt
          </button>
        </div>
      </div>

      {shifts.length === 0 ? (
        <p className="text-sm opacity-70">Ingen vakter enda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left opacity-70">
              <tr>
                <th className="py-2 pr-3">Dato</th>
                <th className="py-2 pr-3">Start</th>
                <th className="py-2 pr-3">Slutt</th>
                <th className="py-2 pr-3">Pause</th>
                <th className="py-2 pr-3">Timer</th>
                <th className="py-2 pr-3"></th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((s) => {
                const hours = calcShiftHours(s.startTime, s.endTime, s.breakMinutes);
                return (
                  <tr key={s.id} className="border-t">
                    <td className="py-2 pr-3">{s.date}</td>
                    <td className="py-2 pr-3">{s.startTime}</td>
                    <td className="py-2 pr-3">{s.endTime}</td>
                    <td className="py-2 pr-3">{s.breakMinutes} min</td>
                    <td className="py-2 pr-3">{hours.toFixed(2)}t</td>
                    <td className="py-2 text-right">
                      <button
                        className="text-sm underline opacity-80 hover:opacity-100"
                        onClick={() => onDelete(s.id)}
                        type="button"
                      >
                        Slett
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
