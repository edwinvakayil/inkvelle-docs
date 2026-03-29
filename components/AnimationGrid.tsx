"use client";
import { useState, useCallback } from "react";
import { Typography } from "inkvelle";

const ANIMATIONS = [
  { name: "rise", desc: "Smooth upward fade-in", category: "original" },
  { name: "stagger", desc: "Word-by-word entrance", category: "original" },
  { name: "clip", desc: "Unmasked left to right", category: "original" },
  { name: "pop", desc: "Spring scale-in", category: "original" },
  { name: "letters", desc: "Letter-by-letter slide", category: "original" },
  { name: "blur", desc: "Emerges from a blur", category: "original" },
  { name: "flip", desc: "3D perspective rotate", category: "original" },
  { name: "swipe", desc: "Slides from the right", category: "original" },
  { name: "typewriter", desc: "Character reveal", category: "original" },
  { name: "bounce", desc: "Drop with a bounce", category: "original" },
  { name: "velvet", desc: "Soft skew drift", category: "modern" },
  { name: "curtain", desc: "Per-word upward clip", category: "modern" },
  { name: "morph", desc: "Squash-and-stretch spring", category: "modern" },
  { name: "ground", desc: "Rises from baseline", category: "modern" },
  { name: "cascade", desc: "Diagonal char waterfall", category: "modern" },
  { name: "spotlight", desc: "Letterspace compress-open", category: "modern" },
  { name: "ink", desc: "Gentle scale fade", category: "modern" },
  { name: "hinge", desc: "Rotates from left edge", category: "modern" },
  { name: "stretch", desc: "Horizontal rubber-band", category: "modern" },
  { name: "peel", desc: "Bottom-to-top clip", category: "modern" },
  { name: "ripple", desc: "Elastic scale outward", category: "modern" },
  { name: "cinch", desc: "Chars pinch then snap", category: "modern" },
  { name: "tiltrise", desc: "Rise while untilting", category: "modern" },
  { name: "unfurl", desc: "Expands from center", category: "new" },
  { name: "billboard", desc: "Y-axis rotation", category: "new" },
  { name: "tectonic", desc: "Alternating side slam", category: "new" },
  { name: "stratify", desc: "Z-depth blur flight", category: "new" },
  { name: "orbit", desc: "Dot grows + rotates", category: "new" },
  { name: "liquid", desc: "Cross-axis squash spring", category: "new" },
  { name: "noiseFade", desc: "Signal-lock opacity", category: "new" },
  { name: "slab", desc: "Print-press scaleX stamp", category: "new" },
  { name: "thread", desc: "Sine-wave Y offsets", category: "new" },
  { name: "glassReveal", desc: "Backdrop blur evaporates", category: "new" },
  { name: "wordPop", desc: "Per-word scale from zero", category: "new" },
  { name: "scanline", desc: "Horizontal slice expand", category: "new" },
  { name: "chromaShift", desc: "RGB channels collapse", category: "new" },
  { name: "wordFade", desc: "Per-word cross-dissolve", category: "new" },
] as const;

type AnimName = typeof ANIMATIONS[number]["name"];

const CATEGORY_STYLE = {
  original: { bg: "rgba(99,87,160,0.07)", border: "rgba(99,87,160,0.2)", text: "#6355a0", label: "original" },
  modern: { bg: "rgba(13,148,136,0.07)", border: "rgba(13,148,136,0.2)", text: "#0d9488", label: "modern" },
  new: { bg: "rgba(120,120,140,0.08)", border: "rgba(120,120,140,0.2)", text: "#8a8a9a", label: "new" },
};

export default function AnimationGrid() {
  const [active, setActive] = useState<AnimName | null>(null);
  const [keys, setKeys] = useState<Record<string, number>>({});

  const preview = useCallback((name: AnimName) => {
    setActive(name);
    setKeys((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Preview strip */}
      {active && (
        <div
          className="rounded-xl flex items-center justify-center py-10 px-6 relative overflow-hidden"
          style={{
            background: "var(--ink-surface)",
            border: "1px solid var(--ink-border)",
            minHeight: "130px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(30,20,10,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div key={`${active}-${keys[active]}`} className="relative">
            <Typography
              variant="Display"
              font="Bricolage Grotesque"
              animation={active}
              italic
              accentColor="var(--ink-accent)"
              color="var(--ink-text)"
            >
              inkvelle <em>moves</em>
            </Typography>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {ANIMATIONS.map(({ name, desc, category }) => {
          const s = CATEGORY_STYLE[category];
          const isActive = active === name;
          return (
            <button
              key={name}
              onClick={() => preview(name)}
              className="flex flex-col gap-1 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer"
              style={{
                background: isActive ? s.bg : "#ffffff",
                border: "1px solid",
                borderColor: isActive ? s.border : "var(--ink-border)",
                boxShadow: isActive ? "none" : "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--ink-surface)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              }}
            >
              <div className="flex items-center justify-between gap-1">
                <code
                  className="text-xs font-semibold"
                  style={{ color: isActive ? s.text : "var(--ink-accent)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {name}
                </code>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline"
                  style={{
                    background: s.bg,
                    color: s.text,
                    border: `1px solid ${s.border}`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {s.label}
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--ink-muted)", lineHeight: 1.4 }}>{desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
