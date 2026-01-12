"use client";

import type { Shift } from "@/lib/types";
import { calcShiftHours } from "@/lib/calc";

interface ShiftTableProps {
  shifts: Shift[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

export default function ShiftTable({
  shifts,
  onDelete,
  onClear,
}: ShiftTableProps) {
  const isEmpty = shifts.length === 0;

  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Vakter</h2>
        <div className="flex gap-2">
          <button
            className="text-sm px-3 py-1.5 rounded-lg border border-red-300 bg-white hover:bg-red-50 font-medium text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            onClick={onClear}
            type="button"
            disabled={isEmpty}
            aria-label="Fjern alle vakter"
          >
            🗑️ Tøm alt
          </button>
        </div>
      </div>

      {isEmpty ? (
        <p className="text-sm opacity-70">Ingen vakter enda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide bg-gray-50">
              <tr>
                <th className="py-2 pr-3 font-semibold text-gray-700">Dato</th>
                <th className="py-2 pr-3 font-semibold text-gray-700">Start</th>
                <th className="py-2 pr-3 font-semibold text-gray-700">Slutt</th>
                <th className="py-2 pr-3 font-semibold text-gray-700">Pause</th>
                <th className="py-2 pr-3 font-semibold text-gray-700">Timer</th>
                <th className="py-2 pr-3 font-semibold text-gray-700">Handling</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => {
                const hours = calcShiftHours(
                  shift.startTime,
                  shift.endTime,
                  shift.breakMinutes
                );
                return (
                  <tr key={shift.id} className="border-t">
                    <td className="py-2 pr-3">{shift.date}</td>
                    <td className="py-2 pr-3">{shift.startTime}</td>
                    <td className="py-2 pr-3">{shift.endTime}</td>
                    <td className="py-2 pr-3">{shift.breakMinutes} min</td>
                    <td className="py-2 pr-3 font-medium">{hours.toFixed(2)}t</td>
                    <td className="py-2 text-right">
                      <button
                        className="text-xs px-2 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                        onClick={() => onDelete(shift.id)}
                        type="button"
                        aria-label={`Fjern vakt fra ${shift.date}`}
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
