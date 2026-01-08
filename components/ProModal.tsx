"use client";

import { useState, useEffect } from "react";
import { saveIsPro, saveWaitlistEmail, loadWaitlistEmails, incrementMetric } from "@/lib/storage";
import { trackProModalOpened, trackWaitlistSubmitted } from "@/lib/analytics";
import type { CalcResult, Shift, Settings } from "@/lib/types";

type ProModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shifts?: Shift[];
  settings?: Settings;
  result?: CalcResult;
};

export default function ProModal({ isOpen, onClose, shifts, settings, result }: ProModalProps) {
  const [showTestLink, setShowTestLink] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      incrementMetric("pro_modal_open_count");
      trackProModalOpened();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestPro = (e: React.MouseEvent) => {
    e.preventDefault();
    saveIsPro(true);
    onClose();
    window.location.reload();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      saveWaitlistEmail(email.trim());
      incrementMetric("pro_send_count");
      trackWaitlistSubmitted();
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="rounded-2xl border bg-white p-6 shadow-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-2">Pro-funksjoner</h2>
        <p className="text-sm opacity-80 mb-4">
          PDF- og CSV-rapporter, samt ubegrenset historikk, lanseres som abonnement.
        </p>
        <div className="rounded-xl border p-3 mb-4 bg-gray-50">
          <div className="text-sm font-medium mb-2">Pro inkluderer:</div>
          <ul className="text-sm opacity-80 space-y-1">
            <li>• PDF-rapport</li>
            <li>• CSV-eksport</li>
            <li>• Ubegrenset historikk</li>
          </ul>
        </div>
        <div className="text-sm opacity-70 mb-6 text-center">
          Pris annonseres snart
        </div>
        {submitted ? (
          <div className="space-y-3 mb-4">
            <div className="rounded-xl border p-4 bg-green-50 border-green-200 text-center">
              <div className="font-semibold text-green-800 mb-1">Takk! Vi gir deg beskjed når Pro-abonnement er klart.</div>
              <div className="text-xs opacity-70 text-green-700">Ingen spam. Kun én e-post ved lansering.</div>
            </div>
            <button
              onClick={() => {
                if (shifts && settings && result) {
                  const printPayload = { shifts, settings, result };
                  if (typeof window !== "undefined") {
                    localStorage.setItem("overtid_print_payload_v1", JSON.stringify(printPayload));
                    window.open("/print", "_blank");
                  }
                }
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm font-medium hover:bg-black/5"
              type="button"
              disabled={!shifts || !settings || !result}
            >
              Se forhåndsvisning
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <p className="text-xs opacity-70 mb-2">
              Oppgi e-post for å få beskjed når Pro lanseres:
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-post"
              className="w-full rounded-xl border px-3 py-2"
              required
            />
            <button
              className="w-full rounded-xl border px-4 py-2 font-medium bg-black text-white hover:bg-black/90"
              type="submit"
            >
              Send
            </button>
          </form>
        )}
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-xl border px-4 py-2 font-medium hover:bg-black/5"
            onClick={onClose}
            type="button"
          >
            Lukk
          </button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div>
              <button
                className="text-xs opacity-50 hover:opacity-100"
                onClick={() => setShowTestLink(!showTestLink)}
                type="button"
              >
                {showTestLink ? "Skjul" : "Vis"} test-lenke
              </button>
              {showTestLink && (
                <div className="mt-2">
                  <button
                    className="text-xs underline opacity-70 hover:opacity-100"
                    onClick={handleTestPro}
                    type="button"
                  >
                    Jeg har allerede Pro (test)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

