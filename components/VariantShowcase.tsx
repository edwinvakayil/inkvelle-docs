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

export default function VariantShowcase() {
  return (
    <div className="w-full flex flex-col border-t border-[#f0f0f0]">
      {VARIANTS.map(({ variant, tag, role, sample }) => (
        <div
          key={variant}
          className="flex flex-col sm:flex-row items-baseline gap-4 sm:gap-12 py-10 border-b border-[#f0f0f0]"
        >
          {/* Specs / Meta */}
          <div className="w-full sm:w-[220px] shrink-0 flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-[#111111]">
                {variant}
              </span>
              <span className="text-[10px] font-mono text-[#999999] px-1.5 py-0.5 rounded bg-[#f5f5f5]">
                {`<${tag}>`}
              </span>
            </div>
            <span className="text-[11px] text-[#666666] leading-relaxed pr-4">
              {role}
            </span>
          </div>

          {/* Rendered Sample */}
          <div className="flex-1 w-full min-w-0 flex items-center">
            <Typography
              variant={variant as VariantName}
              font="Inter"
            >
              {sample}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
