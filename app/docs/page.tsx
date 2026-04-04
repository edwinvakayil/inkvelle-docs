"use client";

import Link from "next/link";
import { Typography } from "inkvelle";
import CodeBlock from "../../components/CodeBlock";
import PropTable from "../../components/PropTable";
import MotionConfigDemo from "../../components/MotionConfigDemo";

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

export default function DocsPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", padding: "48px 24px", maxWidth: "860px", margin: "0 auto" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
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
      </div>

      {/* ── Section: Custom Motion ───────────────────────────────────────────── */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>
          Custom Motion Configuration
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "32px", lineHeight: "1.6" }}>
          For advanced use cases, you can pass a <code style={{ color: "#6366f1" }}>motionConfig</code> object to define your own
          CSS keyframe animations, staggered delays, and splitting behavior (per word or character).
        </p>
        <MotionConfigDemo />
      </section>

      {/* ── Section: Props Reference ─────────────────────────────────────────── */}
      <section style={{ marginBottom: "64px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "24px" }}>
          Prop Reference
        </h2>
        <PropTable />
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid #f3f4f6" }}>
        <a
          href="https://www.edwinvakayil.info/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
        >
          built by edwinvakayil
        </a>
        <nav style={{ display: "flex", gap: "20px" }}>
          <a
            href="https://github.com/edwinvakayil/inkvelle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
          >
            github
          </a>
          <a
            href="https://www.npmjs.com/package/inkvelle"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...mono, fontSize: "11px", color: "#9ca3af", textDecoration: "none" }}
          >
            npm
          </a>
        </nav>
      </div>

    </div>
  );
}
