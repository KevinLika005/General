import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

type Rgb = [number, number, number];

function block(selector: string) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Missing CSS block ${selector}`);
  return css.slice(start, css.indexOf('}', start));
}

function token(blockText: string, name: string): Rgb {
  const match = blockText.match(new RegExp(`--${name}:\\s*(\\d+)\\s+(\\d+)\\s+(\\d+);`));
  if (!match) throw new Error(`Missing token --${name}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function luminance(rgb: Rgb) {
  const [r, g, b] = rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const themes = [
  ['light', ':root'],
  ['dark', ":root[data-theme='dark']"],
] as const;

describe('design tokens', () => {
  for (const [theme, selector] of themes) {
    it(`${theme}: primary button text meets WCAG AA`, () => {
      const b = block(selector);
      expect(contrast(token(b, 'on-primary'), token(b, 'primary'))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(b, 'on-primary'), token(b, 'primary-hover'))).toBeGreaterThanOrEqual(4.5);
    });

    it(`${theme}: muted text on page meets WCAG AA`, () => {
      const b = block(selector);
      expect(contrast(token(b, 'text-muted'), token(b, 'surface-page'))).toBeGreaterThanOrEqual(4.5);
    });
  }

  it('light theme uses the approved neutral surfaces', () => {
    const b = block(':root');
    expect(token(b, 'surface-page')).toEqual([242, 241, 238]);
    expect(token(b, 'surface-subtle')).toEqual([234, 231, 225]);
    expect(token(b, 'border-default')).toEqual([218, 213, 204]);
  });
});
