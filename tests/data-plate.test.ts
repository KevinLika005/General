import { describe, expect, it } from 'vitest';
import { getDataPlateCells } from '../src/utils/dataPlate';

const excavator = {
  year: 2019,
  operatingHours: 6480,
  capacity: '1.2 m3 bucket',
  enginePower: '103 kW',
  weight: '20 t',
  location: 'Tirane Yard',
};

describe('getDataPlateCells — card', () => {
  it('uses year, hours, location for machines with hours', () => {
    expect(getDataPlateCells(excavator, 'card', 'en')).toEqual([
      { key: 'year', value: '2019' },
      { key: 'hours', value: '6,480 h' },
      { key: 'location', value: 'Tirane Yard' },
    ]);
  });

  it('falls back to mileage when there are no hours', () => {
    const truck = { year: 2021, mileageKm: 120000, location: 'Durres' };
    const cells = getDataPlateCells(truck, 'card', 'sq');
    expect(cells[1].key).toBe('mileage');
    expect(cells[1].value).toMatch(/^120\s000 km$/u);
  });

  it('falls back to capacity, then power', () => {
    expect(getDataPlateCells({ year: 2020, capacity: '3 t', location: 'X' }, 'card', 'en')[1]).toEqual({
      key: 'capacity',
      value: '3 t',
    });
    expect(getDataPlateCells({ year: 2020, enginePower: '9 kW', location: 'X' }, 'card', 'en')[1]).toEqual({
      key: 'power',
      value: '9 kW',
    });
  });

  it('omits missing cells instead of leaving blanks', () => {
    expect(getDataPlateCells({ year: 2024, location: 'Tirane Yard' }, 'card', 'en')).toEqual([
      { key: 'year', value: '2024' },
      { key: 'location', value: 'Tirane Yard' },
    ]);
    expect(getDataPlateCells({ year: 2024, location: '' }, 'card', 'en')).toEqual([{ key: 'year', value: '2024' }]);
  });
});

describe('getDataPlateCells — detail', () => {
  it('lists every available spec in a fixed order', () => {
    expect(getDataPlateCells(excavator, 'detail', 'en').map((cell) => cell.key)).toEqual([
      'year',
      'hours',
      'capacity',
      'power',
      'weight',
      'location',
    ]);
  });

  it('formats hours without grouping in Albanian below 10 000', () => {
    expect(getDataPlateCells(excavator, 'detail', 'sq')[1]).toEqual({ key: 'hours', value: '6480 h' });
  });
});
