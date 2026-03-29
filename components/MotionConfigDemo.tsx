"use client";
import { useState, useCallback } from "react";
import { Typography } from "inkvelle";
import CodeBlock from "./CodeBlock";

type Split = "none" | "words" | "chars";

const KEYFRAME_PRESETS = [
  { label: "Slide up + skew", keyframes: `from { opacity: 0; transform: translateY(24px) skewX(6deg); }\nto   { opacity: 1; transform: none; }` },
  { label: "Rotate in", keyframes: `from { opacity: 0; transform: translateX(-20px) rotate(-4deg); }\nto   { opacity: 1; transform: none; }` },
  { label: "Scale + fade", keyframes: `from { opacity: 0; transform: scaleY(0) translateY(10px); }\nto   { opacity: 1; transform: none; }` },
  { label: "Blur resolve", keyframes: `from { opacity: 0; filter: blur(8px); transform: scale(0.96); }\nto   { opacity: 1; filter: blur(0px); transform: none; }` },
  { label: "Stamp in", keyframes: `from { opacity: 0; transform: scaleX(0.4) scaleY(1.3); }\nto   { opacity: 1; transform: none; }` },
  { label: "Drop + bounce", keyframes: `0%   { opacity: 0; transform: translateY(-30px) scaleY(1.2); }\n70%  { transform: translateY(6px) scaleY(0.95); }\n100% { opacity: 1; transform: none; }` },
];

const SPLIT_OPTIONS: { value: Split; label: string; desc: string }[] = [
  { value: "none", label: "none", desc: "Whole element" },
  { value: "words", label: "words", desc: "Per word" },
  { value: "chars", label: "chars", desc: "Per character" },
];

const inputStyle = {
  background: "#ffffff",
  border: "1px solid var(--ink-border)",
  color: "var(--ink-text)",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.8rem",
  outline: "none",
  borderRadius: "0.5rem",
  padding: "0.5rem 0.75rem",
  width: "100%",
  transition: "border-color 0.15s",
};

export default function MotionConfigDemo() {
  const [keyframes, setKeyframes] = useState(KEYFRAME_PRESETS[0].keyframes);
  const [duration, setDuration] = useState("0.8");
  const [easing, setEasing] = useState("cubic-bezier(0.16, 1, 0.3, 1)");
  const [delay, setDelay] = useState("0");
  const [split, setSplit] = useState<Split>("words");
  const [staggerDelay, setStaggerDelay] = useState("0.07");
  const [previewKey, setPreviewKey] = useState(0);

  const replay = useCallback(() => setPreviewKey((k) => k + 1), []);

  const motionConfig = {
    keyframes,
    duration: `${duration}s`,
    easing,
    delay: `${delay}s`,
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
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--ink-border)", background: "#ffffff" }}
    >
      {/* Preview */}
      <div
        className="flex items-center justify-center min-h-[160px] px-8 py-10 relative overflow-hidden"
        style={{ background: "var(--ink-surface)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,20,10,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div key={previewKey} className="relative text-center">
          <Typography
            variant="H1"
            font="Bricolage Grotesque"
            motionConfig={motionConfig}
            color="var(--ink-text)"
          >
            Your heading text
          </Typography>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 flex flex-col gap-5" style={{ borderTop: "1px solid var(--ink-border)" }}>

        {/* Preset buttons */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            keyframe preset
          </label>
          <div className="flex flex-wrap gap-1.5">
            {KEYFRAME_PRESETS.map((p) => {
              const active = keyframes === p.keyframes;
              return (
                <button
                  key={p.label}
                  onClick={() => { setKeyframes(p.keyframes); setPreviewKey((k) => k + 1); }}
                  className="px-2.5 py-1 rounded-lg text-xs transition-all duration-150"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: active ? "rgba(120,120,140,0.1)" : "var(--ink-surface)",
                    color: active ? "var(--ink-accent)" : "var(--ink-sub)",
                    border: "1px solid",
                    borderColor: active ? "rgba(120,120,140,0.35)" : "var(--ink-border)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyframe textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            keyframes body
          </label>
          <textarea
            value={keyframes}
            onChange={(e) => setKeyframes(e.target.value)}
            rows={3}
            style={{ ...inputStyle, background: "var(--ink-code-bg)", color: "var(--ink-code-text)", lineHeight: 1.7, resize: "vertical" }}
            onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(120,120,140,0.45)"; }}
            onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--ink-border)"; }}
          />
        </div>

        {/* Duration / delay / easing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "duration (s)", value: duration, set: setDuration },
            { label: "delay (s)", value: delay, set: setDelay },
          ].map(({ label, value, set }) => (
            <div key={label} className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                {label}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(120,120,140,0.45)"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--ink-border)"; }}
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              easing
            </label>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
              onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = "rgba(120,120,140,0.45)"; }}
              onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = "var(--ink-border)"; }}
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

        {/* Split + stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              split
            </label>
            <div className="flex gap-2">
              {SPLIT_OPTIONS.map((opt) => {
                const active = split === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSplit(opt.value)}
                    title={opt.desc}
                    className="flex-1 py-2 rounded-lg text-xs transition-all duration-150"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: active ? "rgba(120,120,140,0.1)" : "var(--ink-surface)",
                      color: active ? "var(--ink-accent)" : "var(--ink-sub)",
                      border: "1px solid",
                      borderColor: active ? "rgba(120,120,140,0.35)" : "var(--ink-border)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {split !== "none" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--ink-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                staggerDelay (s)
              </label>
              <input
                type="text"
                value={staggerDelay}
                onChange={(e) => setStaggerDelay(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(120,120,140,0.45)"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--ink-border)"; }}
              />
            </div>
          )}
        </div>

        {/* Replay */}
        <div className="flex justify-end">
          <button
            onClick={replay}
            className="px-5 py-2 rounded-xl text-xs font-semibold transition-opacity duration-150"
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Replay animation
            </span>
          </button>
        </div>
      </div>

      {/* Generated code */}
      <div className="bg-gradient-to-b from-transparent to-black/5 dark:to-white/5" style={{ borderTop: "1px solid var(--ink-border)" }}>
        <div
          className="px-6 py-4 text-xs tracking-widest font-bold flex items-center gap-2 border-b"
          style={{ color: "var(--ink-text)", fontFamily: "'JetBrains Mono', monospace", background: "var(--ink-surface)", borderColor: "var(--ink-border)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          GENERATED CODE
        </div>
        <div className="px-4 pb-4 sm:px-8 sm:pb-8 pt-2" style={{ background: "var(--ink-surface)" }}>
          <CodeBlock code={codeString} language="tsx" />
        </div>
      </div>
    </div>
  );
}
