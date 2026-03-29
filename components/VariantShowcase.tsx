"use client";
import { Typography } from "inkvelle";

const VARIANTS = [
  { variant: "Display",    tag: "h1",    role: "Hero / landing page headline", sample: "Hero headline" },
  { variant: "H1",         tag: "h1",    role: "Primary page heading",          sample: "Page title" },
  { variant: "H2",         tag: "h2",    role: "Section heading",               sample: "Section heading" },
  { variant: "H3",         tag: "h3",    role: "Sub-section heading",           sample: "Sub-section heading" },
  { variant: "H4",         tag: "h4",    role: "Card / panel heading",          sample: "Card heading" },
  { variant: "H5",         tag: "h5",    role: "Small heading",                 sample: "Small heading" },
  { variant: "H6",         tag: "h6",    role: "Micro heading",                 sample: "Micro heading" },
  { variant: "Subheading", tag: "h6",    role: "Supporting subtitle",           sample: "Supporting subtitle text" },
  { variant: "Overline",   tag: "span",  role: "ALL CAPS label above a heading",sample: "New Feature" },
  { variant: "Body",       tag: "p",     role: "Main body copy",                sample: "A well-set paragraph in a refined font brings reading pleasure and clarity." },
  { variant: "Label",      tag: "label", role: "Form labels, tags",             sample: "Email address" },
  { variant: "Caption",    tag: "span",  role: "Image captions, fine print",    sample: "Fig. 1 — System architecture overview" },
] as const;

type VariantName = typeof VARIANTS[number]["variant"];

function getColSpan(variant: VariantName) {
  switch (variant) {
    case "Display":
    case "H1":
    case "Body":
      return "col-span-1 sm:col-span-2 lg:col-span-4";
    case "H2":
    case "H3":
    case "Caption":
      return "col-span-1 sm:col-span-2 lg:col-span-2";
    default:
      return "col-span-1 sm:col-span-1 lg:col-span-1";
  }
}

export default function VariantShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full grid-flow-row-dense">
      {VARIANTS.map(({ variant, tag, role, sample }) => (
        <div
          key={variant}
          className={`${getColSpan(variant)} flex flex-col justify-between gap-8 p-6 lg:p-7 rounded-[1.5rem] transition-transform duration-300 hover:scale-[1.01]`}
          style={{
            background: "var(--ink-surface)",
            border: "1px solid var(--ink-border)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.01)"
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <span 
              className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[6px]"
              style={{
                color: "var(--ink-accent)",
                background: "rgba(120,120,140,0.1)",
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              {variant}
            </span>
            <span 
              className="text-[10px] font-semibold opacity-50 uppercase tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {`<${tag}>`}
            </span>
          </div>

          {/* Sample Text */}
          <div className="w-full flex items-center min-h-[40px] overflow-hidden">
            <Typography
              variant={variant as VariantName}
              font="Bricolage Grotesque"
              color="var(--ink-text)"
            >
              {sample}
            </Typography>
          </div>

          {/* Footer Metadata */}
          <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(120,120,140,0.15)" }}>
            <span 
              className="text-[11px] font-medium opacity-80"
              style={{ color: "var(--ink-text)" }}
            >
              {role}
            </span>
            {variant === "Body" && (
              <span style={{ fontSize: "14px", opacity: 0.3, color: "var(--ink-text)" }}>¶</span>
            )}
            {(variant.startsWith("H") || variant === "Display") && (
              <span style={{ fontSize: "14px", opacity: 0.3, color: "var(--ink-text)", fontFamily: "'JetBrains Mono', monospace" }}>#</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
