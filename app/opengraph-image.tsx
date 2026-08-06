import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 24, display: "flex" }}>Overtidskalkulator</div>
        <div style={{ fontSize: 34, opacity: 0.8, display: "flex" }}>
          Beregn overtidstimer og tillegg etter norsk arbeidsmiljølov
        </div>
      </div>
    ),
    { ...size }
  );
}
