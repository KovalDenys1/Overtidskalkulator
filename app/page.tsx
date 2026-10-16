import Calculator from "@/components/Calculator";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Overtidskalkulator",
  url: "https://overtidskalkulator.no",
  description:
    "Gratis veiledende kalkulator for overtidstimer og overtidstillegg etter norsk arbeidsmiljølov, med PDF- og CSV-rapport.",
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
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="max-w-2xl pb-6 pt-4 sm:pb-10 sm:pt-10">
        <h1 className="enter text-[min(2.5rem,11vw)] font-semibold leading-[1.1] tracking-[-0.02em] break-words sm:text-6xl">
          Overtidskalkulator
        </h1>
        <p className="enter enter-2 mt-3 text-lg leading-normal text-muted sm:mt-4 sm:text-xl">
          Legg inn vaktene dine og se hva overtiden gir i kroner, etter arbeidsmiljøloven. Gratis og uten innlogging –
          vaktene lagres bare i nettleseren din.
        </p>
      </section>

      <div className="enter enter-3">
        <Calculator />
      </div>

      <section aria-labelledby="om-overtid" className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-3 lg:gap-8">
        <div className="max-w-[65ch] space-y-3">
          <h2 id="om-overtid" className="text-xl font-semibold leading-tight">
            Overtid i Norge
          </h2>
          <p className="leading-relaxed text-muted">
            Overtid er arbeid utover lovens grenser for alminnelig arbeidstid: 9 timer per døgn og 40 timer per uke.
            Arbeidsmiljøloven krever minst 40 % tillegg for overtidstimer. Mange tariffavtaler gir 50 % eller 100 %, for
            eksempel på kveld, natt og i helger.
          </p>
        </div>
        <div className="max-w-[65ch] space-y-3">
          <h2 className="text-xl font-semibold leading-tight">Slik regner kalkulatoren</h2>
          <p className="leading-relaxed text-muted">
            Timene summeres per dag og per uke. Kalkulatoren finner timene over dagsgrensen og timene over ukegrensen,
            og bruker det høyeste av de to tallene, så samme time ikke telles to ganger. Lønnen er alle timer ganger
            timelønnen, pluss tillegget for overtidstimene.
          </p>
        </div>
        <div className="max-w-[65ch] space-y-3">
          <h2 className="text-xl font-semibold leading-tight">Før du bruker tallet</h2>
          <p className="leading-relaxed text-muted">
            Beløpene er brutto, før skatt. Har du avtalt kortere arbeidstid, for eksempel 37,5 timer, kan tariffavtalen
            gi tillegg fra et lavere timetall – juster grensene under «Lønn og grenser». Lovteksten står i{" "}
            <a
              href="https://lovdata.no/lov/2005-06-17-62/§10-6"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-field hover:decoration-ink"
            >
              arbeidsmiljøloven § 10-6
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
