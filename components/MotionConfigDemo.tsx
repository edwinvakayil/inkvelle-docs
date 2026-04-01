"use client";
import { useState, useCallback } from "react";
import { Typography } from "inkvelle";
import CodeBlock from "./CodeBlock";

type Split = "none" | "words" | "chars";

const KEYFRAME_PRESETS = [
  { label: "Slide up + skew",  keyframes: `from { opacity: 0; transform: translateY(24px) skewX(6deg); }\nto   { opacity: 1; transform: none; }` },
  { label: "Rotate in",        keyframes: `from { opacity: 0; transform: translateX(-20px) rotate(-4deg); }\nto   { opacity: 1; transform: none; }` },
  { label: "Scale + fade",     keyframes: `from { opacity: 0; transform: scaleY(0) translateY(10px); }\nto   { opacity: 1; transform: none; }` },
  { label: "Blur resolve",     keyframes: `from { opacity: 0; filter: blur(8px); transform: scale(0.96); }\nto   { opacity: 1; filter: blur(0px); transform: none; }` },
  { label: "Stamp in",         keyframes: `from { opacity: 0; transform: scaleX(0.4) scaleY(1.3); }\nto   { opacity: 1; transform: none; }` },
  { label: "Drop + bounce",    keyframes: `0%   { opacity: 0; transform: translateY(-30px) scaleY(1.2); }\n70%  { transform: translateY(6px) scaleY(0.95); }\n100% { opacity: 1; transform: none; }` },
];

const SPLIT_OPTIONS: { value: Split; label: string; desc: string }[] = [
  { value: "none",  label: "none",  desc: "Whole element"  },
  { value: "words", label: "words", desc: "Per word"       },
  { value: "chars", label: "chars", desc: "Per character"  },
];

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest block mb-2" style={{ ...mono, color: "var(--ink-muted)" }}>
      {children}
    </span>
  );
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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

const fieldStyle: React.CSSProperties = {
  ...mono,
  fontSize: "0.8rem",
  background: "var(--ink-surface)",
  border: "1px solid var(--ink-border)",
  color: "var(--ink-text)",
  outline: "none",
  borderRadius: "4px",
  padding: "0.375rem 0.625rem",
  width: "100%",
  transition: "border-color 0.15s",
};

const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = "var(--ink-border2)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  (e.target as HTMLElement).style.borderColor = "var(--ink-border)";
};

export default function MotionConfigDemo() {
  const [keyframes,    setKeyframes]    = useState(KEYFRAME_PRESETS[0].keyframes);
  const [duration,     setDuration]     = useState("0.8");
  const [easing,       setEasing]       = useState("cubic-bezier(0.16, 1, 0.3, 1)");
  const [delay,        setDelay]        = useState("0");
  const [split,        setSplit]        = useState<Split>("words");
  const [staggerDelay, setStaggerDelay] = useState("0.07");
  const [previewKey,   setPreviewKey]   = useState(0);

  const replay = useCallback(() => setPreviewKey((k) => k + 1), []);

  const motionConfig = {
    keyframes,
    duration:     `${duration}s`,
    easing,
    delay:        `${delay}s`,
    split,
    staggerDelay: parseFloat(staggerDelay),
  };

  const codeString = `<Typography
  variant="H2"
  font="Bricolage Grotesque"
  motionConfig={{
    keyframes: \`${keyframes}\`,
    duration:     "${duration}s",
    easing:       "${easing}",
    delay:        "${delay}s",${split !== "none" ? `
    split:        "${split}",
    staggerDelay: ${staggerDelay},` : ""}
  }}
>
  Your heading text
</Typography>`;

  return (
    <div
      className="overflow-hidden"
      style={{ border: "1px solid var(--ink-border)", borderRadius: "16px", background: "#ffffff" }}
    >
      {/* ── Preview ─────────────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center min-h-[160px] px-8 py-10 overflow-hidden"
        style={{ background: "var(--ink-surface)" }}
      >
        {/* Grid line background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--ink-border) 1px, transparent 1px), linear-gradient(90deg, var(--ink-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />
        <div key={previewKey} className="relative text-center">
          <Typography variant="H1" font="Bricolage Grotesque" motionConfig={motionConfig} color="var(--ink-text)">
            Your heading text
          </Typography>
        </div>
      </div>

      {/* ── Controls ────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--ink-border)" }}>

        {/* Preset picker */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--ink-border)" }}>
          <ControlLabel>keyframe preset</ControlLabel>
          <div className="flex flex-wrap gap-1.5">
            {KEYFRAME_PRESETS.map((p) => (
              <PillButton
                key={p.label}
                active={keyframes === p.keyframes}
                onClick={() => { setKeyframes(p.keyframes); replay(); }}
              >
                {p.label}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Keyframes textarea */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--ink-border)" }}>
          <ControlLabel>keyframes body</ControlLabel>
          <textarea
            value={keyframes}
            onChange={(e) => setKeyframes(e.target.value)}
            rows={3}
            style={{ ...fieldStyle, background: "var(--ink-code-bg)", lineHeight: 1.7, resize: "vertical" }}
            onFocus={onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
            onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
          />
        </div>

        {/* Duration / Delay / Easing */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ borderBottom: "1px solid var(--ink-border)" }}
        >
          {[
            { label: "duration (s)", value: duration, set: setDuration },
            { label: "delay (s)",    value: delay,    set: setDelay    },
          ].map(({ label, value, set }, i) => (
            <div
              key={label}
              className="px-5 py-4"
              style={{ borderRight: "1px solid var(--ink-border)" }}
            >
              <ControlLabel>{label}</ControlLabel>
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                style={fieldStyle}
                onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
                onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
              />
            </div>
          ))}

          <div className="px-5 py-4">
            <ControlLabel>easing</ControlLabel>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}
              onFocus={onFocus as React.FocusEventHandler<HTMLSelectElement>}
              onBlur={onBlur as React.FocusEventHandler<HTMLSelectElement>}
            >
              <option value="cubic-bezier(0.16, 1, 0.3, 1)">expo out</option>
              <option value="cubic-bezier(0.34, 1.56, 0.64, 1)">spring overshoot</option>
              <option value="cubic-bezier(0.4, 0, 0.2, 1)">material ease</option>
              <option value="ease-in-out">ease-in-out</option>
              <option value="ease-out">ease-out</option>
              <option value="linear">linear</option>
            </select>
          </div>
        </div>

        {/* Split + Stagger */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderBottom: "1px solid var(--ink-border)" }}
        >
          <div className="px-5 py-4" style={{ borderRight: "1px solid var(--ink-border)" }}>
            <ControlLabel>split</ControlLabel>
            <div className="flex gap-1.5">
              {SPLIT_OPTIONS.map((opt) => (
                <PillButton key={opt.value} active={split === opt.value} onClick={() => setSplit(opt.value)}>
                  {opt.label}
                </PillButton>
              ))}
            </div>
          </div>

          <div className="px-5 py-4" style={{ opacity: split === "none" ? 0.4 : 1, transition: "opacity 0.2s" }}>
            <ControlLabel>staggerDelay (s)</ControlLabel>
            <input
              type="text"
              value={staggerDelay}
              onChange={(e) => setStaggerDelay(e.target.value)}
              disabled={split === "none"}
              style={{ ...fieldStyle, cursor: split === "none" ? "not-allowed" : "text" }}
              onFocus={onFocus as React.FocusEventHandler<HTMLInputElement>}
              onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            />
          </div>
        </div>

        {/* Replay */}
        <div className="px-5 py-4 flex justify-end">
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
            Replay animation
          </button>
        </div>
      </div>

      {/* ── Generated code ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--ink-border)" }}>
        <div
          className="px-5 py-2.5 flex items-center gap-2"
          style={{ ...mono, background: "var(--ink-surface)", borderBottom: "1px solid var(--ink-border)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink-muted)" }}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--ink-muted)" }}>
            generated code
          </span>
        </div>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-4" style={{ background: "var(--ink-surface)" }}>
          <CodeBlock code={codeString} language="tsx" />
        </div>
      </div>
    </div>
  );
}
