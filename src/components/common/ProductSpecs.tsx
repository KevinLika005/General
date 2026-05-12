import type { ProductSpec } from '../../data/catalog';

interface ProductSpecsProps {
  specs: ProductSpec[];
  title?: string;
}

export function ProductSpecs({ specs, title = 'Technical specifications' }: ProductSpecsProps) {
  return (
    <div className="surface-panel overflow-hidden">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-[1.9rem] text-brand-navy">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="spec-table min-w-full">
          <tbody>
            {specs.map((spec) => (
              <tr key={`${spec.label}-${spec.value}`}>
                <th className="w-[38%]">{spec.label}</th>
                <td className="text-text-muted">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
