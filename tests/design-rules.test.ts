import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const srcDir = fileURLToPath(new URL('../src', import.meta.url));

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? tsxFiles(path) : path.endsWith('.tsx') ? [path] : [];
  });
}

const files = tsxFiles(srcDir).map((path) => ({ path: path.slice(srcDir.length + 1), source: readFileSync(path, 'utf8') }));

function offenders(pattern: RegExp) {
  return files.filter(({ source }) => pattern.test(source)).map(({ path }) => path);
}

describe('design rules', () => {
  it('uses no uppercase text transforms', () => {
    expect(offenders(/\buppercase\b/)).toEqual([]);
  });

  it('uses no tracked-out letter spacing', () => {
    expect(offenders(/tracking-\[0\.(0[6-9]|1)/)).toEqual([]);
  });

  it('renders no kicker or eyebrow labels', () => {
    expect(offenders(/className=["{`][^"}`]*\b(kicker|eyebrow)\b/)).toEqual([]);
  });

  it('does not force square corners', () => {
    expect(offenders(/\brounded-none\b/)).toEqual([]);
  });
});
