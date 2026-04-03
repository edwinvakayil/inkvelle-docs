"use client";
import { useEffect, useRef } from "react";

const words = ["Build", "with", "intention"];
const accents = [false, false, true];

export default function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll<HTMLSpanElement>("[data-word]");
    if (!spans) return;
    spans.forEach((span, i) => {
      // Premium initial state: transparent, shifted down, slightly rotated, and heavily blurred
      span.style.opacity = "0";
      span.style.transform = "translateY(48px) rotate(4deg) scale(0.96)";
      span.style.transformOrigin = "left center";
      span.style.filter = "blur(12px)";

      // Setup the CSS transition config with pure CSS staggering
      const duration = "0.9s";
      const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
      const delay = `${0.05 + i * 0.1}s`;
      span.style.transition = `opacity ${duration} ${ease} ${delay}, transform ${duration} ${ease} ${delay}, filter ${duration} ${ease} ${delay}`;

      // Trigger the transition for all elements simultaneously after next paint
      requestAnimationFrame(() => {
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0) rotate(0deg) scale(1)";
          span.style.filter = "blur(0px)";
        }, 50);
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <style>{`
        @keyframes drawScribbleFill {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <h1
        className="font-extrabold leading-none tracking-tight"
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "clamp(3.5rem, 10vw, 8rem)",
          color: "var(--ink-text)",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.25em",
        }}
      >
        {words.map((word, i) => (
          <span
            key={word}
            data-word
            className="relative"
            style={{
              display: "inline-block",
              color: accents[i] ? "var(--ink-accent)" : "var(--ink-text)",
              fontStyle: accents[i] ? "italic" : "normal",
              fontFamily: accents[i]
                ? "'Instrument Serif', 'Georgia', serif"
                : "'Bricolage Grotesque', sans-serif",
            }}
          >
            {accents[i] && (
              <svg
                className="absolute bottom-[0.005em] left-[-2%] w-[104%] h-[0.16em] pointer-events-none opacity-90"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                style={{ overflow: "visible", color: "var(--ink-accent)" }}
              >
                <path
                  d="M 2 12 Q 25 2 45 14 T 75 8 T 98 12"
                  pathLength="100"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    animation: "drawScribbleFill 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards"
                  }}
                />
              </svg>
            )}
            <span className="relative z-10">{word}</span>
          </span>
        ))}
      </h1>
    </div>
  );
}
