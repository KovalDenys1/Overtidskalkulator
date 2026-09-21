import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

const siteUrl = "https://overtidskalkulator.no";
const title = "Overtidskalkulator for Norge | Beregn overtidstillegg";
const description =
  "Beregn overtidstimer og tillegg etter norsk arbeidsmiljølov. Gratis veiledende kalkulator for daglig og ukentlig overtid med minimum 40% tillegg.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Overtidskalkulator",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Overtidskalkulator",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  verification: {
    google: "O599Qz88qlrH_HPc82MUce2o-_abOIxMugwBUsBcrAY",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
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
          <footer className="text-xs opacity-60 py-6 space-y-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center justify-center sm:justify-start">
              <Link href="/om" className="hover:opacity-100">Om</Link>
              <Link href="/personvern" className="hover:opacity-100">Personvern</Link>
              <Link href="/kontakt" className="hover:opacity-100">Kontakt</Link>
            </div>
            <div>
              © {new Date().getFullYear()} Overtidskalkulator • Ikke juridisk rådgivning
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
