# Overtidskalkulator

En veiledende overtidskalkulator for norske arbeidstakere. Beregner overtid basert på daglige og ukentlige grenser, med ISO-uke gruppering.

## Hva appen gjør

Kalkulatoren lar brukere registrere arbeidsvakter (dato, start, slutt, pause) og beregner:
- Totale timer, ordinære timer og overtidstimer
- Grunnlønn og overtidstillegg
- Daglig og ukentlig overtid (ISO-uker)

PDF/CSV-eksport er tilgjengelig som Pro-funksjon (MVP samler interesse før lansering).

## Kjør lokalt

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000)

## Production build

```bash
npm run build
npm run start
```

## Deploy til Vercel

### Via Vercel UI (anbefalt)

1. Push koden til GitHub repository
2. Gå til [vercel.com](https://vercel.com) og logg inn
3. Klikk "Add New Project"
4. Importer GitHub repository
5. Vercel oppdager automatisk Next.js og setter riktige innstillinger
6. Klikk "Deploy"
7. (Valgfritt) Konfigurer custom domain i Vercel dashboard

### Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Følg instruksjonene i terminalen.

## Environment Variables

For Pro waitlist integrering med Formspree, legg til i `.env.local`:

```bash
NEXT_PUBLIC_FORMSPREE_WAITLIST_ENDPOINT=https://formspree.io/f/xgoowvjj
```

**Viktig:** Når du deployer til Vercel, legg til samme miljøvariabel i Vercel dashboard under "Settings > Environment Variables".

## Viktige filer

- `/app/page.tsx` - Hovedside med kalkulator
- `/app/print/page.tsx` - PDF-forhåndsvisning
- `/lib/calc.ts` - Overtidsberegninger (daglig + ukentlig)
- `/components/*` - UI-komponenter
- `/public/robots.txt` og `/public/sitemap.xml` - SEO

## Endringer (mobilfikser)

- `/components/ShiftForm.tsx`: grid satt til én kolonne som default (`grid-cols-1` → to kolonner først fra `md`), `min-w-0` på grid + inputs/labels, full bredde på form og knapp.
- `/app/globals.css`: eksplisitt `min-width: 0` og `max-width: 100%` for `date/time/number` inputs (iOS Safari-tilpasning) + justert tekstjustering.
- `/app/layout.tsx`: la til eksplisitt viewport (`width=device-width, initial-scale=1`) for riktig skalering på mobil.

### Slik tester du

1. Åpne Chrome DevTools → Device toolbar → velg "iPhone 15 Pro Max" → sjekk at "Legg til vakt" er i én kolonne og ingen horisontal scroll.
2. I Safari på iPhone: åpne siden, dra horisontalt for å bekrefte at ingen scroll, og sjekk at alle inputs/brytere ligger i én kolonne med 100% bredde.

## Disclaimer

Denne kalkulatoren er veiledende og tar ikke høyde for alle spesifikke arbeidsavtaler, tariffavtaler eller juridiske unntak. Brukere bør alltid sjekke sin egen arbeidsavtale og lønnsslipp for nøyaktige beregninger. Dette er ikke juridisk rådgivning.

## Teknologi

- Next.js 14
- TypeScript
- Tailwind CSS
- Ingen ekstern database (localStorage for MVP)

## Environment variables (Formspree waitlist)

To enable real waitlist submissions to Formspree and proper analytics tracking on success, set the following environment variable.

- **Name:** `NEXT_PUBLIC_FORMSPREE_WAITLIST_ENDPOINT`
- **Example value:** `https://formspree.io/f/xgoowvjj`

Local (development): create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_FORMSPREE_WAITLIST_ENDPOINT="https://formspree.io/f/xgoowvjj"
```

Vercel (production): go to your Project → Settings → Environment Variables and add the same variable name and value. Use `Preview`/`Production` as needed.

Notes:
- The frontend only uses this public env var to POST the email to Formspree. Analytics will only fire the `submit_email_waitlist` event after the POST returns `res.ok === true`.
- No email or other PII is sent to analytics — only a non-identifying `source` and `device` are included in the payload.
 
Clarification of analytics events related to waitlist submissions:

- `submit_email_waitlist`: fired only when `NEXT_PUBLIC_FORMSPREE_WAITLIST_ENDPOINT` is set AND the POST to that endpoint returns `res.ok === true`. This represents a real, successful submission to Formspree.
- `submit_email_waitlist_local_only`: fired when the env var is NOT set and the app falls back to saving the email locally. This prevents inflating real submission metrics when Formspree is not configured.
- `submit_email_waitlist_failed`: fired when a POST to the configured endpoint fails or returns a non-OK response. No email or PII is included in any of these events.

