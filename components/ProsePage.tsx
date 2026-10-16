import Link from "next/link";

export function ProsePage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <main className="max-w-[65ch] pt-4 sm:pt-10">
      <Link
        href="/"
        className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-muted hover:text-ink"
      >
        ← Til kalkulatoren
      </Link>
      <h1 className="mt-4 text-[min(2.25rem,10vw)] font-semibold leading-[1.1] tracking-[-0.02em] break-words sm:text-5xl">{title}</h1>
      <div className="mt-8 space-y-10 leading-relaxed text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:decoration-field [&_a:hover]:decoration-ink [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-ink [&_li]:ps-1 [&_ol]:list-decimal [&_ol]:ps-5 [&_section]:space-y-3 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:ps-5">
        {children}
      </div>
      {updated && <p className="mt-12 border-t border-line pt-4 text-sm text-muted">Sist oppdatert: {updated}</p>}
    </main>
  );
}
