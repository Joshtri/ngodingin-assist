import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ngodingin - Jasa Pembuatan Aplikasi";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "white",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
              fontSize: 40,
            }}
          >
            👨‍💻
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              margin: 0,
            }}
          >
            Ngodingin
          </h1>
        </div>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: 800,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Jasa Pembuatan Aplikasi
        </p>
        <p
          style={{
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            marginTop: 20,
            margin: 0,
          }}
        >
          Konsultasi Gratis • Teknologi Modern • Berpengalaman
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
