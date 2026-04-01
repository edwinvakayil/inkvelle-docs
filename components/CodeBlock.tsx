"use client";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function tokenize(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const keywords = new Set([
    "import", "from", "export", "default", "const", "let", "var", "function",
    "return", "if", "else", "type", "interface", "as", "new", "true", "false", "null", "undefined",
  ]);
  const builtins = new Set(["Typography", "TypographyProvider", "preloadFonts", "MotionConfig", "React", "useState"]);

  while (i < code.length) {
    // Comment
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const t = end === -1 ? code.slice(i) : code.slice(i, end);
      nodes.push(<span key={key++} style={{ color: "#64748B", fontStyle: "italic" }}>{t}</span>);
      i += t.length;
      continue;
    }
    // Template literal
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++;
        j++;
      }
      const t = code.slice(i, j + 1);
      nodes.push(<span key={key++} style={{ color: "#34D399" }}>{t}</span>);
      i = j + 1;
      continue;
    }
    // String
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === "\\") j++;
        j++;
      }
      const t = code.slice(i, j + 1);
      nodes.push(<span key={key++} style={{ color: "#34D399" }}>{t}</span>);
      i = j + 1;
      continue;
    }
    // JSX Tag Start/End parsing snippet
    if (code[i] === "<" && /[a-zA-Z/]/.test(code[i + 1] || "")) {
      let j = i + 1;
      if (code[j] === "/") j++;
      const startName = j;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const tagName = code.slice(startName, j);

      if (tagName) {
        nodes.push(<span key={key++} style={{ color: "#94A3B8" }}>{code.slice(i, startName)}</span>);
        const isComponent = /^[A-Z]/.test(tagName);
        nodes.push(<span key={key++} style={{ color: isComponent ? "#818CF8" : "#F472B6" }}>{tagName}</span>);
        i = j;
        continue;
      }
    }
    // Word
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (keywords.has(word)) {
        nodes.push(<span key={key++} style={{ color: "#F472B6" }}>{word}</span>);
      } else if (builtins.has(word)) {
        nodes.push(<span key={key++} style={{ color: "#38BDF8" }}>{word}</span>);
      } else if (/^[A-Z]/.test(word)) {
        nodes.push(<span key={key++} style={{ color: "#818CF8" }}>{word}</span>);
      } else {
        nodes.push(<span key={key++} style={{ color: "#E2E8F0" }}>{word}</span>);
      }
      i = j;
      continue;
    }
    // Number
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) j++;
      nodes.push(<span key={key++} style={{ color: "#FBBF24" }}>{code.slice(i, j)}</span>);
      i = j;
      continue;
    }
    // Operator / punctuation
    if (/[{}()[\]:;,=<>|&!?+\-*/^%~]/.test(code[i])) {
      nodes.push(<span key={key++} style={{ color: "#94A3B8" }}>{code[i]}</span>);
      i++;
      continue;
    }
    // Everything else
    nodes.push(<span key={key++} style={{ color: "#E2E8F0" }}>{code[i]}</span>);
    i++;
  }
  return nodes;
}

export default function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden my-6 transition-all duration-300"
      style={{
        background: "#0A0D14",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
        transform: "translateZ(0)",
        isolation: "isolate",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          {/* Mac window buttons */}
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>

        <span
          className="text-xs font-semibold tracking-wider uppercase ml-4 mr-auto"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "system-ui, sans-serif" }}
        >
          {language}
        </span>

        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-in-out"
          style={{
            background: copied ? "rgba(52, 211, 153, 0.15)" : "rgba(255,255,255,0.05)",
            color: copied ? "#34D399" : "rgba(255,255,255,0.7)",
            border: "1px solid",
            borderColor: copied ? "rgba(52, 211, 153, 0.3)" : "rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#FFFFFF";
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre
        className="overflow-x-auto scrollbar-hide p-5 m-0"
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace",
          fontSize: "0.85rem",
          lineHeight: 1.7,
        }}
      >
        <code>{tokenize(code)}</code>
      </pre>
    </div>
  );
}
