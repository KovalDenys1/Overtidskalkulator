"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Shift, Settings, CalcResult } from "@/lib/types";
import { calcShiftHours } from "@/lib/calc";

export default function PrintPage() {
  const [data, setData] = useState<{ shifts: Shift[]; settings: Settings; result: CalcResult } | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("overtid_print_payload_v1");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Basic validation
        if (parsed && Array.isArray(parsed.shifts) && parsed.settings && parsed.result) {
          setData(parsed);
        } else {
          setHasError(true);
        }
      } catch {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (hasError || !data) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-4">
        <p>Ingen data å skrive ut.</p>
        <Link href="/" className="text-blue-600 underline hover:opacity-80">
          Tilbake til kalkulator
        </Link>
      </div>
    );
  }

  const { shifts, settings, result } = data;
  const sortedShifts = [...shifts].sort((a, b) => a.date.localeCompare(b.date));
  const minDate = sortedShifts[0]?.date || "";
  const maxDate = sortedShifts[sortedShifts.length - 1]?.date || "";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 print:hidden">
        <button
          onClick={handlePrint}
          className="rounded-xl border px-6 py-3 font-medium hover:bg-black/5"
          type="button"
        >
          Skriv ut / Lagre som PDF
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Overtidsrapport</h1>
          {minDate && maxDate && (
            <p className="text-lg opacity-70">
              Periode: {minDate} - {maxDate}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold mb-1">Innstillinger</div>
            <div className="space-y-1 opacity-80">
              <div>Timesats: {settings.hourlyRate} kr/time</div>
              <div>Overtidstillegg: {((settings.overtimeMultiplier - 1) * 100).toFixed(0)}%</div>
              <div>Grense per dag: {settings.dailyLimitHours} timer</div>
              <div>Grense per uke: {settings.weeklyLimitHours} timer</div>
            </div>
          </div>
        </div>

        <div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-2 pr-4">Dato</th>
                <th className="text-left py-2 pr-4">Start</th>
                <th className="text-left py-2 pr-4">Slutt</th>
                <th className="text-left py-2 pr-4">Pause</th>
                <th className="text-right py-2">Timer</th>
              </tr>
            </thead>
            <tbody>
              {sortedShifts.map((shift) => {
                const hours = calcShiftHours(shift.startTime, shift.endTime, shift.breakMinutes);

                return (
                  <tr key={shift.id} className="border-b">
                    <td className="py-2 pr-4">{shift.date}</td>
                    <td className="py-2 pr-4">{shift.startTime}</td>
                    <td className="py-2 pr-4">{shift.endTime}</td>
                    <td className="py-2 pr-4">{shift.breakMinutes} min</td>
                    <td className="py-2 text-right">{hours.toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-black font-semibold">
                <td colSpan={4} className="py-3 pr-4">
                  Totalt
                </td>
                <td className="py-3 text-right">{result.totalHours}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold mb-2">Oppsummering</div>
            <div className="space-y-1 opacity-80">
              <div>Totale timer: {result.totalHours}</div>
              <div>Ordinære timer: {result.ordinaryHours}</div>
              <div>Overtidstimer: {result.overtimeHours}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Lønn</div>
            <div className="space-y-1 opacity-80">
              <div>Grunnlønn: {result.basePay.toFixed(2)} kr</div>
              <div>Overtidstillegg: {result.overtimeExtra.toFixed(2)} kr</div>
              <div className="font-semibold opacity-100">Totalt: {result.totalPay.toFixed(2)} kr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

