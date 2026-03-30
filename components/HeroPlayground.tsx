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
    // Force a re-render after mount to ensure typography styles are captured correctly
    const timer = setTimeout(() => {
      replay();
    }, 150);
    return () => clearTimeout(timer);
  }, [replay]);

  const words = text.trim().split(/\s+/);
  const leadingWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];
  const displayText = words.map((w: string, i: number, arr: string[]) =>
    i === arr.length - 1 ? `<em>${w}</em>` : w
  ).join(" ");

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--ink-border)", background: "#ffffff" }}
    >
      {/* Preview */}
      <div
        className="flex items-center justify-center min-h-[180px] sm:min-h-[240px] px-4 sm:px-8 py-10 sm:py-14 relative overflow-hidden"
        style={{ background: "var(--ink-surface)" }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,20,10,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div key={key} className="relative text-center max-w-3xl">
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

      {/* Controls */}
      <div
        className="p-6 flex flex-col gap-5"
        style={{ borderTop: "1px solid var(--ink-border)" }}
      >
        {/* Font */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            font
          </label>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap gap-1.5">
            {FONTS.map((f) => (
              <button
                key={f}
                onClick={() => { setFont(f); replay(); }}
                className="px-2.5 py-2 sm:py-1 rounded-lg text-[10px] sm:text-xs transition-all duration-150"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: font === f ? "rgba(120,120,140,0.1)" : "var(--ink-surface)",
                  color: font === f ? "var(--ink-accent)" : "var(--ink-sub)",
                  border: "1px solid",
                  borderColor: font === f ? "rgba(120,120,140,0.35)" : "var(--ink-border)",
                  fontWeight: font === f ? 600 : 400,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Accent color + italic toggle row */}
        <div className="flex flex-wrap items-start gap-6">
          {/* Accent color */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              accentColor
            </label>
            <div className="flex gap-2 items-center" style={{ height: "28px" }}>
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => { setAccent(c.value); replay(); }}
                  title={c.label}
                  className="w-6 h-6 rounded-full transition-all duration-150 shrink-0"
                  style={{
                    background: c.value,
                    outline: accentColor === c.value ? `2px solid ${c.value}` : "2px solid transparent",
                    outlineOffset: "2px",
                    opacity: accentColor === c.value ? 1 : 0.4,
                    transform: accentColor === c.value ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Italic toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              italic
            </label>
            <button
              onClick={() => { setItalic((v) => !v); replay(); }}
              role="switch"
              aria-checked={italic}
              className="flex items-center gap-2.5 rounded-lg transition-all duration-200"
              style={{
                height: "28px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0",
              }}
            >
              {/* Track */}
              <span
                className="relative rounded-full transition-colors duration-200 shrink-0"
                style={{
                  width: "36px",
                  height: "20px",
                  background: italic ? "var(--ink-accent)" : "var(--ink-border2)",
                  display: "inline-block",
                }}
              >
                <span
                  className="absolute rounded-full transition-transform duration-200 flex items-center justify-center"
                  style={{
                    top: "2px",
                    left: "2px",
                    width: "16px",
                    height: "16px",
                    background: "#ffffff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transform: italic ? "translateX(16px)" : "translateX(0px)",
                  }}
                />
              </span>
              <span
                className="text-xs font-medium transition-colors"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: italic ? "var(--ink-accent)" : "var(--ink-sub)",
                }}
              >
                {italic ? "on" : "off"}
              </span>
            </button>
          </div>
        </div>

        {/* Animation picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            animation
          </label>
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:flex sm:flex-wrap gap-1.5">
            {ANIMATIONS.map((a) => (
              <button
                key={a}
                onClick={() => { setAnimation(a); replay(); }}
                className="px-2 py-2 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs transition-all duration-150"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: animation === a ? "rgba(120,120,140,0.1)" : "var(--ink-surface)",
                  color: animation === a ? "var(--ink-accent)" : "var(--ink-sub)",
                  border: "1px solid",
                  borderColor: animation === a ? "rgba(120,120,140,0.35)" : "var(--ink-border)",
                  fontWeight: animation === a ? 600 : 400,
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Text input + replay */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value || "Design with intention")}
            placeholder="Edit text..."
            className="flex-1 min-w-[180px] px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "var(--ink-surface)",
              border: "1px solid var(--ink-border)",
              color: "var(--ink-text)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(120,120,140,0.4)"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--ink-border)"; }}
          />
          <button
            onClick={replay}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
            style={{
              background: "var(--ink-accent)",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              border: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
              Replay
            </span>
          </button>
        </div>

        {/* Live code */}
        <div
          className="rounded-lg px-4 py-3 text-xs leading-relaxed overflow-x-auto"
          style={{
            background: "var(--ink-code-bg)",
            border: "1px solid var(--ink-border)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span style={{ color: "#6355a0" }}>{"<"}</span>
          <span style={{ color: "#2a7a6a" }}>Typography</span>
          {" "}
          <span style={{ color: "#8a8a9a" }}>variant</span>
          <span style={{ color: "#8a8a9a" }}>{"="}</span>
          <span style={{ color: "#6a7a8a" }}>&quot;Display&quot;</span>
          {" "}
          <span style={{ color: "#8a8a9a" }}>font</span>
          <span style={{ color: "#8a8a9a" }}>{"="}</span>
          <span style={{ color: "#6a7a8a" }}>&quot;{font}&quot;</span>
          {" "}
          <span style={{ color: "#8a8a9a" }}>animation</span>
          <span style={{ color: "#8a8a9a" }}>{"="}</span>
          <span style={{ color: "#6a7a8a" }}>&quot;{animation}&quot;</span>
          {italic && (
            <>
              {" "}
              <span style={{ color: "#8a8a9a" }}>italic</span>
              {" "}
              <span style={{ color: "#8a8a9a" }}>accentColor</span>
              <span style={{ color: "#8a8a9a" }}>{"="}</span>
              <span style={{ color: "#6a7a8a" }}>&quot;{accentColor}&quot;</span>
            </>
          )}
          <span style={{ color: "#6355a0" }}>{">"}</span>
          <br />
          {"  "}
          <span style={{ color: "var(--ink-sub)" }}>{displayText}</span>
          <br />
          <span style={{ color: "#6355a0" }}>{"</"}</span>
          <span style={{ color: "#2a7a6a" }}>Typography</span>
          <span style={{ color: "#6355a0" }}>{">"}</span>
        </div>
      </div>
    </div>
  );
}
