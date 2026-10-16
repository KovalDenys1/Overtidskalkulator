import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import Providers from "@/components/Providers";
import { savedStateScript } from "@/lib/storage";

const siteUrl = "https://overtidskalkulator.no";
const title = "Overtidskalkulator for Norge | Beregn overtidstillegg";
const description =
  "Beregn overtidstimer og tillegg etter norsk arbeidsmiljølov. Gratis veiledende kalkulator for daglig og ukentlig overtid med minimum 40 % tillegg, med PDF- og CSV-rapport.";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9fc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: savedStateScript }} />
      </head>
      <body>
        <Providers>
          <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
            <a
              href="#innhold"
              className="fixed start-4 top-4 z-50 -translate-y-24 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white focus-visible:translate-y-0"
            >
              Hopp til innholdet
            </a>
            <header className="flex items-center justify-between gap-4 py-4 print:hidden">
              <Link
                href="/"
                className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-lg px-2 font-semibold tracking-[-0.01em] text-ink no-underline"
              >
                <span
                  aria-hidden="true"
                  className="grid size-7 place-items-center rounded-md bg-ink text-[11px] font-bold tracking-[0.02em] text-white"
                >
                  OT
                </span>
                <span className="sr-only min-[380px]:not-sr-only">overtidskalkulator.no</span>
              </Link>
              <nav aria-label="Hovedmeny" className="flex items-center gap-1 text-sm">
                <Link
                  href="/om"
                  className="press inline-flex min-h-11 items-center rounded-lg px-3 font-medium text-muted hover:bg-black/[0.04] hover:text-ink"
                >
                  Om
                </Link>
                <Link
                  href="/kontakt"
                  className="press inline-flex min-h-11 items-center rounded-lg px-3 font-medium text-muted hover:bg-black/[0.04] hover:text-ink"
                >
                  Kontakt
                </Link>
              </nav>
            </header>

            <div id="innhold" className="flex-1 pb-12">
              {children}
            </div>

            <footer className="border-t border-line py-8 text-sm text-muted print:hidden">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Overtidskalkulator · Veiledende, ikke juridisk rådgivning</p>
                <nav aria-label="Bunnmeny" className="-mx-2 flex flex-wrap gap-x-1">
                  <Link href="/om" className="inline-flex min-h-11 items-center rounded-md px-2 hover:text-ink">
                    Om
                  </Link>
                  <Link href="/personvern" className="inline-flex min-h-11 items-center rounded-md px-2 hover:text-ink">
                    Personvern
                  </Link>
                  <Link href="/kontakt" className="inline-flex min-h-11 items-center rounded-md px-2 hover:text-ink">
                    Kontakt
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
