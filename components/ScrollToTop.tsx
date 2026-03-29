"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        background: "#ffffff",
        border: "1px solid var(--ink-border2)",
        color: "var(--ink-accent)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.2s ease both",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = "var(--ink-surface)";
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = "#ffffff";
        el.style.transform = "none";
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
      }}
    >
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12V2M2 7l5-5 5 5" />
      </svg>
    </button>
  );
}
