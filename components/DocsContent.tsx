"use client";

import Link from "next/link";
import PropTable from "./PropTable";
import MotionConfigDemo from "./MotionConfigDemo";

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

export default function DocsContent() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px", maxWidth: "860px", margin: "0 auto" }}>
      
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
          <Link href="/" aria-label="Inkvelle Home" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#111827", letterSpacing: "-0.01em" }}>
              Inkvelle
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ ...mono, fontSize: "10px", color: "#9ca3af" }}>More Docs</span>
            <span style={{ color: "#d1d5db", fontSize: "12px" }}>/</span>
            <Link 
              href="/" 
              style={{ ...mono, fontSize: "10px", color: "#6366f1", textDecoration: "none" }}
            >
              Back to home
            </Link>
          </div>
        </div>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, maxWidth: "500px" }}>
          A minimalist React typography library for high-end digital interfaces.
        </p>
      </header>

      {/* ── Section: Custom Motion ───────────────────────────────────────────── */}
      <section aria-labelledby="custom-motion-title" style={{ marginBottom: "80px" }}>
        <h2 id="custom-motion-title" style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>
          Custom Motion Configuration
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "32px", lineHeight: "1.6" }}>
          For advanced use cases, you can pass a <code style={{ color: "#6366f1" }}>motionConfig</code> object to define your own 
          CSS keyframe animations, staggered delays, and splitting behavior (per word or character).
        </p>
        <MotionConfigDemo />
      </section>

      {/* ── Section: Props Reference ─────────────────────────────────────────── */}
      <section aria-labelledby="props-ref-title" style={{ marginBottom: "64px" }}>
        <h2 id="props-ref-title" style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "24px" }}>
          Prop Reference
        </h2>
        <PropTable />
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
          <a
            href="https://github.com/edwinvakayil/inkvelle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Inkvelle on GitHub (opens in a new tab)"
            style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
          >
            github
          </a>
          <a
            href="https://www.npmjs.com/package/inkvelle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Inkvelle on NPM (opens in a new tab)"
            style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
          >
            npm
          </a>
        </nav>
      </footer>

    </div>
  );
}
