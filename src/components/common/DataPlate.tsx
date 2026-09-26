import { useTranslation } from 'react-i18next';
import type { DataPlateCell, DataPlateKey, DataPlateVariant } from '../../utils/dataPlate';

const LABEL_KEYS: Record<DataPlateKey, string> = {
  year: 'common.labels.year',
  hours: 'pages.productDetail.keyFacts.operatingHours',
  mileage: 'pages.productDetail.keyFacts.mileage',
  capacity: 'pages.productDetail.specs.capacity',
  power: 'pages.productDetail.specs.enginePower',
  weight: 'pages.productDetail.specs.operatingWeight',
  location: 'common.labels.location',
};

export function DataPlate({ cells, variant }: { cells: DataPlateCell[]; variant: DataPlateVariant }) {
  const { t } = useTranslation();

  if (cells.length === 0) {
    return null;
  }

  return (
    <dl
      className={[
        'grid overflow-hidden rounded border-b border-r border-border',
        variant === 'detail' ? 'grid-cols-2 md:grid-cols-3' : '',
      ].join(' ')}
      style={variant === 'card' ? { gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` } : undefined}
    >
      {cells.map((cell) => (
        <div
          className={[
            'min-w-0 border-l border-t border-border bg-surface-subtle',
            variant === 'card' ? 'px-2 py-1.5' : 'px-3 py-2.5',
          ].join(' ')}
          key={cell.key}
        >
          <dt className="truncate text-[0.6875rem] text-text-muted">{t(LABEL_KEYS[cell.key])}</dt>
          <dd
            className={[
              'truncate font-display font-semibold tabular-nums text-navy',
              variant === 'card' ? 'text-[0.9375rem]' : 'text-[1.0625rem]',
            ].join(' ')}
            title={cell.value}
          >
            {cell.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
