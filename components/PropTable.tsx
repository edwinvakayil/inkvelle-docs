"use client";

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

const PROPS = [
  { name: "variant",      type: "TypographyVariant",                       default: '"Body"',    description: "Semantic variant — sets tag, font size, weight, and line-height." },
  { name: "font",         type: "string",                                  default: "—",         description: 'Google Font name e.g. "Bricolage Grotesque". Auto-injects the <link> tag.' },
  { name: "color",        type: "string",                                  default: "—",         description: "Any CSS color value applied to the text element." },
  { name: "align",        type: '"left" | "center" | "right" | "justify"', default: "—",         description: "Text alignment." },
  { name: "as",           type: "ElementType",                             default: "—",         description: "Override the rendered HTML tag while keeping variant styles." },
  { name: "truncate",     type: "boolean",                                 default: "false",     description: "Single-line overflow with ellipsis." },
  { name: "maxLines",     type: "number",                                  default: "—",         description: "Multi-line line-clamp — clips to N lines with ellipsis." },
  { name: "animation",    type: "HeroAnimation",                           default: "—",         description: "Built-in entrance animation. Display and H1 only. 43+ presets." },
  { name: "motionConfig", type: "MotionConfig",                            default: "—",         description: "Custom CSS keyframe animation with optional word/char splitting. Any variant." },
  { name: "motionRef",    type: "(el: HTMLElement | null) => void",        default: "—",         description: "Direct DOM ref callback — fires after mount. Use with GSAP, Framer, or Web Animations API." },
  { name: "italic",       type: "boolean",                                 default: "false",     description: 'When true, <em> inside Display / H1 renders in Instrument Serif italic.' },
  { name: "accentColor",  type: "string",                                  default: '"#c8b89a"', description: "Color for <em> italic accent text. Only applies when italic={true}." },
  { name: "className",    type: "string",                                  default: "—",         description: "Additional CSS class names." },
  { name: "style",        type: "CSSProperties",                           default: "—",         description: "Inline styles merged with component defaults." },
];

export default function PropTable() {
  return (
    <div
      className="overflow-hidden"
      style={{ border: "1px solid var(--ink-border)", borderRadius: "16px" }}
    >
      {/* Header row */}
      <div
        className="hidden sm:grid px-5 py-3"
        style={{
          gridTemplateColumns: "9rem 16rem 7rem 1fr",
          background: "var(--ink-surface)",
          borderBottom: "1px solid var(--ink-border)",
        }}
      >
        {["prop", "type", "default", "description"].map((h) => (
          <span
            key={h}
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ ...mono, color: "var(--ink-muted)" }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Data rows */}
      <div>
        {PROPS.map((p, i) => (
          <div
            key={p.name}
            className="flex flex-col sm:grid px-5 py-4 gap-2 sm:gap-0 transition-colors duration-100"
            style={{
              gridTemplateColumns: "9rem 16rem 7rem 1fr",
              background: "#ffffff",
              borderBottom: i < PROPS.length - 1 ? "1px solid var(--ink-border)" : "none",
              alignItems: "baseline",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--ink-surface)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff"; }}
          >
            {/* Prop name */}
            <div className="flex items-center gap-2 sm:block">
              <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest w-20 shrink-0" style={{ ...mono, color: "var(--ink-muted)" }}>prop</span>
              <code className="text-[11px] font-bold" style={{ ...mono, color: "var(--ink-accent)" }}>
                {p.name}
              </code>
            </div>

            {/* Type */}
            <div className="flex items-start gap-2 sm:block">
              <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest w-20 shrink-0 pt-px" style={{ ...mono, color: "var(--ink-muted)" }}>type</span>
              <code
                className="text-[11px] leading-snug"
                style={{ ...mono, color: "var(--ink-sub)", wordBreak: "break-word" as const }}
              >
                {p.type}
              </code>
            </div>

            {/* Default */}
            <div className="flex items-center gap-2 sm:block">
              <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest w-20 shrink-0" style={{ ...mono, color: "var(--ink-muted)" }}>default</span>
              <code className="text-[11px]" style={{ ...mono, color: "var(--ink-muted)" }}>
                {p.default}
              </code>
            </div>

            {/* Description */}
            <div className="flex items-start gap-2 sm:block">
              <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest w-20 shrink-0 pt-px" style={{ ...mono, color: "var(--ink-muted)" }}>desc</span>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-sub)" }}>
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
