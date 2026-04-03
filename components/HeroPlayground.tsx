"use client";
import { useState, useCallback, useEffect } from "react";
import { Typography } from "inkvelle";

const FONTS = [
  "Bricolage Grotesque", "Fraunces", "Playfair Display", "Outfit", "DM Sans", "Lora",
];

const ANIMATIONS = [
  "rise", "velvet", "curtain", "ground", "cascade",
  "hinge", "stretch", "unfurl", "slab", "stratify",
  "scanline", "chromaShift", "typewriter", "cinch",
  "liquid", "thread", "orbit"
] as const;

type HeroAnimation = typeof ANIMATIONS[number];

const ACCENT_COLORS = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Rose", value: "#e11d48" },
  { label: "Teal", value: "#0d9488" },
  { label: "Violet", value: "#7c3aed" },
];

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...mono,
        display: "block",
        fontSize: "11px",
        color: "#9ca3af",
        marginBottom: "10px",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...mono,
        padding: "3px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        cursor: "pointer",
        transition: "all 0.12s ease",
        background: active ? "#1c1c1c" : "transparent",
        color: active ? "#ffffff" : "#6b7280",
        border: `1px solid ${active ? "#1c1c1c" : "#e5e7eb"}`,
        fontWeight: active ? 500 : 400,
      }}
    >
      {children}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function HeroPlayground() {
  const [font, setFont] = useState("Playfair Display");
  const [animation, setAnimation] = useState<HeroAnimation>("cascade");
  const [italic, setItalic] = useState(true);
  const [accentColor, setAccent] = useState("#7c3aed");
  const [text, setText] = useState("Design with intention");
  const [isMounted, setIsMounted] = useState(false);
  const [key, setKey] = useState(0);

  const replay = useCallback(() => setKey((k) => k + 1), []);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(replay, 150);
    return () => clearTimeout(timer);
  }, [replay]);

  const words = text.trim().split(/\s+/);
  const leadingWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];
  const displayText = words.map((w: string, i: number, arr: string[]) =>
    i === arr.length - 1 ? `<em>${w}</em>` : w
  ).join(" ");

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px", maxWidth: "860px", margin: "0 auto" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "22px", fontWeight: 700, color: "#111827", letterSpacing: "-0.01em" }}>
            Inkvelle
          </span>
          <span style={{
            ...mono,
            fontSize: "12px",
            color: "#9ca3af",
            background: "#f3f4f6",
            padding: "2px 8px",
            borderRadius: "4px",
          }}>
            v1.0.0
          </span>
          <span style={{ color: "#d1d5db", fontSize: "12px" }}>/</span>
          <a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "13px" }}>☆</a>
        </div>
        <p style={{ ...mono, fontSize: "13px", color: "#9ca3af", margin: 0 }}>
          Fluid text animations powered by Motion.
        </p>
      </div>

      {/* ── Main Preview Card ───────────────────────────────────────────────── */}
      <div style={{
        background: "#f9fafb",
        border: "1px solid #f3f4f6",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "240px",
        marginBottom: "24px",
      }}>
        <div key={key} style={{ textAlign: "center" }}>
          {isMounted && (
            <Typography
              variant="Display"
              font={font}
              animation={animation}
              italic={italic}
              accentColor={accentColor}
              color="#111827"
            >
              {leadingWords ? `${leadingWords} ` : ""}<em>{lastWord}</em>
            </Typography>
          )}
        </div>
      </div>

      {/* ── Three Demo Cards ────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "40px" }}>
        {/* Font */}
        <div style={{
          background: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <p style={{ ...mono, fontSize: "11px", color: "#9ca3af", margin: "0 0 16px 0" }}>Font</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {FONTS.map((f) => (
              <PillButton key={f} active={font === f} onClick={() => { setFont(f); replay(); }}>
                {f.split(" ")[0]}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Animation */}
        <div style={{
          background: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <p style={{ ...mono, fontSize: "11px", color: "#9ca3af", margin: "0 0 16px 0" }}>Animation</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {ANIMATIONS.map((a) => (
              <PillButton key={a} active={animation === a} onClick={() => { setAnimation(a); replay(); }}>
                {a}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Accent + Italic */}
        <div style={{
          background: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ ...mono, fontSize: "11px", color: "#9ca3af", margin: "0 0 12px 0" }}>Accent</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => { setAccent(c.value); replay(); }}
                  title={c.label}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: c.value,
                    border: "none",
                    cursor: "pointer",
                    outline: accentColor === c.value ? `2px solid ${c.value}` : "2px solid transparent",
                    outlineOffset: "2px",
                    opacity: accentColor === c.value ? 1 : 0.35,
                    transform: accentColor === c.value ? "scale(1.2)" : "scale(1)",
                    transition: "all 0.15s ease",
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <p style={{ ...mono, fontSize: "11px", color: "#9ca3af", margin: "0 0 10px 0" }}>Italic</p>
            <button
              onClick={() => { setItalic((v) => !v); replay(); }}
              role="switch"
              aria-checked={italic}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span style={{
                position: "relative",
                width: "32px",
                height: "18px",
                background: italic ? "#1c1c1c" : "#e5e7eb",
                borderRadius: "100px",
                display: "inline-block",
                transition: "background 0.2s",
              }}>
                <span style={{
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  width: "14px",
                  height: "14px",
                  background: "#ffffff",
                  borderRadius: "50%",
                  transform: italic ? "translateX(14px)" : "translateX(0)",
                  transition: "transform 0.2s",
                }} />
              </span>
              <span style={{ ...mono, fontSize: "12px", color: italic ? "#111827" : "#9ca3af" }}>
                {italic ? "on" : "off"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Installation ────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "17px", fontWeight: 600, color: "#111827", margin: "0 0 14px 0" }}>
          Installation
        </h2>
        <div style={{
          background: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "8px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <span style={{ ...mono, fontSize: "13px", color: "#d1d5db" }}>$</span>
          <span style={{ ...mono, fontSize: "13px", color: "#374151" }}>npm install inkvelle</span>
        </div>
      </div>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "17px", fontWeight: 600, color: "#111827", margin: "0 0 14px 0" }}>
          Usage
        </h2>
        <div style={{
          background: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "8px",
          padding: "16px 20px",
        }}>
          {/* Live code output */}
          <div style={{ ...mono, fontSize: "12px", lineHeight: "1.9", color: "#6b7280" }}>
            <div style={{ color: "#9ca3af", marginBottom: "8px" }}>
              import {"{ Typography }"} from &quot;inkvelle&quot;;
            </div>
            <div>
              <span style={{ color: "#6b7280" }}>{"<"}</span>
              <span style={{ color: "#374151" }}>Typography</span>
              {" "}
              <span style={{ color: "#9ca3af" }}>variant</span>
              <span style={{ color: "#d1d5db" }}>{"="}</span>
              <span style={{ color: "#6b7280" }}>&quot;Display&quot;</span>
              {" "}
              <span style={{ color: "#9ca3af" }}>font</span>
              <span style={{ color: "#d1d5db" }}>{"="}</span>
              <span style={{ color: "#6b7280" }}>&quot;{font}&quot;</span>
              {" "}
              <span style={{ color: "#9ca3af" }}>animation</span>
              <span style={{ color: "#d1d5db" }}>{"="}</span>
              <span style={{ color: "#6b7280" }}>&quot;{animation}&quot;</span>
              {italic && (
                <>
                  {" "}
                  <span style={{ color: "#9ca3af" }}>italic</span>
                  {" "}
                  <span style={{ color: "#9ca3af" }}>accentColor</span>
                  <span style={{ color: "#d1d5db" }}>{"="}</span>
                  <span style={{ color: "#6b7280" }}>&quot;{accentColor}&quot;</span>
                </>
              )}
              <span style={{ color: "#6b7280" }}>{">"}</span>
              <br />
              {"  "}
              <span style={{ color: "#111827" }} dangerouslySetInnerHTML={{ __html: displayText }} />
              <br />
              <span style={{ color: "#6b7280" }}>{"</"}</span>
              <span style={{ color: "#374151" }}>Typography</span>
              <span style={{ color: "#6b7280" }}>{">"}</span>
            </div>
          </div>

          {/* Text input + Replay */}
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f3f4f6", display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value || "Design with intention")}
              placeholder="Edit text…"
              style={{
                ...mono,
                flex: 1,
                fontSize: "12px",
                padding: "6px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: "#ffffff",
                color: "#374151",
                outline: "none",
              }}
            />
            <button
              onClick={replay}
              style={{
                ...mono,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                background: "#1c1c1c",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "opacity 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.75"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Replay
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid #f3f4f6" }}>
        <span style={{ ...mono, fontSize: "12px", color: "#9ca3af" }}>
          built with inkvelle / ui.wiki
        </span>
        <nav style={{ display: "flex", gap: "20px" }}>
          {["home", "lab", "compare"].map((link) => (
            <a
              key={link}
              href="#"
              style={{ ...mono, fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#374151"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; }}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}