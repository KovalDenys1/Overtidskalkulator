"use client";

import ShiftForm from "@/components/ShiftForm";
import ShiftTable from "@/components/ShiftTable";
import SettingsPanel from "@/components/SettingsPanel";
import SummaryCard from "@/components/SummaryCard";
import Disclaimer from "@/components/Disclaimer";
import { useShifts } from "@/hooks/useShifts";
import { calcOvertid } from "@/lib/calc";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Overtidskalkulator",
  url: "https://overtidskalkulator.no",
  description:
    "Gratis veiledende kalkulator for overtidstimer og overtidstillegg etter norsk arbeidsmiljølov.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NOK",
  },
  inLanguage: "nb-NO",
};

export default function Page() {
  const { shifts, settings, addShift, deleteShift, clearAll, updateSettings, resetSettings } = useShifts();
  const result = calcOvertid(shifts, settings);

  return (
    <main className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ShiftForm onAdd={addShift} />
          <SettingsPanel settings={settings} onChange={updateSettings} onReset={resetSettings} />
          <Disclaimer />
        </div>

        <div className="space-y-6">
          <SummaryCard result={result} shifts={shifts} settings={settings} />
          <ShiftTable shifts={shifts} onDelete={deleteShift} onClear={clearAll} />
        </div>
      </div>

      <div className="mt-8 space-y-4 text-sm text-gray-700 max-w-3xl">
        <h2 className="text-lg font-semibold text-gray-900">Overtid i Norge</h2>
        <p>
          Overtid er arbeid utover normal arbeidstid. I Norge er det vanlig at overtidstimer gir rett til
          overtidstillegg på minimum 40% etter Arbeidsmiljøloven. Mange arbeidsavtaler og tariffavtaler gir høyere
          tillegg, for eksempel 50% eller 100%.
        </p>
        <p>
          Overtid kan beregnes både daglig (f.eks. mer enn 9 timer per dag) og ukentlig (f.eks. mer enn 40 timer per
          uke). De faktiske reglene avhenger av din arbeidsavtale, tariff eller kontrakt.
        </p>
        <p className="text-gray-600">
          Denne kalkulatoren er veiledende og tar ikke høyde for alle spesifikke regler. Sjekk alltid din
          arbeidsavtale og lønnsslipp for nøyaktige beregninger.
        </p>
      </div>
    </main>
  );
}
