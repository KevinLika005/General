import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function loadLocaleObject(relativePath, exportName) {
  const source = readFileSync(path.join(rootDir, relativePath), 'utf8');
  const match = source.match(new RegExp(`export const ${exportName} = (\\{[\\s\\S]*\\}) as const;`));

  if (!match) {
    throw new Error(`Could not parse ${relativePath}`);
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function collectIssues(enValue, sqValue, currentPath, issues) {
  if (currentPath === 'catalog') {
    return;
  }

  if (typeof enValue === 'string') {
    if (typeof sqValue !== 'string') {
      issues.push({ type: 'missing', path: currentPath, enValue });
      return;
    }

    if (enValue === sqValue && looksLikeUnexpectedEnglish(enValue, currentPath)) {
      issues.push({ type: 'same-string', path: currentPath, enValue });
    }

    return;
  }

  if (Array.isArray(enValue)) {
    if (!Array.isArray(sqValue)) {
      issues.push({ type: 'missing', path: currentPath, enValue: '[array]' });
      return;
    }

    enValue.forEach((item, index) => {
      collectIssues(item, sqValue[index], `${currentPath}.${index}`, issues);
    });
    return;
  }

  if (isPlainObject(enValue)) {
    if (!isPlainObject(sqValue)) {
      issues.push({ type: 'missing', path: currentPath, enValue: '[object]' });
      return;
    }

    for (const key of Object.keys(enValue)) {
      collectIssues(enValue[key], sqValue[key], currentPath ? `${currentPath}.${key}` : key, issues);
    }
  }
}

function looksLikeUnexpectedEnglish(value, currentPath) {
  if (!/[A-Za-z]/.test(value)) {
    return false;
  }

  if (/^[A-Z0-9 /:+().,&-]+$/.test(value)) {
    return false;
  }

  if (value.includes('GENERAL TRADING')) {
    return false;
  }

  if (currentPath.startsWith('common.language.')) {
    return false;
  }

  if (
    currentPath === 'common.labels.email' ||
    currentPath === 'common.forms.whatsapp' ||
    currentPath === 'common.forms.contactByEmail' ||
    currentPath === 'pages.productDetail.documentKinds.video' ||
    currentPath === 'layout.header.logoAlt'
  ) {
    return false;
  }

  if (currentPath.endsWith('.value') || currentPath.endsWith('.slug')) {
    return false;
  }

  return true;
}

const en = loadLocaleObject('src/i18n/locales/en.ts', 'en');
const sq = loadLocaleObject('src/i18n/locales/sq.ts', 'sq');
const sqCatalogLocale = loadLocaleObject('src/i18n/catalogLocale.ts', 'sqCatalogLocale');
const issues = [];

collectIssues(en, sq, '', issues);
collectIssues(en.catalog, sqCatalogLocale, 'catalog', issues);

if (issues.length === 0) {
  console.log('SQ locale audit passed: no missing keys or suspicious English fallback detected.');
  process.exit(0);
}

console.error('SQ locale audit found issues:');

for (const issue of issues) {
  if (issue.type === 'missing') {
    console.error(`- Missing SQ value at ${issue.path}`);
    continue;
  }

  console.error(`- Suspicious identical EN/SQ string at ${issue.path}: ${issue.enValue}`);
}

process.exit(1);
