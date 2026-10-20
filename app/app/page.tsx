
"use client";

import { useState } from "react";

export default function Home() {
  const [points, setPoints] = useState(0);

  return (
    <main
      style={{
        background: "#111",
        color: "#f5c542",
        minHeight: "100vh",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>ZARCO</h1>
      <p>امتیاز شما</p>
      <h2 style={{ fontSize: "36px" }}>{points}</h2>

      <button
        onClick={() => setPoints((current) => current + 1)}
        style={{
          background: "#f5c542",
          color: "#111",
          border: "none",
          borderRadius: "16px",
          padding: "20px 40px",
          fontSize: "22px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🪙 لمس کن و امتیاز بگیر
      </button>
    </main>
  );
}
