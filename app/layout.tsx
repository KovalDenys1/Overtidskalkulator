import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Overtidskalkulator for Norge | Beregn overtidstillegg",
  description:
    "Beregn overtidstimer og tillegg etter norsk arbeidsmiljølov. Gratis veiledende kalkulator for daglig og ukentlig overtid med minimum 40% tillegg.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-6">
          <header className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Overtidskalkulator</h1>
            <p className="opacity-70">Legg inn vakter og se estimert lønn og overtidstillegg.</p>
          </header>
          {children}
          <footer className="text-xs opacity-60 py-6">
            © {new Date().getFullYear()} Overtidskalkulator • Ikke juridisk rådgivning
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
