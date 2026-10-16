"use client";

import { useEffect, useMemo, useState } from "react";
import type { Shift, Settings } from "@/lib/types";
import { loadShifts, saveShifts, loadSettings, saveSettings, defaultSettings } from "@/lib/storage";
import { exampleShifts } from "@/lib/example";

type Data = { shifts: Shift[]; isExample: boolean };

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function fromStorage(): Data {
  const stored = loadShifts();
  return stored.length > 0 ? { shifts: stored, isExample: false } : { shifts: exampleShifts(new Date()), isExample: true };
}

// After the first full page load, client-side navigations can read storage directly: there is no server HTML to match.
function isClientNavigation() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("ot-ready");
}

export function useShifts() {
  const [data, setData] = useState<Data>(() =>
    isClientNavigation() ? fromStorage() : { shifts: exampleShifts(), isExample: true }
  );
  const [settings, setSettings] = useState<Settings>(() => (isClientNavigation() ? loadSettings() : defaultSettings));
  const [loaded, setLoaded] = useState(isClientNavigation);

  useEffect(() => {
    if (!loaded) {
      // setState-in-effect on purpose: localStorage does not exist on the server, so reading it during render would break hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(fromStorage());
      setSettings(loadSettings());
      setLoaded(true);
    }
    document.documentElement.classList.add("ot-ready");
  }, [loaded]);

  useEffect(() => {
    if (loaded && !data.isExample) saveShifts(data.shifts);
  }, [loaded, data]);

  useEffect(() => {
    if (loaded) saveSettings(settings);
  }, [loaded, settings]);

  const actions = useMemo(
    () => ({
      addShift: (s: Omit<Shift, "id">) =>
        setData((prev) => ({
          shifts: prev.isExample ? [{ ...s, id: uid() }] : [{ ...s, id: uid() }, ...prev.shifts],
          isExample: false,
        })),
      deleteShift: (id: string) =>
        setData((prev) => ({ shifts: prev.shifts.filter((x) => x.id !== id), isExample: false })),
      clearAll: () => setData({ shifts: [], isExample: false }),
      showExample: () => setData({ shifts: exampleShifts(new Date()), isExample: true }),
      updateSettings: (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch })),
      resetSettings: () => setSettings(defaultSettings),
    }),
    []
  );

  return { shifts: data.shifts, isExample: data.isExample, loaded, settings, ...actions };
}
