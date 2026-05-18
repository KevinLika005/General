import type { ProductSpec } from '../../data/catalog';
import { useTranslation } from 'react-i18next';

interface ProductSpecsProps {
  specs: ProductSpec[];
  title?: string;
}

export function ProductSpecs({ specs, title = 'Technical specifications' }: ProductSpecsProps) {
  const { t } = useTranslation();
  return (
    <div className="surface-panel h-full overflow-hidden">
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <p className="kicker">{t('common.labels.technicalData')}</p>
        <h2 className="mt-2 text-[clamp(1.35rem,1rem+0.8vw,1.8rem)] text-navy">{title === 'Technical specifications' ? t('common.labels.technicalSpecifications') : title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="spec-table min-w-full">
          <tbody>
            {specs.map((spec) => (
              <tr key={`${spec.label}-${spec.value}`}>
                <th className="w-[38%]">{spec.label}</th>
                <td className="text-text">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
