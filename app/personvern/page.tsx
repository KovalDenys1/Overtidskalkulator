import type { Metadata } from "next";
import { ProsePage } from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Personvernerklæring for Overtidskalkulator – hvordan vi håndterer dataene dine.",
  alternates: {
    canonical: "/personvern",
  },
};

export default function PersonvernPage() {
  return (
    <ProsePage title="Personvern" updated="16. oktober 2026">
      <section>
        <h2>Vaktene dine</h2>
        <p>
          Overtidskalkulator lagrer vakter og innstillinger lokalt i nettleseren din (localStorage). De sendes ikke til
          oss og deles ikke med noen. PDF-rapporten og CSV-filen lages også i nettleseren din.
        </p>
      </section>

      <section>
        <h2>E-post</h2>
        <p>
          Kalkulatoren ber ikke om e-postadressen din. Fram til oktober 2026 kunne du melde deg på en venteliste for
          rapportfunksjonene. Adressene fra den listen er lagret med tidspunktet for påmeldingen i en database hos
          Upstash (via Vercel) i Frankfurt, EU.
        </p>
        <p>
          <strong>Vi selger aldri personopplysninger.</strong> Adressene brukes ikke til noe annet, og du får høyst én
          e-post fra oss.
        </p>
      </section>

      <section>
        <h2>Analyse</h2>
        <p>
          Vi bruker Vercel Analytics for å se hvor mange som bruker kalkulatoren og hvilke funksjoner de bruker. Vercel
          Analytics bruker ikke informasjonskapsler og samler ikke inn data som identifiserer deg.
        </p>
        <p>
          Les mer i{" "}
          <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercels personvernerklæring for Analytics
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Informasjonskapsler</h2>
        <p>
          Vi bruker ikke informasjonskapsler. Vaktene og innstillingene ligger i nettleserens lokale lagring, og ingenting
          brukes til å spore deg på tvers av nettsteder.
        </p>
      </section>

      <section>
        <h2>Dine rettigheter</h2>
        <p>
          Du har full kontroll over dataene dine. Du kan slette vaktene når som helst med «Tøm alt» i kalkulatoren, eller
          ved å tømme nettleserens lagring. Står du på ventelisten og vil fjernes, send oss en e-post, så sletter vi
          adressen din.
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Spørsmål om personvern sender du til{" "}
          <a href="mailto:kontakt@overtidskalkulator.no">kontakt@overtidskalkulator.no</a>.
        </p>
      </section>
    </ProsePage>
  );
}
