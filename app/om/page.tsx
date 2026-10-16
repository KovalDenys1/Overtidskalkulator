import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Om Overtidskalkulator – en gratis, veiledende kalkulator for overtid og overtidstillegg i Norge.",
  alternates: {
    canonical: "/om",
  },
};

export default function OmPage() {
  return (
    <ProsePage title="Om Overtidskalkulator" updated="16. oktober 2026">
      <section>
        <h2>Hva er Overtidskalkulator?</h2>
        <p>
          Overtidskalkulator er et gratis verktøy for arbeidstakere i Norge. Du legger inn vaktene dine og ser hvor
          mange timer som er overtid, og hva de gir i kroner før skatt.
        </p>
        <p>
          Kalkulatoren regner både daglig og ukentlig overtid, og bruker det høyeste tallet, så samme time ikke telles
          to ganger.
        </p>
      </section>

      <section>
        <h2>Gratis, uten innlogging</h2>
        <p>
          Alt er gratis, også PDF-rapporten og CSV-filen du kan ta med til lønnsslippen eller arbeidsgiveren. Det finnes
          ingen betalt versjon, og du trenger ingen konto.
        </p>
      </section>

      <section>
        <h2>Veiledende kalkulator</h2>
        <p>
          <strong>Dette er en veiledende kalkulator.</strong> Beregningene bygger på de generelle reglene i
          arbeidsmiljøloven. De faktiske reglene for overtid, timelønn og tillegg kan variere med:
        </p>
        <ul>
          <li>arbeidsavtalen din</li>
          <li>tariffavtalen i bransjen din</li>
          <li>bedriftens egne retningslinjer</li>
          <li>særlige regler for stillingen din</li>
        </ul>
      </section>

      <section>
        <h2>Arbeidsmiljøloven</h2>
        <p>
          Kalkulatoren bygger på{" "}
          <a href="https://lovdata.no/dokument/NL/lov/2005-06-17-62" target="_blank" rel="noopener noreferrer">
            arbeidsmiljøloven
          </a>
          . Loven setter grensen for alminnelig arbeidstid til 9 timer per døgn og 40 timer per uke, og krever minst
          40 % tillegg for overtid.
        </p>
        <p>
          Kalkulatoren gir ikke juridisk rådgivning. Har du spørsmål om rettighetene dine, kontakt tillitsvalgt,
          fagforeningen din, en advokat eller Arbeidstilsynet.
        </p>
      </section>

      <section>
        <h2>Slik bruker du kalkulatoren</h2>
        <ol>
          <li>Legg inn vaktene med dato, start, slutt og ubetalt pause.</li>
          <li>Juster timelønn, overtidstillegg og grenser hvis avtalen din er annerledes.</li>
          <li>Les av timer og lønn, og last ned rapporten hvis du trenger den.</li>
        </ol>
        <p>Vaktene lagres bare i nettleseren din og sendes ikke til oss.</p>
      </section>

      <section>
        <h2>For fagforeninger, arbeidsgivere og nettsteder</h2>
        <p>
          Dere kan gjerne lenke til kalkulatoren fra egne sider. Har dere innspill til beregningene eller vil samarbeide,
          skriv til{" "}
          <a href="mailto:kontakt@overtidskalkulator.no">kontakt@overtidskalkulator.no</a>.
        </p>
      </section>
    </ProsePage>
  );
}
