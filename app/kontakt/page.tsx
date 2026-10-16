import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt Overtidskalkulator for spørsmål, feil, forslag eller samarbeid.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <ProsePage title="Kontakt">
      <section>
        <p>Spørsmål, feil eller forslag sender du til:</p>
        <p>
          <a
            href="mailto:kontakt@overtidskalkulator.no"
            className="inline-flex min-h-11 items-center text-lg sm:text-xl"
          >
            kontakt@overtidskalkulator.no
          </a>
        </p>
      </section>

      <section>
        <h2>Hva kan vi hjelpe med?</h2>
        <ul>
          <li>Spørsmål om hvordan kalkulatoren regner</li>
          <li>Feil i beregningene eller på siden</li>
          <li>Forslag til forbedringer</li>
          <li>Lenking, samarbeid eller bruk i fagforening, bedrift eller skole</li>
        </ul>
      </section>

      <section>
        <h2>Svartid</h2>
        <p>Vi svarer normalt innen 1–3 virkedager.</p>
      </section>

      <section>
        <p>
          Vi gir ikke juridisk rådgivning. Har du spørsmål om arbeidsrett og overtid, kontakt tillitsvalgt, fagforeningen
          din, en advokat eller Arbeidstilsynet.
        </p>
      </section>
    </ProsePage>
  );
}
