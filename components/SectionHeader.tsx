interface SectionHeaderProps {
  title: string;
  desc?: string;
}

export default function SectionHeader({ title, desc }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <h2
        className="text-2xl sm:text-3xl font-extrabold tracking-tight"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--ink-text)" }}
      >
        {title}
      </h2>
      {desc && (
        <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: "var(--ink-sub)" }}>
          {desc}
        </p>
      )}
    </div>
  );
}
