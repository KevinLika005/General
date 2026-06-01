interface HomepageTrustStripProps {
  items: string[];
}

export function HomepageTrustStrip({ items }: HomepageTrustStripProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <li
          className="border border-border bg-surface-card px-4 py-3 text-sm text-text-muted shadow-card"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
