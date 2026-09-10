export default function TechBadge({ name }) {
  return (
    <span className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors">
      {name}
    </span>
  );
}
