"use client";

import { useEffect, useState } from "react";
import ShiftForm from "./ShiftForm";
import ShiftList from "./ShiftList";
import SettingsPanel from "./SettingsPanel";
import SummaryCard from "./SummaryCard";
import { useShifts } from "@/hooks/useShifts";
import { calcOvertid } from "@/lib/calc";

export default function Calculator() {
  const {
    shifts,
    isExample,
    loaded,
    settings,
    addShift,
    deleteShift,
    clearAll,
    showExample,
    updateSettings,
    resetSettings,
  } = useShifts();
  const result = calcOvertid(shifts, settings);
  const [animateNumbers, setAnimateNumbers] = useState(false);

  // The jump from the server-rendered example to saved data is not a change the visitor made, so it is not animated.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (loaded) setAnimateNumbers(true);
  }, [loaded]);

  const startOwn = () => {
    clearAll();
    requestAnimationFrame(() => {
      const field = document.getElementById("vakt-dato");
      if (!field) return;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      field.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
      field.focus({ preventScroll: true });
    });
  };

  return (
    <div data-calc className="grid items-start gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6">
      <div className="lg:sticky lg:top-6">
        <SummaryCard
          result={result}
          shifts={shifts}
          settings={settings}
          isExample={isExample}
          animateNumbers={animateNumbers}
          onStartOwn={startOwn}
        />
      </div>
      <div className="space-y-4 lg:space-y-6">
        <ShiftForm
          onAdd={addShift}
          isExample={isExample}
          totals={{ hours: result.totalHours, pay: result.totalPay, count: shifts.length }}
        />
        <ShiftList
          shifts={shifts}
          byDate={result.byDate}
          isExample={isExample}
          onDelete={deleteShift}
          onClear={clearAll}
          onShowExample={showExample}
        />
        <SettingsPanel settings={settings} onChange={updateSettings} onReset={resetSettings} />
      </div>
    </div>
  );
}
