"use client";
import { useState, useCallback } from "react";
import { Typography } from "inkvelle";

const ANIMATIONS = [
  { name: "rise",        desc: "Smooth upward fade-in"      },
  { name: "stagger",     desc: "Word-by-word entrance"       },
  { name: "clip",        desc: "Unmasked left to right"      },
  { name: "pop",         desc: "Spring scale-in"             },
  { name: "letters",     desc: "Letter-by-letter slide"      },
  { name: "blur",        desc: "Emerges from a blur"         },
  { name: "flip",        desc: "3D perspective rotate"       },
  { name: "swipe",       desc: "Slides from the right"       },
  { name: "typewriter",  desc: "Character reveal"            },
  { name: "bounce",      desc: "Drop with a bounce"          },
  { name: "velvet",      desc: "Soft skew drift"             },
  { name: "curtain",     desc: "Per-word upward clip"        },
  { name: "morph",       desc: "Squash-and-stretch spring"   },
  { name: "ground",      desc: "Rises from baseline"         },
  { name: "cascade",     desc: "Diagonal char waterfall"     },
  { name: "spotlight",   desc: "Letterspace compress-open"   },
  { name: "ink",         desc: "Gentle scale fade"           },
  { name: "hinge",       desc: "Rotates from left edge"      },
  { name: "stretch",     desc: "Horizontal rubber-band"      },
  { name: "peel",        desc: "Bottom-to-top clip"          },
  { name: "ripple",      desc: "Elastic scale outward"       },
  { name: "cinch",       desc: "Chars pinch then snap"       },
  { name: "tiltrise",    desc: "Rise while untilting"        },
  { name: "unfurl",      desc: "Expands from center"         },
  { name: "billboard",   desc: "Y-axis rotation"             },
  { name: "tectonic",    desc: "Alternating side slam"       },
  { name: "stratify",    desc: "Z-depth blur flight"         },
  { name: "orbit",       desc: "Dot grows + rotates"         },
  { name: "liquid",      desc: "Cross-axis squash spring"    },
  { name: "noiseFade",   desc: "Signal-lock opacity"         },
  { name: "slab",        desc: "Print-press scaleX stamp"    },
  { name: "thread",      desc: "Sine-wave Y offsets"         },
  { name: "glassReveal", desc: "Backdrop blur evaporates"    },
  { name: "wordPop",     desc: "Per-word scale from zero"    },
  { name: "scanline",    desc: "Horizontal slice expand"     },
  { name: "chromaShift", desc: "RGB channels collapse"       },
  { name: "wordFade",    desc: "Per-word cross-dissolve"     },
] as const;

type AnimName = typeof ANIMATIONS[number]["name"];



const mono    = { fontFamily: "'JetBrains Mono', monospace" } as const;

export default function AnimationGrid() {
  const [active, setActive] = useState<AnimName | null>(null);
  const [keys,   setKeys]   = useState<Record<string, number>>({});

  const preview = useCallback((name: AnimName) => {
    setActive(name);
    setKeys((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }));
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{ border: "1px solid var(--ink-border)", borderRadius: "16px" }}
    >
      {/* ── Preview strip ─────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center px-6 py-12 overflow-hidden"
        style={{
          background: "var(--ink-surface)",
          minHeight: "160px",
          borderBottom: "1px solid var(--ink-border)",
        }}
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

        {active ? (
          <div key={`${active}-${keys[active]}`} className="relative text-center">
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
        ) : (
          <div className="relative flex flex-col items-center gap-2 select-none">
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ color: "var(--ink-border2)" }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-[11px]" style={{ ...mono, color: "var(--ink-muted)" }}>
              click any animation to preview
            </span>
          </div>
        )}
      </div>

      {/* ── Active label strip ────────────────────────────────────────────── */}
      {active && (
        <div
          className="px-5 py-2.5 flex items-center gap-3"
          style={{ borderBottom: "1px solid var(--ink-border)", background: "#ffffff" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ ...mono, color: "var(--ink-muted)" }}>
            previewing
          </span>
          <code className="text-[11px] font-bold" style={{ ...mono, color: "var(--ink-accent)" }}>
            {active}
          </code>
          <button
            onClick={() => preview(active)}
            className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-opacity duration-150"
            style={{ ...mono, color: "var(--ink-muted)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-muted)"; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            replay
          </button>
        </div>
      )}

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        style={{ background: "#ffffff" }}
      >
        {ANIMATIONS.map(({ name, desc }, idx) => {
          const isActive = active === name;

          return (
            <button
              key={name}
              onClick={() => preview(name)}
              className="flex flex-col gap-1.5 p-4 text-left transition-colors duration-100 cursor-pointer"
              style={{
                background: isActive ? "var(--ink-surface)" : "#ffffff",
                borderRight: "1px solid var(--ink-border)",
                borderBottom: "1px solid var(--ink-border)",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--ink-surface)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              }}
            >
              {/* Name */}
              <code
                className="text-[11px] font-bold"
                style={{
                  ...mono,
                  color: isActive ? "var(--ink-text)" : "var(--ink-accent)",
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {name}
              </code>

              {/* Description */}
              <p
                className="text-[11px] leading-snug"
                style={{ color: "var(--ink-muted)", fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
