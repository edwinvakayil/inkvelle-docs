"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeroHeadline from "@/components/HeroHeadline";
import HeroPlayground from "@/components/HeroPlayground";
import VariantShowcase from "@/components/VariantShowcase";
import AnimationGrid from "@/components/AnimationGrid";
import MotionConfigDemo from "@/components/MotionConfigDemo";
import PropTable from "@/components/PropTable";
import CodeBlock from "@/components/CodeBlock";
import SectionHeader from "@/components/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";

const VERSION = "2.0.0";

// ─── Code snippets ────────────────────────────────────────────────────────────

const INSTALL_CODE = `npm install inkvelle
# or
yarn add inkvelle`;

const QUICKSTART_CODE = `import { Typography, preloadFonts } from "inkvelle";

// Pre-load fonts at app root to avoid FOUT
preloadFonts(["Bricolage Grotesque", "Instrument Serif"]);

export default function Hero() {
  return (
    <Typography
      variant="Display"
      font="Bricolage Grotesque"
      animation="rise"
      italic={true}
      accentColor="#8a8a9a"
    >
      Design with <em>intention</em>
    </Typography>
  );
}`;

const VARIANTS_CODE = `<Typography variant="Display" font="Fraunces">Hero heading</Typography>
<Typography variant="H1">Page title</Typography>
<Typography variant="H2">Section heading</Typography>
<Typography variant="H3">Sub-section heading</Typography>
<Typography variant="H4">Card heading</Typography>
<Typography variant="Overline" color="#6366f1">Category label</Typography>
<Typography variant="Body" font="Lora">Body copy for reading at length.</Typography>
<Typography variant="Label">Email address</Typography>
<Typography variant="Caption" color="#888">Fig. 1 — caption text</Typography>`;

const ANIMATION_CODE = `// Built-in entrance animations (Display / H1 only)
<Typography variant="Display" animation="rise">    Smooth rise      </Typography>
<Typography variant="Display" animation="stagger"> Word by word     </Typography>
<Typography variant="Display" animation="clip">    Left to right    </Typography>
<Typography variant="Display" animation="pop">     Spring pop       </Typography>
<Typography variant="Display" animation="letters"> Letter by letter </Typography>
<Typography variant="Display" animation="blur">    Focus in         </Typography>
<Typography variant="Display" animation="flip">    3D flip          </Typography>
<Typography variant="Display" animation="bounce">  Bounce drop      </Typography>
<Typography variant="Display" animation="velvet">  Velvet drift     </Typography>
<Typography variant="Display" animation="glassReveal"> Glass reveal  </Typography>`;

const MOTION_PRIORITY_CODE = `// Priority order: motionRef > motionConfig > animation > no animation
//
// motionRef    — you own the DOM, maximum control
// motionConfig — your keyframe, component handles splitting + stagger
// animation    — built-in preset (Display / H1 only)`;

const MOTION_CONFIG_CODE = `import { Typography, type MotionConfig } from "inkvelle";

// Whole-element custom keyframe — works on any variant
<Typography
  variant="H2"
  font="Syne"
  motionConfig={{
    keyframes: \`from { opacity: 0; transform: translateY(24px) skewX(6deg); }
                to   { opacity: 1; transform: none; }\`,
    duration: "0.8s",
    easing:   "cubic-bezier(0.16, 1, 0.3, 1)",
    delay:    "0.1s",
  }}
>
  Section heading
</Typography>

// Per-word stagger
<Typography
  variant="Display"
  font="Bricolage Grotesque"
  motionConfig={{
    keyframes:    \`from { opacity: 0; transform: translateX(-20px) rotate(-4deg); }
                  to   { opacity: 1; transform: none; }\`,
    duration:     "0.65s",
    split:        "words",
    staggerDelay: 0.09,
  }}
>
  Design with <em>intention</em>
</Typography>

// Per-character stagger
<Typography
  variant="Display"
  motionConfig={{
    keyframes:    \`from { opacity: 0; transform: scaleY(0) translateY(10px); }
                  to   { opacity: 1; transform: none; }\`,
    duration:     "0.5s",
    split:        "chars",
    staggerDelay: 0.035,
  }}
>
  Motion
</Typography>`;

const MOTION_REF_CODE = `// motionRef — direct DOM access. Takes priority over animation + motionConfig.

// Web Animations API
<Typography
  variant="Display"
  font="Bricolage Grotesque"
  motionRef={(el) => {
    if (!el) return;
    el.animate(
      [{ opacity: 0, transform: "translateY(32px)" }, { opacity: 1, transform: "none" }],
      { duration: 900, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "both" }
    );
  }}
>
  Full control
</Typography>

// GSAP
<Typography
  variant="H1"
  motionRef={(el) => {
    if (!el) return;
    gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" });
  }}
>
  GSAP powered
</Typography>`;

const ITALIC_CODE = `// italic OFF (default) — <em> inherits the heading font
<Typography variant="Display" font="Bricolage Grotesque">
  Build with <em>precision</em>
</Typography>

// italic ON — <em> renders in Instrument Serif italic
<Typography variant="Display" font="Bricolage Grotesque" italic>
  Build with <em>precision</em>
</Typography>

// Custom accent color
<Typography variant="H1" font="Syne" italic accentColor="#6366f1">
  Crafted with <em>care</em>
</Typography>`;

const TRUNCATE_CODE = `// Single line with ellipsis
<Typography variant="H2" truncate>
  This very long title will be cut off with an ellipsis
</Typography>

// Clamp to N lines
<Typography variant="Body" maxLines={3}>
  A long paragraph clamped to exactly three lines...
</Typography>`;

const PROVIDER_BASIC_CODE = `import { TypographyProvider, Typography } from "inkvelle";

export default function App() {
  return (
    <TypographyProvider
      theme={{
        font:        "Bricolage Grotesque",
        accentColor: "#6366f1",
        italic:      true,
        animation:   "rise",
        color:       "#1a1a1a",
      }}
    >
      <Typography variant="Display">
        Build with <em>intention</em>
      </Typography>
      <Typography variant="H1" animation="clip">
        Another hero heading
      </Typography>
      <Typography variant="Display" italic={false}>
        No serif accent here
      </Typography>
    </TypographyProvider>
  );
}`;

const PROVIDER_NESTING_CODE = `<TypographyProvider theme={{ font: "Bricolage Grotesque", color: "#1a1a1a" }}>
  <TypographyProvider theme={{ accentColor: "#c8b89a", color: "#f5f0e8" }}>
    <HeroSection />
  </TypographyProvider>
  <TypographyProvider theme={{ accentColor: "#6366f1", color: "#1a1a1a" }}>
    <ContentSection />
  </TypographyProvider>
</TypographyProvider>`;

const NEXTJS_LAYOUT_CODE = `// app/layout.tsx
import { TypographyProvider } from "inkvelle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TypographyProvider theme={{ font: "Bricolage Grotesque", accentColor: "#6366f1" }}>
          {children}
        </TypographyProvider>
      </body>
    </html>
  );
}`;

const NEXTJS_PAGES_CODE = `// pages/_app.tsx
import { TypographyProvider } from "inkvelle";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TypographyProvider theme={{ font: "Syne" }}>
      <Component {...pageProps} />
    </TypographyProvider>
  );
}`;

const NEXTJS_PAGE_CODE = `// app/page.tsx — Server Component
import { Typography } from "inkvelle";

export default function Page() {
  return (
    <Typography variant="Display" animation="rise">
      Renders on the server, <em>animates</em> on the client
    </Typography>
  );
}`;

const PRELOAD_CODE = `import { preloadFonts } from "inkvelle";

// Call once at the root of your app to avoid FOUT
preloadFonts(["Bricolage Grotesque", "Instrument Serif", "DM Sans"]);`;

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "playground", label: "Playground" },
  { id: "variants", label: "Variants" },
  { id: "animations", label: "Animations" },
  { id: "motion", label: "Custom motion" },
  { id: "italic", label: "Italic" },
  { id: "provider", label: "Provider" },
  { id: "ssr", label: "SSR" },
  { id: "props", label: "Props" },
] as const;

type NavId = typeof NAV_ITEMS[number]["id"];

// ─── Shared inline styles ─────────────────────────────────────────────────────

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;
const heading = { fontFamily: "'Bricolage Grotesque', sans-serif" } as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [navActive, setNavActive] = useState<NavId | "">("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const SLACK = 90;
    const playground = document.getElementById("playground");
    const hasReached = () => playground ? window.scrollY >= playground.offsetTop - SLACK : false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasReached()) { setNavActive(""); return; }
        entries.forEach((e) => { if (e.isIntersecting) setNavActive(e.target.id as NavId); });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    const onScroll = () => { if (!hasReached()) setNavActive(""); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>

      <header className="fixed top-0 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-4 md:px-6 pointer-events-none">

        {/* Floating Pill Container */}
        <div
          className="pointer-events-auto w-full max-w-[1100px] flex items-center justify-between px-3 py-2.5 sm:py-2 mt-4 sm:mt-0 rounded-2xl sm:rounded-[2rem] shadow-lg transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
            border: "1px solid rgba(120, 120, 140, 0.15)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Left Group: Logo + Desktop Nav */}
          <div className="flex items-center gap-8 xl:gap-12 pl-2">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2 group">
              <span
                className="text-sm font-extrabold tracking-tight transition-opacity duration-200 group-hover:opacity-70"
                style={{ ...mono, color: "var(--ink-text)" }}
              >
                inkvelle
              </span>
              <span
                className="hidden sm:inline-block text-xs font-medium"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--ink-muted)",
                }}
              >
                v{VERSION}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = navActive === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="px-2.5 py-1.5 text-[13px] font-bold transition-all duration-300 ease-out relative whitespace-nowrap"
                    style={{
                      color: isActive ? "var(--ink-accent)" : "var(--ink-sub)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--ink-text)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--ink-sub)";
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ background: "rgba(120,120,140,0.08)" }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://www.npmjs.com/package/inkvelle"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                background: "linear-gradient(180deg, #27272a 0%, #09090b 100%)",
                color: "#ffffff",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 12px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.8)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-1px) scale(1.02)";
                el.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.3), 0 8px 18px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "none";
                el.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 12px rgba(0,0,0,0.1)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 780 250" fill="currentColor" className="shrink-0 opacity-80">
                <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
              </svg>
              npm page
            </a>

            <button
              className="lg:hidden w-10 h-10 shrink-0 rounded-full transition-colors flex items-center justify-center relative"
              style={{
                color: "var(--ink-text)",
                background: mobileOpen ? "rgba(120,120,140,0.1)" : "transparent"
              }}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className="pointer-events-auto w-full sm:w-[360px] max-w-full overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top mt-2"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "scaleY(1)" : "scaleY(0.9)",
            pointerEvents: mobileOpen ? "auto" : "none",
            maxHeight: mobileOpen ? "600px" : "0px",
          }}
        >
          <div
            className="w-full rounded-[2rem] shadow-2xl p-5 flex flex-col gap-1"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              border: "1px solid rgba(120, 120, 140, 0.15)",
              boxShadow: "0 20px 60px -10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = navActive === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3.5 rounded-[1rem] text-sm font-bold transition-all flex items-center justify-between"
                  style={{
                    color: isActive ? "var(--ink-accent)" : "var(--ink-text)",
                    background: isActive ? "rgba(120,120,140,0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(120,120,140,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {label}
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </a>
              );
            })}

            <hr className="my-3 border-none h-px" style={{ background: "rgba(120,120,140,0.15)" }} />

            <a
              href="https://www.npmjs.com/package/inkvelle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-[1rem] text-sm font-bold transition-all flex items-center justify-between"
              style={{
                background: "linear-gradient(180deg, #27272a 0%, #09090b 100%)",
                color: "#ffffff",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 780 250" fill="currentColor" className="opacity-80">
                  <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
                </svg>
                View on NPM
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main style={{ paddingTop: "56px" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <section className="pt-20 pb-20 sm:pt-28 sm:pb-28">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-7 text-xs font-semibold"
              style={{
                ...mono,
                color: "var(--ink-muted)",
                animation: "fadeIn 0.5s ease both",
              }}
            >
              <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--ink-accent)" }}></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--ink-accent)" }}></span>
              </span>
              Release · v{VERSION}
            </div>

            {/* Headline */}
            <div style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both" }}>
              <HeroHeadline />
            </div>

            {/* Sub */}
            <p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{ color: "var(--ink-sub)", animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
            >
              A zero-dependency React + TypeScript typography component with automatic Google Fonts,{" "}
              <strong style={{ color: "var(--ink-text)", fontWeight: 600 }}>30+ hero animations</strong>,
              custom{" "}
              <code style={{ ...mono, color: "var(--ink-accent)", fontSize: "0.85em", background: "rgba(120,120,140,0.09)", padding: "0.1em 0.35em", borderRadius: "4px", border: "1px solid rgba(120,120,140,0.18)" }}>motionConfig</code>
              , and a direct DOM ref for GSAP or Framer Motion.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-3 mt-8"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s both" }}
            >
              <a
                href="#playground"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity duration-200"
                style={{ ...heading, background: "var(--ink-text)", color: "#ffffff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                Try the playground
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal">
                  <path d="M12 19h8" />
                  <path d="m4 17 6-6-6-6" />
                </svg>
              </a>
              <a
                href="#install"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ ...heading, color: "var(--ink-sub)", border: "1px solid var(--ink-border)", background: "transparent" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(120,120,140,0.4)"; el.style.color = "var(--ink-text)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--ink-border)"; el.style.color = "var(--ink-sub)"; }}
              >
                View installation
              </a>
            </div>

            {/* Feature pills */}
            <div
              className="flex flex-nowrap items-center gap-2.5 mt-12 overflow-x-auto pb-4 -mb-4 scrollbar-hide"
              style={{ animation: "fadeUp 0.8s ease 0.45s both" }}
            >
              {[
                "30+ animations", "Google Fonts auto-inject", "Custom motionConfig",
                "motionRef (GSAP / Framer)", "Italic accent", "SSR-safe",
                "TypeScript", "Zero dependencies",
              ].map((f) => (
                <div
                  key={f}
                  className="group shrink-0 relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 cursor-default select-none overflow-hidden"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "rgba(255, 255, 255, 0.4)",
                    color: "var(--ink-sub)",
                    border: "1px solid rgba(120, 120, 140, 0.12)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.8)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(120, 120, 140, 0.3)";
                    el.style.color = "var(--ink-text)";
                    el.style.background = "rgba(255, 255, 255, 0.8)";
                    el.style.transform = "translateY(-1px)";
                    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(120, 120, 140, 0.12)";
                    el.style.color = "var(--ink-sub)";
                    el.style.background = "rgba(255, 255, 255, 0.4)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.8)";
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-40 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"
                    style={{ background: "var(--ink-accent)" }}
                  />
                  {f}
                </div>
              ))}
            </div>
          </section>

          {/* ── Divider ─────────────────────────────────────────────────────── */}
          <hr style={{ border: "none", borderTop: "1px solid var(--ink-border)", marginBottom: "5rem" }} />

          {/* ── Installation ────────────────────────────────────────────────── */}
          <section className="mb-24" id="install">
            <SectionHeader title="Installation" />
            <CodeBlock code={INSTALL_CODE} language="bash" />

            <h3 className="text-xl font-bold mt-10 mb-4" style={{ ...heading, color: "var(--ink-text)" }}>
              Quick start
            </h3>
            <CodeBlock code={QUICKSTART_CODE} language="tsx" />

            <h3 className="text-xl font-bold mt-10 mb-3" style={{ ...heading, color: "var(--ink-text)" }}>
              Pre-loading fonts
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--ink-sub)" }}>
              Call <code style={{ ...mono, color: "var(--ink-accent)", fontSize: "0.85em", background: "rgba(120,120,140,0.09)", padding: "0.1em 0.35em", borderRadius: "4px", border: "1px solid rgba(120,120,140,0.18)" }}>preloadFonts</code> once at your app root to avoid FOUT (flash of unstyled text).
            </p>
            <CodeBlock code={PRELOAD_CODE} language="tsx" />
          </section>

          {/* ── Playground ──────────────────────────────────────────────────── */}
          <section className="mb-24" id="playground">
            <SectionHeader
              title="Playground"
              desc="Pick a font, choose an animation, toggle italic accent — all live. The last word becomes the <em> accent."
            />
            <HeroPlayground />
          </section>

          {/* ── Variants ────────────────────────────────────────────────────── */}
          <section className="mb-24" id="variants">
            <SectionHeader
              title="Variants"
              desc="12 variants mapped to their semantic HTML tag and type scale. Each sets the correct tag, weight, size, and line-height automatically."
            />
            <VariantShowcase />
            <div className="mt-6">
              <CodeBlock code={VARIANTS_CODE} language="tsx" />
            </div>
          </section>

          {/* ── Animations ──────────────────────────────────────────────────── */}
          <section className="mb-24" id="animations">
            <SectionHeader
              title="Hero animations"
              desc="The animation prop applies to Display and H1 only. 43 CSS keyframe animations — GPU-composited, no layout thrashing, 60fps safe. Click any card to preview."
            />
            <AnimationGrid />
            <div className="mt-8">
              <CodeBlock code={ANIMATION_CODE} language="tsx" />
            </div>
          </section>

          {/* ── Custom Motion ────────────────────────────────────────────────── */}
          <section className="mb-24" id="motion">
            <SectionHeader
              title="Custom motion"
              desc="Three escape hatches when built-in presets don't fit. Priority: motionRef > motionConfig > animation."
            />

            <CodeBlock code={MOTION_PRIORITY_CODE} language="tsx" />

            <h3 className="text-xl font-bold mt-12 mb-3" style={{ ...heading, color: "var(--ink-text)" }}>
              motionConfig — interactive builder
            </h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--ink-sub)" }}>
              Write your own keyframes body and choose whether to animate the whole element, split by words, or split by characters.
              Works on <strong style={{ color: "var(--ink-text)" }}>any variant</strong>, not just heroes.
            </p>
            <MotionConfigDemo />
            <div className="mt-8">
              <CodeBlock code={MOTION_CONFIG_CODE} language="tsx" />
            </div>

            <h3 className="text-xl font-bold mt-12 mb-3" style={{ ...heading, color: "var(--ink-text)" }}>
              motionRef — direct DOM access
            </h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--ink-sub)" }}>
              A ref callback that gives you the raw <code style={{ ...mono, color: "var(--ink-accent)", fontSize: "0.85em" }}>HTMLElement</code> after mount.
              Use it with GSAP, Framer Motion, or the Web Animations API.
            </p>
            <CodeBlock code={MOTION_REF_CODE} language="tsx" />
          </section>

          {/* ── Italic ───────────────────────────────────────────────────────── */}
          <section className="mb-24" id="italic">
            <SectionHeader
              title="Italic accent"
              desc="Wrap any word in <em> inside Display or H1. The italic prop switches between Instrument Serif and the heading font. Off by default."
            />

            {/* Live comparison */}
            <div
              className="rounded-2xl overflow-hidden mb-8 grid sm:grid-cols-2"
              style={{ border: "1px solid var(--ink-border)" }}
            >
              <div
                className="p-8 flex flex-col gap-3"
                style={{ background: "var(--ink-surface)", borderRight: "1px solid var(--ink-border)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{ ...mono, background: "rgba(0,0,0,0.05)", color: "var(--ink-muted)", border: "1px solid var(--ink-border)" }}
                  >
                    italic={"{false}"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--ink-muted)" }}>default</span>
                </div>
                <div style={{ ...heading, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--ink-text)", fontWeight: 800, lineHeight: 1.1 }}>
                  Build with <em style={{ fontStyle: "normal" }}>precision</em>
                </div>
                <p className="text-xs" style={{ ...mono, color: "var(--ink-muted)" }}>
                  &lt;em&gt; inherits heading font
                </p>
              </div>

              <div className="p-8 flex flex-col gap-3" style={{ background: "#ffffff" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{ ...mono, background: "rgba(120,120,140,0.09)", color: "var(--ink-accent)", border: "1px solid rgba(120,120,140,0.22)" }}
                  >
                    italic={"{true}"}
                  </span>
                </div>
                <div style={{ ...heading, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--ink-text)", fontWeight: 800, lineHeight: 1.1 }}>
                  Build with{" "}
                  <em style={{ fontStyle: "italic", fontFamily: "'Instrument Serif', Georgia, serif", color: "var(--ink-accent)", fontWeight: 400 }}>
                    precision
                  </em>
                </div>
                <p className="text-xs" style={{ ...mono, color: "var(--ink-muted)" }}>
                  &lt;em&gt; → Instrument Serif + accentColor
                </p>
              </div>
            </div>
            <CodeBlock code={ITALIC_CODE} language="tsx" />
          </section>

          {/* ── Truncation ───────────────────────────────────────────────────── */}
          <section className="mb-24" id="truncate">
            <SectionHeader
              title="Truncation"
              desc="Clip single lines with truncate or multi-line with maxLines. Both use CSS — no JavaScript required."
            />

            <div
              className="rounded-2xl overflow-hidden mb-8"
              style={{ border: "1px solid var(--ink-border)", background: "#ffffff" }}
            >
              <div className="p-6 flex flex-col gap-2" style={{ borderBottom: "1px solid var(--ink-border)" }}>
                <code className="text-xs" style={{ ...mono, color: "var(--ink-muted)" }}>variant=&quot;H2&quot; truncate</code>
                <div
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold"
                  style={{ ...heading, color: "var(--ink-text)", maxWidth: "420px" }}
                >
                  This very long title will be cut off with an ellipsis
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <code className="text-xs" style={{ ...mono, color: "var(--ink-muted)" }}>variant=&quot;Body&quot; maxLines={"{3}"}</code>
                <div
                  style={{
                    color: "var(--ink-sub)", fontSize: "0.95rem", lineHeight: 1.65,
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const, overflow: "hidden", maxWidth: "560px",
                  }}
                >
                  A long paragraph clamped to exactly three lines. No matter how much content is
                  inside, it stops here — cleanly, with an ellipsis. This is the overflow, which
                  you will never see. The component uses CSS line-clamp under the hood, so there
                  is no JavaScript measuring involved.
                </div>
              </div>
            </div>
            <CodeBlock code={TRUNCATE_CODE} language="tsx" />
          </section>

          {/* ── TypographyProvider ───────────────────────────────────────────── */}
          <section className="mb-24" id="provider">
            <SectionHeader
              title="TypographyProvider"
              desc="Wrap your app or any section to set font, accentColor, italic, animation, and color once. Any explicit prop still wins — the provider is the fallback."
            />

            <h3 className="text-lg font-bold mb-4" style={{ ...heading, color: "var(--ink-text)" }}>Basic usage</h3>
            <CodeBlock code={PROVIDER_BASIC_CODE} language="tsx" />

            <h3 className="text-lg font-bold mt-10 mb-3" style={{ ...heading, color: "var(--ink-text)" }}>Nested providers</h3>
            <p className="text-sm mb-4" style={{ color: "var(--ink-sub)" }}>
              The nearest provider wins — useful for section-level theming without prop drilling.
            </p>
            <CodeBlock code={PROVIDER_NESTING_CODE} language="tsx" />

            {/* Priority table */}
            <h3 className="text-lg font-bold mt-10 mb-4" style={{ ...heading, color: "var(--ink-text)" }}>Priority order</h3>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--ink-border)" }}>
              {[
                { rank: "1", label: "Explicit prop", desc: "Highest priority. Always wins.", color: "#5a6a9a" },
                { rank: "2", label: "TypographyProvider theme", desc: "Fallback for all Typography inside the provider.", color: "#6355a0" },
                { rank: "3", label: "Built-in default", desc: "Lowest priority — the component's own sensible defaults.", color: "var(--ink-muted)" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-5 py-4"
                  style={{
                    background: i % 2 === 0 ? "#ffffff" : "var(--ink-surface)",
                    borderBottom: i < 2 ? "1px solid var(--ink-border)" : "none",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ ...mono, background: `${row.color}14`, color: row.color, border: `1px solid ${row.color}33` }}
                  >
                    {row.rank}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <code className="text-sm font-semibold" style={{ ...mono, color: row.color }}>{row.label}</code>
                    <span className="text-sm" style={{ color: "var(--ink-sub)" }}>{row.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SSR & Next.js ────────────────────────────────────────────────── */}
          <section className="mb-24" id="ssr">
            <SectionHeader
              title="SSR & Next.js"
              desc="inkvelle is fully SSR-safe. All DOM work happens inside useInsertionEffect — never called on the server. Text renders in server HTML; animations play after hydration."
            />

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold" style={{ ...heading, color: "var(--ink-text)" }}>App Router</h3>
                <CodeBlock code={NEXTJS_LAYOUT_CODE} language="tsx" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold" style={{ ...heading, color: "var(--ink-text)" }}>Pages Router</h3>
                <CodeBlock code={NEXTJS_PAGES_CODE} language="tsx" />
              </div>
            </div>
            <CodeBlock code={NEXTJS_PAGE_CODE} language="tsx" />

            {/* SSR table */}
            <div className="mt-8 rounded-xl overflow-hidden" style={{ border: "1px solid var(--ink-border)" }}>
              <div
                className="grid px-5 py-3 text-xs uppercase tracking-widest font-medium"
                style={{ gridTemplateColumns: "1fr 1fr 1fr", background: "var(--ink-surface2)", color: "var(--ink-muted)", borderBottom: "1px solid var(--ink-border)", ...mono }}
              >
                <span>Prop</span><span>Server</span><span>Client</span>
              </div>
              {[
                { prop: "variant, font, color, align, truncate, maxLines", server: "Inline styles in HTML", client: "Hydrated" },
                { prop: "animation", server: "Class name in HTML", client: "Keyframe injected, plays" },
                { prop: "motionConfig", server: "Raw HTML, split spans present", client: "Animation applied" },
                { prop: "motionRef", server: "Plain HTML", client: "Callback fires" },
                { prop: "italic / accentColor", server: "Inline styles on <em>", client: "No flash on hydration" },
              ].map((row, i, arr) => (
                <div
                  key={i}
                  className="grid px-5 py-3 items-start gap-4 text-xs"
                  style={{ gridTemplateColumns: "1fr 1fr 1fr", background: i % 2 === 0 ? "#ffffff" : "var(--ink-surface)", borderBottom: i < arr.length - 1 ? "1px solid var(--ink-border)" : "none", ...mono }}
                >
                  <code style={{ color: "var(--ink-accent)" }}>{row.prop}</code>
                  <span style={{ color: "var(--ink-sub)" }}>{row.server}</span>
                  <span style={{ color: "var(--ink-sub)" }}>{row.client}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Props ────────────────────────────────────────────────────────── */}
          <section className="mb-24" id="props">
            <SectionHeader title="Props" desc="Full prop reference for the Typography component." />
            <PropTable />
          </section>

          {/* ── Font pairings ─────────────────────────────────────────────────── */}
          <section className="mb-28">
            <SectionHeader
              title="Recommended font pairings"
              desc="Opinionated picks for hero headings. Pass the name directly to the font prop — the Google Font link is injected automatically."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { font: "Bricolage Grotesque", style: "Bold sans", use: "Startups, SaaS, modern brand", color: "#5a6a9a" },
                { font: "Syne", style: "Geometric", use: "Creative, portfolio, agency", color: "#6355a0" },
                { font: "Fraunces", style: "Serif", use: "Editorial, luxury, fashion", color: "#0d9488" },
                { font: "Bebas Neue", style: "Condensed", use: "Sports, bold campaigns", color: "#e11d48" },
                { font: "Playfair Display", style: "Serif", use: "Journalism, books, culture", color: "#8a8a9a" },
                { font: "Outfit", style: "Clean sans", use: "Apps, dashboards, fintech", color: "#6366f1" },
              ].map(({ font, style, use, color }) => (
                <div
                  key={font}
                  className="p-5 rounded-xl border cursor-default transition-all duration-200"
                  style={{ background: "#ffffff", borderColor: "var(--ink-border)", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = `${color}44`;
                    el.style.boxShadow = `0 4px 16px ${color}18`;
                    el.style.background = `${color}05`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "var(--ink-border)";
                    el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
                    el.style.background = "#ffffff";
                  }}
                >
                  <div className="text-3xl font-bold mb-3" style={{ fontFamily: `'${font}', sans-serif`, color, lineHeight: 1 }}>
                    Aa
                  </div>
                  <code className="text-xs font-semibold block mb-2" style={{ ...mono, color: "var(--ink-text)" }}>
                    {font}
                  </code>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ ...mono, background: `${color}12`, color, border: `1px solid ${color}2a` }}
                  >
                    {style}
                  </span>
                  <p className="text-xs mt-2.5" style={{ color: "var(--ink-muted)" }}>{use}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden pt-32 pb-8 mt-32" style={{ background: "var(--ink-surface)", borderTop: "1px solid var(--ink-border)" }}>

        {/* Giant background text */}
        <div
          className="absolute inset-x-0 bottom-[-5%] pointer-events-none flex justify-start overflow-hidden opacity-[0.03]"
          style={{ zIndex: 0, paddingLeft: "2vw" }}
        >
          <span
            style={{
              fontSize: "28vw",
              fontWeight: 900,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              lineHeight: 0.75,
              whiteSpace: "nowrap",
              color: "var(--ink-text)"
            }}
          >
            inkvelle
          </span>
        </div>

        {/* Big CTA */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 mb-24 sm:mb-32">
          <div className="max-w-3xl">
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6" style={{ ...heading, color: "var(--ink-text)" }}>
              Ready to craft?
            </h2>
            <p className="text-lg sm:text-xl mb-10" style={{ color: "var(--ink-sub)" }}>
              Install Inkvelle today and bring premium typography animations to your React apps in seconds.
            </p>
            <a
              href="https://www.npmjs.com/package/inkvelle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 transform hover:-translate-y-1"
              style={{ ...heading, background: "var(--ink-text)", color: "#ffffff", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 20px 40px -10px rgba(0,0,0,0.4)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 10px 40px -10px rgba(0,0,0,0.3)"; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal">
                <path d="M12 19h8" />
                <path d="m4 17 6-6-6-6" />
              </svg>
              npm install inkvelle
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-6 mb-16">
            <div className="col-span-2 md:col-span-1 flex flex-col items-start pr-8">
              <span className="text-2xl font-extrabold tracking-tight mb-4" style={{ ...mono, color: "var(--ink-text)" }}>inkvelle.</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-sub)" }}>
                A lightweight animation and typography system for React and Next.js.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest mb-1" style={{ ...mono, color: "var(--ink-text)" }}>Playground</span>
              {["Animations", "Variants", "Custom motion", "Italic"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--ink-sub)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-sub)"; }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest mb-1" style={{ ...mono, color: "var(--ink-text)" }}>Documentation</span>
              {["Installation", "Provider", "SSR", "Props"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--ink-sub)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-sub)"; }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest mb-1" style={{ ...mono, color: "var(--ink-text)" }}>Resources</span>
              <a href="https://www.npmjs.com/package/inkvelle" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors duration-200" style={{ color: "var(--ink-sub)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-accent)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-sub)"; }}>NPM</a>
              <a href="https://github.com/edwinvakayil/inkvelle" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors duration-200" style={{ color: "var(--ink-sub)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-accent)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-sub)"; }}>GitHub</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--ink-border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs font-medium" style={{ ...mono, color: "var(--ink-muted)" }}>
                © {new Date().getFullYear()} inkvelle. Built by{" "}
                <a
                  href="https://www.edwinvakayil.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--ink-accent)]"
                  style={{ color: "var(--ink-sub)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  Edwin Vakayil
                </a>.
              </span>
              <span className="hidden sm:inline-block text-xs" style={{ color: "var(--ink-border2)" }}>|</span>
              <span className="text-xs" style={{ ...mono, color: "var(--ink-muted)" }}>v{VERSION}</span>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
