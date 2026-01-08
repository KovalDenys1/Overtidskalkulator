import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Overtidskalkulator",
  description: "Om Overtidskalkulator - en veiledende kalkulator for overtid i Norge.",
};

export default function OmPage() {
  return (
    <main className="space-y-6 max-w-3xl">
      <div>
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">
          ← Tilbake
        </Link>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold">Om Overtidskalkulator</h1>
      
      <div className="space-y-4 text-sm">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Hva er Overtidskalkulator?</h2>
          <p>
            Overtidskalkulator er et gratis verktøy laget for å hjelpe arbeidstakere i Norge med å beregne 
            overtidstimer og estimert lønn basert på vakter de har jobbet.
          </p>
          <p>
            Kalkulatoren tar hensyn til både daglig og ukentlig overtid, og bruker det høyeste antallet 
            overtidstimer for å unngå dobbelttelling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Veiledende kalkulator</h2>
          <p>
            <strong>Dette er en veiledende kalkulator.</strong> Beregningene er basert på generelle regler 
            i norsk arbeidsmiljølov og vanlige arbeidsavtaler.
          </p>
          <p>
            De faktiske reglene for overtid, timelønn og tillegg kan variere avhengig av:
          </p>
          <ul className="list-disc list-inside space-y-1 opacity-80">
            <li>Din individuelle arbeidsavtale</li>
            <li>Tariffavtaler i din bransje</li>
            <li>Bedriftens interne retningslinjer</li>
            <li>Spesielle bestemmelser for din stilling</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Arbeidsmiljøloven</h2>
          <p>
            Overtidskalkulator baserer seg på prinsipper fra{" "}
            <a 
              href="https://lovdata.no/dokument/NL/lov/2005-06-17-62" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:opacity-70"
            >
              Arbeidsmiljøloven
            </a>
            , som regulerer arbeidsforhold i Norge. Loven setter blant annet krav om minimum 40% tillegg for overtidsarbeid.
          </p>
          <p className="opacity-80">
            Merk: Dette verktøyet gir ikke juridisk rådgivning. For spesifikke juridiske spørsmål om dine 
            rettigheter, anbefaler vi å kontakte fagforening, advokat eller Arbeidstilsynet.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Hvordan bruker jeg kalkulatoren?</h2>
          <ol className="list-decimal list-inside space-y-1 opacity-80">
            <li>Legg inn vaktene dine med dato, start- og sluttid, samt pause</li>
            <li>Juster innstillinger for timelønn, overtidstillegg og grenser</li>
            <li>Se oppsummering av timer og estimert lønn</li>
          </ol>
          <p className="opacity-80">
            All data lagres lokalt i nettleseren din og deles ikke med noen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Pro-funksjoner (kommer snart)</h2>
          <p>
            Vi jobber med å lansere Pro-funksjoner som vil inkludere:
          </p>
          <ul className="list-disc list-inside space-y-1 opacity-80">
            <li>PDF-rapporter</li>
            <li>CSV-eksport for regneark</li>
            <li>Ubegrenset historikk</li>
          </ul>
          <p>
            Pro vil være tilgjengelig som abonnement. Pris annonseres når tjenesten lanseres.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Kontakt</h2>
          <p>
            For spørsmål, feil eller forslag, kontakt oss på:{" "}
            <a href="mailto:kontakt@overtidskalkulator.no" className="underline hover:opacity-70">
              kontakt@overtidskalkulator.no
            </a>
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t">
          <p className="opacity-70 text-xs">
            Sist oppdatert: 8. januar 2026
          </p>
        </section>
      </div>
    </main>
  );
}
