import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red upward glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "150px",
            width: "900px",
            height: "420px",
            background:
              "radial-gradient(ellipse, rgba(196,30,30,0.38) 0%, transparent 68%)",
            borderRadius: "50%",
          }}
        />

        {/* Brand mark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: "#FAFAFA",
              letterSpacing: "-3px",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            KOMODO
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#C41E1E",
              letterSpacing: "14px",
              textTransform: "uppercase",
              marginTop: "6px",
            }}
          >
            SAUCES
          </div>

          <div
            style={{
              width: "60px",
              height: "2px",
              background: "#C41E1E",
              marginTop: "24px",
            }}
          />

          <div
            style={{
              fontSize: 18,
              color: "#6B6B6B",
              marginTop: "22px",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Small-batch · Chef-crafted · Made with purpose
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
