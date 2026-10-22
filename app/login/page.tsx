
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth(action: "login" | "signup") {
    setLoading(true);
    setMessage("");

    try {
      const result =
        action === "signup"
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) {
        setMessage(result.error.message);
      } else if (action === "signup" && !result.data.session) {
        setMessage("ثبت‌نام انجام شد؛ ایمیلت رو برای تأیید بررسی کن.");
      } else {
        window.location.href = "/";
      }
    } catch {
      setMessage("خطایی رخ داد. دوباره تلاش کن.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#10121b",
      color: "white",
      padding: 20
    }}>
      <section style={{ width: "100%", maxWidth: 360 }}>
        <h1 style={{ textAlign: "center", color: "#facc15" }}>
          ZARCO
        </h1>
        <h2 style={{ textAlign: "center" }}>ورود یا ثبت‌نام</h2>

        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="رمز عبور (حداقل ۶ کاراکتر)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          style={inputStyle}
        />

        <button
          disabled={loading || !email.trim() || password.length < 6}
          onClick={() => handleAuth("login")}
          style={buttonStyle}
        >
          ورود
        </button>

        <button
          disabled={loading || !email.trim() || password.length < 6}
          onClick={() => handleAuth("signup")}
          style={{ ...buttonStyle, background: "#374151" }}
        >
          ثبت‌نام
        </button>

        <p style={{ textAlign: "center", overflowWrap: "anywhere" }}>
          {loading ? "لطفاً صبر کن..." : message}
        </p>

        <p style={{ textAlign: "center" }}>
          <a href="/" style={{ color: "#facc15" }}>
            بازگشت به بازی
          </a>
        </p>
      </section>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 14,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #444",
  background: "#202331",
  color: "white",
  fontSize: 16
};

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: 14,
  marginBottom: 10,
  border: "none",
  borderRadius: 10,
  background: "#facc15",
  color: "#111",
  fontSize: 16,
  fontWeight: "bold" as const,
  cursor: "pointer"
};
