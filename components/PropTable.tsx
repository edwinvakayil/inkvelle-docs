"use client";

const PROPS = [
  { name: "variant",      type: "TypographyVariant",                    default: '"Body"',   description: "Semantic variant — sets tag, font size, weight, and line-height." },
  { name: "font",         type: "string",                               default: "—",        description: 'Google Font name e.g. "Bricolage Grotesque". Auto-injects the <link> tag.' },
  { name: "color",        type: "string",                               default: "—",        description: "Any CSS color value applied to the text element." },
  { name: "align",        type: '"left" | "center" | "right" | "justify"', default: "—",    description: "Text alignment." },
  { name: "as",           type: "ElementType",                          default: "—",        description: "Override the rendered HTML tag while keeping variant styles." },
  { name: "truncate",     type: "boolean",                              default: "false",    description: "Single-line overflow with ellipsis." },
  { name: "maxLines",     type: "number",                               default: "—",        description: "Multi-line line-clamp — clips to N lines with ellipsis." },
  { name: "animation",    type: "HeroAnimation",                        default: "—",        description: "Built-in entrance animation. Display and H1 only. 43+ presets." },
  { name: "motionConfig", type: "MotionConfig",                         default: "—",        description: "Custom CSS keyframe animation with optional word/char splitting. Any variant." },
  { name: "motionRef",    type: "(el: HTMLElement | null) => void",     default: "—",        description: "Direct DOM ref callback — fires after mount. Use with GSAP, Framer, or Web Animations API." },
  { name: "italic",       type: "boolean",                              default: "false",    description: "When true, <em> inside Display / H1 renders in Instrument Serif italic." },
  { name: "accentColor",  type: "string",                               default: '"#c8b89a"',"description": "Color for <em> italic accent text. Only applies when italic={true}." },
  { name: "className",    type: "string",                               default: "—",        description: "Additional CSS class names." },
  { name: "style",        type: "CSSProperties",                        default: "—",        description: "Inline styles merged with component defaults." },
];

export default function PropTable() {
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--ink-border)" }}
    >
      {/* Header */}
      <div
        className="hidden sm:grid px-5 py-3 text-xs uppercase tracking-widest font-medium"
        style={{
          gridTemplateColumns: "8rem 14rem 6rem 1fr",
          background: "var(--ink-surface2)",
          color: "var(--ink-muted)",
          borderBottom: "1px solid var(--ink-border)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div>prop</div>
        <div>type</div>
        <div>default</div>
        <div>description</div>
      </div>

      {/* Rows */}
      {PROPS.map((p, i) => (
        <div
          key={p.name}
          className="grid grid-cols-1 sm:grid-cols-[8rem_14rem_6rem_1fr] gap-2 px-5 py-4 transition-colors duration-150"
          style={{
            background: i % 2 === 0 ? "#ffffff" : "var(--ink-surface)",
            borderBottom: i < PROPS.length - 1 ? "1px solid var(--ink-border)" : "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(120,120,140,0.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? "#ffffff" : "var(--ink-surface)"; }}
        >
          <div>
            <code
              className="text-xs font-semibold"
              style={{ color: "var(--ink-accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {p.name}
            </code>
          </div>
          <div>
            <code
              className="text-xs"
              style={{ color: "#6355a0", fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-word" as const }}
            >
              {p.type}
            </code>
          </div>
          <div>
            <code
              className="text-xs"
              style={{ color: "#6a7a8a", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {p.default}
            </code>
          </div>
          <div
            className="text-sm"
            style={{ color: "var(--ink-sub)", lineHeight: 1.55 }}
          >
            {p.description}
          </div>
        </div>
      ))}
    </div>
  );
}
