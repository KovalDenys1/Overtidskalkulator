import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Personvernerklæring for Overtidskalkulator - hvordan vi håndterer dine data.",
  alternates: {
    canonical: "/personvern",
  },
};

export default function PersonvernPage() {
  return (
    <main className="space-y-6 max-w-3xl">
      <div>
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">
          ← Tilbake
        </Link>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold">Personvern</h2>
      
      <div className="space-y-4 text-sm">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Datainnsamling</h3>
          <p>
            Overtidskalkulator lagrer alle vakter, innstillinger og beregninger lokalt i nettleseren din (localStorage). 
            Disse dataene sendes ikke til servere eller deles med tredjeparter.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">E-post (Venteliste)</h3>
          <p>
            Hvis du oppgir e-post for å bli varslet om Pro-funksjoner, lagres e-postadressen og tidspunktet for påmeldingen
            i en database hos Upstash (via Vercel) i Frankfurt, EU. Ingen andre opplysninger lagres sammen med den.
          </p>
          <p>
            <strong>Vi selger aldri personopplysninger.</strong> E-post brukes kun til å varsle deg om Pro-lansering. 
            Du vil kun motta én e-post når tjenesten er klar.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p>
            Vi bruker Vercel Analytics for å forstå hvordan tjenesten brukes. Dette hjelper oss med å forbedre brukeropplevelsen. 
            Vercel Analytics samler inn anonymisert brukerdata og respekterer personvernet ditt.
          </p>
          <p>
            Les mer om Vercel Analytics: <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">Vercel Analytics Privacy Policy</a>
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Informasjonskapsler (Cookies)</h3>
          <p>
            Vi bruker kun localStorage for å lagre dine vakter og innstillinger lokalt. 
            Ingen informasjonskapsler brukes for å spore deg på tvers av nettsteder.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Dine rettigheter</h3>
          <p>
            Du har full kontroll over dataene dine. All data lagres lokalt i nettleseren, og du kan slette den når som helst 
            ved å tømme nettleserens lagring eller ved å bruke &quot;Tøm alle&quot;-funksjonen i kalkulatoren.
            Vil du fjernes fra ventelisten, send en e-post til adressen under, så sletter vi e-postadressen din.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Kontakt</h3>
          <p>
            For spørsmål om personvern, kontakt oss på: <a href="mailto:kontakt@overtidskalkulator.no" className="underline hover:opacity-70">kontakt@overtidskalkulator.no</a>
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
