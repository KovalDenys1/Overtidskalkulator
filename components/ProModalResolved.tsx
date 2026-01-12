"use client";

import { useState, useEffect } from "react";
import { saveIsPro, saveWaitlistEmail, incrementMetric } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import type { CalcResult, Shift, Settings } from "@/lib/types";

type ProModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shifts?: Shift[];
  settings?: Settings;
  result?: CalcResult;
};

export default function ProModalResolved({ isOpen, onClose, shifts, settings, result }: ProModalProps) {
  const [showTestLink, setShowTestLink] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (isOpen) incrementMetric("pro_modal_open_count");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestPro = (e: React.MouseEvent) => {
    e.preventDefault();
    saveIsPro(true);
    onClose();
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.trim();
    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setErrorText("Vennligst oppgi en gyldig e-postadresse");
      return;
    }
    setIsSubmitting(true);
    setErrorText("");

    const device = typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "desktop";
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_WAITLIST_ENDPOINT;

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: emailValue }),
        });

        if (res.ok) {
          saveWaitlistEmail(emailValue);
          incrementMetric("pro_send_count");
          trackEvent("submit_email_waitlist", { source: "pro_modal", device });
          setIsSuccess(true);
        } else {
          saveWaitlistEmail(emailValue);
          incrementMetric("pro_send_count");
          trackEvent("submit_email_waitlist_failed", { source: "pro_modal", device });
          setErrorText("Kunne ikke sende akkurat nå. Prøv igjen senere.");
        }
      } catch {
        saveWaitlistEmail(emailValue);
        incrementMetric("pro_send_count");
        trackEvent("submit_email_waitlist_failed", { source: "pro_modal", device });
        setErrorText("Kunne ikke sende akkurat nå. Prøv igjen senere.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      saveWaitlistEmail(emailValue);
      incrementMetric("pro_send_count");
      trackEvent("submit_email_waitlist_local_only", { source: "pro_modal", device });
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="rounded-2xl border bg-white p-6 shadow-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-2">Pro-funksjoner</h2>
        <p className="text-sm opacity-80 mb-4">PDF- og CSV-rapporter, samt ubegrenset historikk, lanseres som abonnement.</p>
        <div className="rounded-xl border p-3 mb-4 bg-gray-50">
          <div className="text-sm font-medium mb-2">Pro inkluderer:</div>
          <ul className="text-sm opacity-80 space-y-1">
            <li>• PDF-rapport</li>
            <li>• CSV-eksport</li>
            <li>• Ubegrenset historikk</li>
          </ul>
        </div>
        <div className="text-sm opacity-70 mb-6 text-center">Pris annonseres snart</div>

        {isSuccess ? (
          <div className="space-y-4 mb-4">
            <div className="rounded-xl border p-4 bg-green-50 border-green-200 text-center">
              <div className="text-xl font-semibold text-green-800 mb-2">Takk!</div>
              <div className="text-sm text-green-800 mb-2">Du er lagt til på ventelisten. Vi gir deg beskjed når Pro-abonnementet er klart.</div>
              <div className="text-xs text-green-700">Ingen spam. Kun én e-post.</div>
            </div>
            <button className="w-full rounded-xl border px-4 py-2 font-medium hover:bg-black/5" onClick={onClose} type="button">Lukk</button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3 mb-4">
              <p className="text-xs opacity-70 mb-2">Oppgi e-post for å få beskjed når Pro lanseres:</p>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorText(""); }} placeholder="E-post" className="w-full rounded-xl border px-3 py-2" required disabled={isSubmitting} />
              {errorText && <div className="text-xs text-red-600 px-1">{errorText}</div>}
              <button className="w-full rounded-xl border px-4 py-2 font-medium bg-black text-white hover:bg-black/90 disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sender..." : "Send"}</button>
            </form>
            <div className="flex gap-3">
              <button className="flex-1 rounded-xl border px-4 py-2 font-medium hover:bg-black/5" onClick={onClose} type="button">Lukk</button>
            </div>
          </>
        )}

        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div>
              <button className="text-xs opacity-50 hover:opacity-100" onClick={() => setShowTestLink(!showTestLink)} type="button">{showTestLink ? "Skjul" : "Vis"} test-lenke</button>
              {showTestLink && (
                <div className="mt-2">
                  <button className="text-xs underline opacity-70 hover:opacity-100" onClick={handleTestPro} type="button">Jeg har allerede Pro (test)</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
