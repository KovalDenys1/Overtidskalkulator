"use client";

import { useEffect, useMemo, useState } from "react";
import type { Shift, Settings } from "@/lib/types";
import { loadShifts, saveShifts, loadSettings, saveSettings, defaultSettings } from "@/lib/storage";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function useShifts() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // Deliberately setState-in-effect, not a lazy useState initializer: SSR has
    // no localStorage, so a lazy initializer would return different data on the
    // server vs. the client's first render and trigger a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShifts(loadShifts());
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    saveShifts(shifts);
  }, [shifts]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const actions = useMemo(() => {
    return {
      addShift: (s: Omit<Shift, "id">) => setShifts((prev) => [{ ...s, id: uid() }, ...prev]),
      deleteShift: (id: string) => setShifts((prev) => prev.filter((x) => x.id !== id)),
      updateShift: (id: string, patch: Partial<Shift>) =>
        setShifts((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x))),
      clearAll: () => setShifts([]),

      updateSettings: (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch })),
      resetSettings: () => setSettings(defaultSettings),
    };
  }, []);

  return { shifts, settings, ...actions };
}
