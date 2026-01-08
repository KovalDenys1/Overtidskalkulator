import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Overtidskalkulator",
  description: "Kontakt Overtidskalkulator for spørsmål, feil eller forslag.",
};

export default function KontaktPage() {
  return (
    <main className="space-y-6 max-w-3xl">
      <div>
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">
          ← Tilbake
        </Link>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold">Kontakt</h1>
      
      <div className="space-y-4 text-sm">
        <section className="space-y-2">
          <p>
            For spørsmål, feil eller forslag, kontakt oss på:
          </p>
          <div className="rounded-xl border p-4 bg-gray-50">
            <a 
              href="mailto:kontakt@overtidskalkulator.no" 
              className="text-lg font-medium underline hover:opacity-70"
            >
              kontakt@overtidskalkulator.no
            </a>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Hva kan vi hjelpe med?</h2>
          <ul className="list-disc list-inside space-y-1 opacity-80">
            <li>Spørsmål om hvordan kalkulatoren fungerer</li>
            <li>Rapportere feil eller bugs</li>
            <li>Forslag til forbedringer</li>
            <li>Tilbakemelding på brukeropplevelsen</li>
            <li>Spørsmål om Pro-funksjoner</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Responstid</h2>
          <p className="opacity-80">
            Vi svarer normalt innen 1-3 virkedager.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t">
          <p className="opacity-70">
            Merk: Vi gir ikke juridisk rådgivning. For spesifikke juridiske spørsmål om arbeidsrett og overtid, 
            anbefaler vi å kontakte din fagforening, advokat eller Arbeidstilsynet.
          </p>
        </section>
      </div>
    </main>
  );
}
