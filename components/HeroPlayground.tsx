"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Typography } from "inkvelle";

const FONTS = [
  "Inter", "Fraunces", "Playfair Display", "Outfit", "DM Sans", "Lora",
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

function PillButton({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      style={{
        ...mono,
        padding: "3px 10px",
        borderRadius: "4px",
        fontSize: "11px",
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

type TypographyVariant = "Display" | "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "Subheading" | "Overline" | "Body" | "Label" | "Caption";

// ─── Main component ────────────────────────────────────────────────────────────

export default function HeroPlayground() {
  const [font, setFont] = useState("Fraunces");
  const [animation, setAnimation] = useState<HeroAnimation>("cinch");
  const [italic, setItalic] = useState(true);
  const [accentColor, setAccent] = useState("#e11d48");
  const [variant, setVariant] = useState<TypographyVariant>("Display");
  const [text, setText] = useState("Inkvelle meets motion");
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

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px", maxWidth: "860px", margin: "0 auto" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", letterSpacing: "-0.01em", margin: 0 }}>
            Inkvelle
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <a
              href="https://www.npmjs.com/package/inkvelle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Inkvelle on NPM"
              style={{ ...mono, fontSize: "10px", color: "#9ca3af", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#374151"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; }}
            >
              v2.0.0
            </a>
            <span style={{ color: "#d1d5db", fontSize: "12px" }}>/</span>
            <a
              href="https://github.com/edwinvakayil/inkvelle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Inkvelle on GitHub"
              style={{ color: "#9ca3af", textDecoration: "none", display: "flex", alignItems: "center" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.71356 13.6687C6.71354 13.5709 6.69203 13.4744 6.65053 13.3858C6.60903 13.2973 6.54857 13.219 6.47343 13.1564C6.3983 13.0939 6.31032 13.0486 6.21574 13.0238C6.12115 12.9991 6.02228 12.9954 5.92613 13.0131C5.0534 13.1733 3.95152 13.1974 3.65855 12.3744C3.40308 11.7371 2.97993 11.1808 2.43394 10.7644C2.39498 10.7432 2.35785 10.7189 2.32294 10.6915C2.27515 10.5655 2.19028 10.4569 2.07951 10.38C1.96875 10.3032 1.83729 10.2618 1.70249 10.2612H1.69924C1.52297 10.2611 1.35386 10.3309 1.22891 10.4552C1.10397 10.5796 1.03337 10.7483 1.03257 10.9246C1.02996 11.4682 1.57324 11.8165 1.79364 11.9344C2.05353 12.1955 2.26241 12.5028 2.40952 12.8406C2.65236 13.5229 3.35809 14.5581 5.38674 14.4246C5.3874 14.448 5.38804 14.4702 5.38836 14.4904L5.39129 14.6687C5.39129 14.8456 5.46153 15.0151 5.58655 15.1402C5.71158 15.2652 5.88115 15.3354 6.05796 15.3354C6.23477 15.3354 6.40434 15.2652 6.52936 15.1402C6.65439 15.0151 6.72463 14.8456 6.72463 14.6687L6.72137 14.4565C6.71812 14.3302 6.71356 14.1472 6.71356 13.6687ZM13.8249 3.58471C13.8461 3.50137 13.8669 3.40893 13.8851 3.30476C13.9929 2.56182 13.8989 1.80355 13.613 1.10943C13.5769 1.01894 13.5215 0.937432 13.4505 0.870629C13.3796 0.803826 13.295 0.753341 13.2025 0.722714C12.9652 0.642634 12.0889 0.48508 10.4131 1.55605C9.02014 1.22824 7.57009 1.22824 6.17711 1.55605C4.50816 0.500767 3.63641 0.643967 3.40138 0.719487C3.30663 0.748874 3.21965 0.799091 3.14682 0.866459C3.07399 0.933826 3.01716 1.01664 2.98048 1.10882C2.68869 1.81627 2.59571 2.59 2.7116 3.34645C2.72789 3.43173 2.74546 3.51051 2.76369 3.58277C2.21141 4.3184 1.91723 5.21568 1.92678 6.13551C1.92498 6.34073 1.93443 6.5459 1.9551 6.75009C2.17777 9.81845 4.17776 10.7397 5.5713 11.0561C5.54234 11.1394 5.51597 11.2286 5.49253 11.323C5.45076 11.4945 5.47871 11.6756 5.57026 11.8266C5.66182 11.9775 5.80949 12.086 5.98091 12.1283C6.15233 12.1705 6.3335 12.143 6.4847 12.0519C6.63589 11.9607 6.74477 11.8133 6.78745 11.642C6.82987 11.4199 6.9386 11.2158 7.09931 11.0567C7.19648 10.9717 7.26683 10.8602 7.30181 10.7359C7.33679 10.6115 7.33488 10.4797 7.29632 10.3565C7.25777 10.2332 7.18422 10.1238 7.08463 10.0416C6.98504 9.95937 6.8637 9.90785 6.73537 9.89332C4.43264 9.6303 3.43296 8.69215 3.28257 6.6277C3.26591 6.46419 3.25841 6.29987 3.26011 6.13551C3.24942 5.47995 3.466 4.8409 3.87306 4.32692C3.91397 4.27334 3.95753 4.22184 4.0036 4.17262C4.08522 4.08129 4.1401 3.96923 4.16221 3.84876C4.18432 3.72828 4.1728 3.60404 4.12893 3.48968C4.08396 3.36937 4.04933 3.24543 4.02542 3.11923C3.97111 2.76038 3.98892 2.39429 4.07782 2.04241C4.65724 2.20606 5.20256 2.47243 5.68782 2.82886C5.76806 2.88231 5.85887 2.91788 5.95407 2.93316C6.04927 2.94843 6.14664 2.94306 6.23958 2.91741C7.58698 2.55174 9.00752 2.55197 10.3548 2.91807C10.4483 2.9437 10.5461 2.94877 10.6417 2.93292C10.7373 2.91707 10.8283 2.88069 10.9085 2.82628C11.3915 2.46837 11.9345 2.19961 12.512 2.03266C12.6005 2.3761 12.6203 2.73363 12.5703 3.08474C12.5462 3.2231 12.5084 3.35874 12.4577 3.48969C12.4138 3.60406 12.4023 3.72829 12.4244 3.84877C12.4465 3.96925 12.5014 4.0813 12.583 4.17263C12.6344 4.23057 12.6859 4.29307 12.7321 4.35167C13.1363 4.85695 13.3492 5.48865 13.3334 6.13551C13.3346 6.30858 13.3262 6.48159 13.3083 6.65373C13.1615 8.69084 12.1579 9.62965 9.84442 9.89331C9.71606 9.90793 9.59471 9.95953 9.49513 10.0418C9.39555 10.1241 9.32203 10.2336 9.28351 10.3569C9.24499 10.4802 9.24313 10.6121 9.27816 10.7365C9.31319 10.8608 9.38359 10.9723 9.48081 11.0574C9.64657 11.2207 9.75553 11.433 9.79169 11.6628C9.83674 11.8413 9.85743 12.0251 9.85321 12.2091V13.7651C9.84669 14.1967 9.84669 14.5203 9.84669 14.6687C9.84669 14.8455 9.91692 15.0151 10.0419 15.1401C10.167 15.2651 10.3365 15.3354 10.5134 15.3354C10.6902 15.3354 10.8597 15.2651 10.9848 15.1401C11.1098 15.0151 11.18 14.8455 11.18 14.6687C11.18 14.5242 11.18 14.2071 11.1865 13.7755V12.2091C11.1919 11.9143 11.1572 11.6202 11.0833 11.3347C11.0622 11.241 11.0364 11.1485 11.0059 11.0574C12.02 10.8889 12.9415 10.366 13.6063 9.5818C14.271 8.79757 14.636 7.8029 14.6361 6.77483C14.658 6.56245 14.6683 6.34902 14.6667 6.13551C14.6815 5.21469 14.3849 4.31586 13.8249 3.58472L13.8249 3.58471Z" />
              </svg>
            </a>
          </div>
        </div>
        <p style={{ ...mono, fontSize: "12px", color: "#9ca3af", margin: 0 }}>
          A minimalist React typography library for high-end digital interfaces.
        </p>
      </header>

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
              variant={variant}
              font={font}
              animation={animation}
              italic={italic}
              accentColor={accentColor}
              color="#111827"
            >
              {leadingWords ? `${leadingWords} ` : ""}{italic ? <em>{lastWord}</em> : lastWord}
            </Typography>
          )}
        </div>
      </div>

      {/* ── Controls Card ──────────────────────────────────────────────────────── */}
      <section aria-label="Typography controls" style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        marginBottom: "40px",
      }}>
        {/* Row 0: Text Input + Replay */}
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6", display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            aria-label="Preview text"
            style={{
              ...mono,
              flex: 1,
              fontSize: "11px",
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
            aria-label="Replay animation"
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
              fontSize: "11px",
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

        {/* Row 1: Font */}
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6" }}>
          <p style={{ ...mono, fontSize: "10px", color: "#6b7280", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Font</p>
          <div role="group" aria-label="Font selection" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {FONTS.map((f) => (
              <PillButton key={f} active={font === f} onClick={() => { setFont(f); replay(); }} ariaLabel={`Set font to ${f}`}>
                {f.split(" ")[0]}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Row 2: Animation */}
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6" }}>
          <p style={{ ...mono, fontSize: "10px", color: "#6b7280", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Animation</p>
          <div role="group" aria-label="Animation selection" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {ANIMATIONS.map((a) => (
              <PillButton key={a} active={animation === a} onClick={() => { setAnimation(a); replay(); }} ariaLabel={`Set animation to ${a}`}>
                {a}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Row 3: Variant */}
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6" }}>
          <p style={{ ...mono, fontSize: "10px", color: "#6b7280", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Variant</p>
          <div role="group" aria-label="Variant selection" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {(["Display", "H1", "H2", "H3", "H4", "H5", "H6", "Subheading", "Overline", "Body", "Label", "Caption"] as TypographyVariant[]).map((v) => (
              <PillButton key={v} active={variant === v} onClick={() => { setVariant(v); replay(); }} ariaLabel={`Set variant to ${v}`}>
                {v}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Row 3: Accent + Italic */}
        <div style={{ padding: "24px", display: "flex", flexWrap: "wrap", gap: "25px" }}>
          <div>
            <p style={{ ...mono, fontSize: "10px", color: "#6b7280", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Accent</p>
            <div role="group" aria-label="Accent color selection" style={{ display: "flex", gap: "16px" }}>
              {ACCENT_COLORS.map((c) => (
                <div key={c.value} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => { setAccent(c.value); replay(); }}
                    title={c.label}
                    aria-label={`Set accent color to ${c.label}`}
                    aria-pressed={accentColor === c.value}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: c.value,
                      border: "none",
                      cursor: "pointer",
                      outline: accentColor === c.value ? `2px solid ${c.value}` : "2px solid transparent",
                      outlineOffset: "2px",
                      opacity: accentColor === c.value ? 1 : 0.4,
                      transform: accentColor === c.value ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.15s ease",
                    }}
                  />
                  <span style={{ ...mono, fontSize: "10px", color: "#9ca3af", textTransform: "lowercase" }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ ...mono, fontSize: "10px", color: "#6b7280", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Italic</p>
            <div role="group" aria-label="Italic selection" style={{ display: "flex", gap: "8px" }}>
              <PillButton active={italic === true} onClick={() => { setItalic(true); replay(); }} ariaLabel="Enable italics">yes</PillButton>
              <PillButton active={italic === false} onClick={() => { setItalic(false); replay(); }} ariaLabel="Disable italics">no</PillButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Installation ────────────────────────────────────────────────────── */}
      <section aria-labelledby="installation-title" style={{ marginBottom: "32px" }}>
        <h2 id="installation-title" style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: "0 0 14px 0" }}>
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
          <span style={{ ...mono, fontSize: "13px", color: "#d1d5db" }} aria-hidden="true">$</span>
          <span style={{ ...mono, fontSize: "13px", color: "#374151" }}>npm install inkvelle</span>
        </div>
      </section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="usage-title" style={{ marginBottom: "48px" }}>
        <h2 id="usage-title" style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: "0 0 14px 0" }}>
          Usage
        </h2>
        <div style={{
          background: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "8px",
          padding: "16px 20px",
        }}>
          {/* Live code output */}
          <div style={{ ...mono, fontSize: "11px", lineHeight: "1.9", color: "#6b7280" }}>
            <div style={{ color: "#9ca3af", marginBottom: "8px" }}>
              import {"{ Typography }"} from &quot;inkvelle&quot;;
            </div>
            <div>
              <span style={{ color: "#6b7280" }}>{"<"}</span>
              <span style={{ color: "#374151" }}>Typography</span>
              {" "}
              <span style={{ color: "#9ca3af" }}>variant</span>
              <span style={{ color: "#d1d5db" }}>{"="}</span>
              <span style={{ color: "#6b7280" }}>&quot;{variant}&quot;</span>
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
              <span style={{ color: "#111827" }}>
                {"  "}{leadingWords ? `${leadingWords} ` : ""}{italic ? `<em>${lastWord}</em>` : lastWord}
              </span>
              <br />
              <span style={{ color: "#6b7280" }}>{"</"}</span>
              <span style={{ color: "#374151" }}>Typography</span>
              <span style={{ color: "#6b7280" }}>{">"}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px" }}>
          <Link
            href="/docs"
            style={{
              ...mono,
              fontSize: "11px",
              color: "#6366f1",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 0.15s ease",
              fontWeight: 500
            }}
          >
            Read more docs →
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid #f3f4f6" }}>
        <a
          href="https://www.edwinvakayil.info/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Built by Edwin Vakayil (opens in a new tab)"
          style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#374151"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; }}
        >
          built by edwinvakayil
        </a>
        <nav style={{ display: "flex", gap: "20px" }}>
          {["npm"].map((link) => (
            <a
              key={link}
              href="https://www.npmjs.com/package/inkvelle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Inkvelle on ${link} (opens in a new tab)`}
              style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#374151"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; }}
            >
              {link}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}