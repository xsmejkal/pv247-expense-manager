import { ImageResponse } from "next/og";

export const runtime = "edge";

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
          fontSize: 42,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 72, marginBottom: 24 }}>Expense Manager++</h1>
        <p style={{ fontSize: 32, margin: "0 0 24px 0" }}>
          The ultimate solution for managing your expenses.
        </p>
        <p style={{ fontSize: 24, margin: "0" }}>
          Easy to use, efficient, and powerful. Take control of your finances
          today!
        </p>
      </div>
    ),
    { ...size }
  );
}
