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
  { label: "Rose",   value: "#e11d48" },
  { label: "Teal",   value: "#0d9488" },
  { label: "Violet", value: "#7c3aed" },
];

const mono    = { fontFamily: "'JetBrains Mono', monospace" } as const;
const heading = { fontFamily: "'Bricolage Grotesque', sans-serif" } as const;

// ─── Tiny sub-components ──────────────────────────────────────────────────────

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-widest block mb-2"
      style={{ ...mono, color: "var(--ink-muted)" }}
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
      className="px-2.5 py-1 rounded text-[11px] transition-all duration-150"
      style={{
        ...mono,
        background: active ? "var(--ink-text)" : "transparent",
        color: active ? "#ffffff" : "var(--ink-sub)",
        border: "1px solid",
        borderColor: active ? "var(--ink-text)" : "var(--ink-border)",
        fontWeight: active ? 700 : 400,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink-border2)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink-border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-sub)";
        }
      }}
    >
      {children}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function HeroPlayground() {
  const [font, setFont]           = useState("Playfair Display");
  const [animation, setAnimation] = useState<HeroAnimation>("cascade");
  const [italic, setItalic]       = useState(true);
  const [accentColor, setAccent]  = useState("#7c3aed");
  const [text, setText]           = useState("Design with intention");
  const [isMounted, setIsMounted] = useState(false);
  const [key, setKey]             = useState(0);

  const replay = useCallback(() => setKey((k) => k + 1), []);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(replay, 150);
    return () => clearTimeout(timer);
  }, [replay]);

  const words       = text.trim().split(/\s+/);
  const leadingWords = words.slice(0, -1).join(" ");
  const lastWord    = words[words.length - 1];
  const displayText = words.map((w: string, i: number, arr: string[]) =>
    i === arr.length - 1 ? `<em>${w}</em>` : w
  ).join(" ");

  return (
    <div
      className="overflow-hidden"
      style={{
        border: "1px solid var(--ink-border)",
        borderRadius: "16px",
        background: "#ffffff",
      }}
    >
      {/* ── Preview ─────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-center min-h-[180px] sm:min-h-[240px] px-6 sm:px-12 py-10 sm:py-14 relative"
        style={{ background: "var(--ink-surface)" }}
      >
        {/* Fine grid background — matches footer's understated vibe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--ink-border) 1px, transparent 1px), linear-gradient(90deg, var(--ink-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />
        <div key={key} className="relative text-center max-w-3xl w-full">
          {isMounted && (
            <Typography
              variant="Display"
              font={font}
              animation={animation}
              italic={italic}
              accentColor={accentColor}
              color="var(--ink-text)"
            >
              {leadingWords ? `${leadingWords} ` : ""}<em>{lastWord}</em>
            </Typography>
          )}
        </div>
      </div>

      {/* ── Controls ────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--ink-border)" }}>

        {/* Row 1: Font + Accent + Italic */}
        <div
          className="grid sm:grid-cols-[1fr_auto_auto] gap-px"
          style={{ borderBottom: "1px solid var(--ink-border)" }}
        >
          {/* Font picker */}
          <div className="px-5 py-4" style={{ borderRight: "1px solid var(--ink-border)" }}>
            <ControlLabel>font</ControlLabel>
            <div className="flex flex-wrap gap-1.5">
              {FONTS.map((f) => (
                <PillButton key={f} active={font === f} onClick={() => { setFont(f); replay(); }}>
                  {f}
                </PillButton>
              ))}
            </div>
          </div>

          {/* Accent swatches */}
          <div className="px-5 py-4" style={{ borderRight: "1px solid var(--ink-border)" }}>
            <ControlLabel>accentColor</ControlLabel>
            <div className="flex items-center gap-2.5 mt-1">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => { setAccent(c.value); replay(); }}
                  title={c.label}
                  className="w-5 h-5 rounded-full shrink-0 transition-all duration-150"
                  style={{
                    background: c.value,
                    outline: accentColor === c.value ? `2px solid ${c.value}` : "2px solid transparent",
                    outlineOffset: "2px",
                    opacity: accentColor === c.value ? 1 : 0.35,
                    transform: accentColor === c.value ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Italic toggle */}
          <div className="px-5 py-4">
            <ControlLabel>italic</ControlLabel>
            <button
              onClick={() => { setItalic((v) => !v); replay(); }}
              role="switch"
              aria-checked={italic}
              className="flex items-center gap-2 mt-0.5"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <span
                className="relative rounded-full shrink-0 transition-colors duration-200"
                style={{
                  width: "32px",
                  height: "18px",
                  background: italic ? "var(--ink-text)" : "var(--ink-border2)",
                  display: "inline-block",
                }}
              >
                <span
                  className="absolute rounded-full transition-transform duration-200"
                  style={{
                    top: "2px",
                    left: "2px",
                    width: "14px",
                    height: "14px",
                    background: "#ffffff",
                    transform: italic ? "translateX(14px)" : "translateX(0)",
                  }}
                />
              </span>
              <span
                className="text-[11px] font-bold"
                style={{ ...mono, color: italic ? "var(--ink-text)" : "var(--ink-muted)" }}
              >
                {italic ? "on" : "off"}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Animation picker */}
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid var(--ink-border)" }}
        >
          <ControlLabel>animation</ControlLabel>
          <div className="flex flex-wrap gap-1.5">
            {ANIMATIONS.map((a) => (
              <PillButton key={a} active={animation === a} onClick={() => { setAnimation(a); replay(); }}>
                {a}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Row 3: Text input + Replay */}
        <div className="px-5 py-4 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value || "Design with intention")}
            placeholder="Edit text…"
            className="flex-1 min-w-[180px] px-3 py-1.5 text-sm outline-none rounded"
            style={{
              ...mono,
              fontSize: "0.8rem",
              background: "var(--ink-surface)",
              border: "1px solid var(--ink-border)",
              color: "var(--ink-text)",
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--ink-border2)"; }}
            onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = "var(--ink-border)"; }}
          />
          <button
            onClick={replay}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded text-[11px] font-bold transition-all duration-150"
            style={{
              ...mono,
              background: "var(--ink-text)",
              color: "#ffffff",
              border: "1px solid var(--ink-text)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Replay
          </button>
        </div>

        {/* Row 4: Live code output */}
        <div
          className="px-5 py-4 text-[11px] leading-relaxed overflow-x-auto"
          style={{
            ...mono,
            borderTop: "1px solid var(--ink-border)",
            background: "var(--ink-surface)",
            color: "var(--ink-sub)",
          }}
        >
          <span style={{ color: "var(--ink-muted)" }}>{"<"}</span>
          <span style={{ color: "var(--ink-accent)" }}>Typography</span>
          {" "}
          <span style={{ color: "var(--ink-muted)" }}>variant</span>
          <span style={{ color: "var(--ink-border2)" }}>{"="}</span>
          <span style={{ color: "var(--ink-sub)" }}>&quot;Display&quot;</span>
          {" "}
          <span style={{ color: "var(--ink-muted)" }}>font</span>
          <span style={{ color: "var(--ink-border2)" }}>{"="}</span>
          <span style={{ color: "var(--ink-sub)" }}>&quot;{font}&quot;</span>
          {" "}
          <span style={{ color: "var(--ink-muted)" }}>animation</span>
          <span style={{ color: "var(--ink-border2)" }}>{"="}</span>
          <span style={{ color: "var(--ink-sub)" }}>&quot;{animation}&quot;</span>
          {italic && (
            <>
              {" "}
              <span style={{ color: "var(--ink-muted)" }}>italic</span>
              {" "}
              <span style={{ color: "var(--ink-muted)" }}>accentColor</span>
              <span style={{ color: "var(--ink-border2)" }}>{"="}</span>
              <span style={{ color: "var(--ink-sub)" }}>&quot;{accentColor}&quot;</span>
            </>
          )}
          <span style={{ color: "var(--ink-muted)" }}>{">"}</span>
          <br />
          {"  "}
          <span style={{ color: "var(--ink-text)" }}>{displayText}</span>
          <br />
          <span style={{ color: "var(--ink-muted)" }}>{"</"}</span>
          <span style={{ color: "var(--ink-accent)" }}>Typography</span>
          <span style={{ color: "var(--ink-muted)" }}>{">"}</span>
        </div>
      </div>
    </div>
  );
}
