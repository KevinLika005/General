import type { Product } from '../data/types';

export type DataPlateKey = 'year' | 'hours' | 'mileage' | 'capacity' | 'power' | 'weight' | 'location';

export interface DataPlateCell {
  key: DataPlateKey;
  value: string;
}

export type DataPlateVariant = 'card' | 'detail';

type DataPlateSource = Pick<Product, 'year' | 'location'> &
  Partial<Pick<Product, 'operatingHours' | 'mileageKm' | 'capacity' | 'enginePower' | 'weight'>>;

const NUMBER_LOCALES = { en: 'en-GB', sq: 'sq-AL' } as const;

function isCell(cell: DataPlateCell | null): cell is DataPlateCell {
  return cell !== null;
}

function textCell(key: DataPlateKey, value: string | undefined): DataPlateCell | null {
  return value ? { key, value } : null;
}

export function getDataPlateCells(
  product: DataPlateSource,
  variant: DataPlateVariant,
  language: 'en' | 'sq',
): DataPlateCell[] {
  const formatNumber = (value: number) => new Intl.NumberFormat(NUMBER_LOCALES[language]).format(value);

  const year: DataPlateCell = { key: 'year', value: String(product.year) };
  const usage: DataPlateCell | null =
    product.operatingHours !== undefined
      ? { key: 'hours', value: `${formatNumber(product.operatingHours)} h` }
      : product.mileageKm !== undefined
        ? { key: 'mileage', value: `${formatNumber(product.mileageKm)} km` }
        : null;
  const capacity = textCell('capacity', product.capacity);
  const power = textCell('power', product.enginePower);
  const weight = textCell('weight', product.weight);
  const location = textCell('location', product.location);

  if (variant === 'card') {
    return [year, usage ?? capacity ?? power, location].filter(isCell);
  }

  return [year, usage, capacity, power, weight, location].filter(isCell);
}
