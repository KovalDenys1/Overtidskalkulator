import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Overtidskalkulator – en uke med 45 timer gir 5 timer overtid og 11 750 kr før skatt";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f6f7fb",
          color: "#1b2333",
          fontFamily: "sans-serif",
          padding: "72px 80px",
          gap: 56,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 600 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#1b2333",
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              OT
            </div>
            overtidskalkulator.no
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginTop: 40 }}>
            Hva blir overtiden din i kroner?
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#566078", marginTop: 24, lineHeight: 1.4 }}>
            Gratis kalkulator etter arbeidsmiljøloven. Uten innlogging.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 440,
            background: "#ffffff",
            borderRadius: 32,
            padding: 12,
            boxShadow: "0 12px 40px rgba(20, 30, 60, 0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#eaf0fd",
              borderRadius: 22,
              padding: "28px 28px 32px",
            }}
          >
            <div style={{ display: "flex", fontSize: 22, color: "#2546a8", fontWeight: 600 }}>Uke med 45 timer</div>
            <div style={{ display: "flex", fontSize: 22, color: "#566078", marginTop: 20 }}>Totalt før skatt</div>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, marginTop: 4 }}>11 750 kr</div>
            <div style={{ display: "flex", fontSize: 22, marginTop: 8 }}>Herav overtidstillegg +500 kr</div>
          </div>
          <div style={{ display: "flex", gap: 10, padding: "16px 4px 4px" }}>
            {[
              ["Timer", "45 t"],
              ["Ordinære", "40 t"],
              ["Overtid", "5 t"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  background: "#f6f7fb",
                  borderRadius: 16,
                  padding: "14px 16px",
                }}
              >
                <div style={{ display: "flex", fontSize: 18, color: "#566078" }}>{label}</div>
                <div style={{ display: "flex", fontSize: 30, fontWeight: 700, marginTop: 2 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
