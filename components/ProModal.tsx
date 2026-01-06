"use client";

import { useState, useEffect } from "react";
import { saveIsPro, saveWaitlistEmail, loadWaitlistEmails, incrementMetric, loadMetrics, type Metrics } from "@/lib/storage";
import type { CalcResult, Shift, Settings } from "@/lib/types";

const PRO_PRICE = 49;

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
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    pro_modal_open_count: 0,
    pro_send_count: 0,
    export_pdf_click_count: 0,
    export_csv_click_count: 0,
  });

  useEffect(() => {
    if (isOpen) {
      incrementMetric("pro_modal_open_count");
      setMetrics(loadMetrics());
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
      setMetrics(loadMetrics());
      setSubmitted(true);
    }
  };

  const handleCopyEmail = async () => {
    if (email.trim()) {
      try {
        await navigator.clipboard.writeText(email.trim());
        setCopyStatus("Kopiert!");
        setTimeout(() => setCopyStatus(null), 1500);
      } catch {
        setCopyStatus("Kunne ikke kopiere");
        setTimeout(() => setCopyStatus(null), 1500);
      }
    }
  };

  const handleCopyAllEmails = async () => {
    const emails = loadWaitlistEmails();
    if (emails.length > 0) {
      try {
        await navigator.clipboard.writeText(emails.join("\n"));
        setCopyStatus("Kopiert!");
        setTimeout(() => setCopyStatus(null), 1500);
      } catch {
        setCopyStatus("Kunne ikke kopiere");
        setTimeout(() => setCopyStatus(null), 1500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="rounded-2xl border bg-white p-6 shadow-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-2">Pro</h2>
        <p className="text-sm opacity-80 mb-4">
          PDF- og CSV-rapporter er Pro-funksjoner som lanseres snart.
        </p>
        <p className="text-sm opacity-80 mb-2">
          Last ned PDF/CSV-rapport og lagre historikk uten begrensning.
        </p>
        <div className="text-lg font-semibold mb-6">{PRO_PRICE} NOK</div>
        {submitted ? (
          <div className="space-y-3 mb-4">
            <div className="rounded-xl border p-4 bg-green-50 border-green-200 text-center">
              <div className="font-semibold text-green-800">Takk!</div>
            </div>
            <div className="text-xs opacity-70 text-center">
              Du får ikke tilgang til PDF/CSV i denne versjonen.
            </div>
            <div className="text-xs opacity-70 text-center">
              E-post lagres lokalt på denne enheten (MVP).
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
            <div className="flex gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-black/5"
                type="button"
              >
                Kopier e-post
              </button>
              <button
                onClick={handleCopyAllEmails}
                className="flex-1 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-black/5"
                type="button"
              >
                Kopier alle e-poster
              </button>
            </div>
            {copyStatus && (
              <div className="text-xs text-center opacity-70 mt-2">
                {copyStatus}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <p className="text-xs opacity-70 mb-2">
              I denne versjonen samler vi kun interesse. Nedlasting er ikke tilgjengelig ennå.
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
            <div className="text-xs opacity-50 text-center">
              Debug (lokalt): modal={metrics.pro_modal_open_count} send={metrics.pro_send_count}{" "}
              pdf={metrics.export_pdf_click_count} csv={metrics.export_csv_click_count}
            </div>
            <div>
              <button
                className="text-xs opacity-50 hover:opacity-100"
                onClick={() => setShowTestLink(!showTestLink)}
                type="button"
              >
                {showTestLink ? "Skjul" : "Test"} test-lenke
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

