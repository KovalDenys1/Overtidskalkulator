export default function Disclaimer() {
  return (
    <div className="rounded-2xl border p-4 text-sm text-gray-700 space-y-2">
      <div>
        <b>Merk:</b> Dette er en veiledende kalkulator. <b>Ikke juridisk rådgivning.</b>
      </div>
      <div>
        <b>Alle beløp er beregnet før skatt (brutto).</b> Faktisk utbetaling vil være lavere etter skattetrekk.
      </div>
      <div>
        Regler for overtid kan variere etter arbeidsavtale og tariff. Avtale/tariff kan gi andre regler enn
        standardverdiene. Sjekk alltid kontrakten din og lønnsslipp ved uenighet.
      </div>
      <div className="text-gray-600">
        Se{" "}
        <a
          href="https://lovdata.no/lov/2005-06-17-62/§10-6"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900"
        >
          Arbeidsmiljøloven §10-6
        </a>{" "}
        for lovtekst om overtid.
      </div>
    </div>
  );
}
