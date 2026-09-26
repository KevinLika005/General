# Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the General Trading catalog into a compact, credible B2B equipment catalog — new foundation tokens, a two-row header, a data-plate product card, one shared catalog results layout, a restructured product page and homepage — without changing catalog data, routes, filtering, inquiry, or form behavior.

**Architecture:** Foundation first. Tokens and base CSS in `src/index.css` + `tailwind.config.js`, shared primitives (`Button`, `Badge`, `SectionHeader`, new `DataPlate`), then shared layout pieces (header, footer, product card, new `CatalogResults`), then pages. Pure logic (data-plate cell selection, homepage data) is unit-tested with Vitest; visual work is verified by the five repo validation commands plus screenshots.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind 3.4, React Router 7, i18next, lucide-react. New dev dependency: `vitest@^2.1.9` (tests live in `tests/`, outside the app `tsconfig`, so no `@types/node` is needed).

**Spec:** `docs/superpowers/specs/2026-09-26-visual-redesign-design.md`

## Global Constraints

- Branch: `feature/visual-redesign`. Commit after every task.
- Keep palette hues. Only these light-theme token values change: `--surface-page: 242 241 238`, `--surface-subtle: 234 231 225`, `--border-default: 218 213 204`, `--primary-hover: 210 166 80`. New token `--on-primary` (light `39 37 33`, dark `24 22 20`).
- Primary (gold) buttons use charcoal text (`text-on-primary`). Never white text on gold. Gold never used for body text on light surfaces.
- Fonts: IBM Plex Sans (body/UI), IBM Plex Sans Condensed semibold (`font-display`) for headings and spec values. Spec values use `tabular-nums`.
- Type scale (desktop / mobile): H1 44 / 30px, H2 32 / 24px, H3 20 / 18px, body 15px, meta 13px, micro 11–12px.
- Sentence case everywhere. No `uppercase`, no tracked-out labels, no eyebrow/kicker labels above headings.
- Radius: buttons/inputs 4px (`rounded`), cards 6px (`rounded-md`), large panels 8px (`rounded-lg`).
- Borders separate; only product cards get `shadow-hover` on hover. No entrance/scroll animations.
- Do not change: catalog data files (except `src/data/homepage.ts` selection counts), routes, `useCatalogFilters`, search logic, inquiry list logic, form submission, mail pipeline.
- Do not invent copy. Reuse existing translation keys. Any new or changed user-facing string must exist in both `src/i18n/locales/en.ts` and `src/i18n/locales/sq.ts`. (This plan needs **no** new translation keys.)
- Every task ends with: `npm test`, `npm run lint`, `npm run typecheck`, `npm run audit:i18n`, `npm run check:images`, `npm run build` — all must pass.
- Screenshots use the in-app browser against `npm run dev` (launch config `vite-dev`, port 5173) at widths 375, 768, 1440; light and dark (toggle via the header theme button, or `localStorage.setItem('general-trading-theme','dark')` + reload).

## Review Focus

1. **Stretched card link vs. "Add" button** — the whole card is a link, but clicking "+ Add" must add to the inquiry list without navigating. Checked in Task 4 Step 6.
2. **Products missing usage specs or images** — materials/tools have no hours/km/capacity; the card data plate must show only the cells that exist (no empty cells), and a missing image must not blow up the compact mobile row. Unit test in Task 3; visual check in Task 4 Step 6.
3. **Albanian labels at 1024–1280px** — `sq` nav labels are longer than `en`; the charcoal nav row must stay on one line at 1280px and the header must not wrap at 1024px. Checked in Task 2 Step 6.
4. **Filters arriving via URL** — `/equipment?availability=incoming&yearMin=2019` must show the radio checked and the collapsed "Year" group open. Checked in Task 5 Step 7.
5. **Desktop sidebar and mobile drawer mounted together** — both render a `FilterSidebar`; radio groups must not share a `name` or they uncheck each other. Handled with `useId` in Task 5; checked in Task 5 Step 7.

---

### Task 1: Foundation — tokens, base CSS, Button, Badge, SectionHeader, test runner

**Files:**
- Modify: `package.json` (dev dep + `test` script)
- Create: `tests/design-tokens.test.ts`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Modify: `src/components/common/Button.tsx`
- Modify: `src/components/common/Badge.tsx`
- Modify: `src/components/common/SectionHeader.tsx` and every call site passing `eyebrow=`

**Interfaces:**
- Produces: Tailwind color `on-primary`; CSS var `--header-offset`; `SectionHeader` props `{ title: string; description?: string; align?: 'left' | 'center'; titleAs?: 'h1' | 'h2' }` (no `eyebrow`); `Badge` API unchanged.

- [ ] **Step 1: Install Vitest and add the test script**

```bash
npm install --save-dev vitest@^2.1.9
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 2: Write the failing token test**

Create `tests/design-tokens.test.ts`:

```ts
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
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test`
Expected: FAIL — `Missing token --on-primary` (light and dark), and the surfaces test fails with `[244, 240, 233]`.

- [ ] **Step 4: Update tokens in `src/index.css`**

In the `:root {` block:
- `--primary-hover: 168 118 28;` → `--primary-hover: 210 166 80;`
- `--surface-page: 244 240 233;` → `--surface-page: 242 241 238;`
- `--surface-subtle: 237 231 219;` → `--surface-subtle: 234 231 225;`
- `--border-default: 211 201 186;` → `--border-default: 218 213 204;`
- Add after `--primary-dark: …;`: `--on-primary: 39 37 33;`
- Add after `--measure-readable: 68ch;`: `--header-offset: 7rem;`

In the `:root[data-theme='dark'] {` block, add after `--primary-dark: …;`: `--on-primary: 24 22 20;`

In `index.html`, update the light theme-color to the new page color: `content="#f4f0e9" data-light="#f4f0e9"` → `content="#f2f1ee" data-light="#f2f1ee"`, and in the inline script fallback `'#f4f0e9'` → `'#f2f1ee'`.

- [ ] **Step 5: Run the token test to verify it passes**

Run: `npm test`
Expected: PASS (5 tests).

- [ ] **Step 6: Update base and component CSS in `src/index.css`**

Replace the heading rule inside `@layer base`:

```css
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-display font-semibold text-navy;
    line-height: 1.1;
    letter-spacing: -0.005em;
  }
```

Inside `@layer components`, replace these rules exactly:

```css
  .product-grid,
  .catalog-product-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
    align-items: stretch;
  }

  .kicker,
  .eyebrow {
    @apply text-[0.8125rem] font-medium text-text-muted;
  }

  .line-label {
    @apply text-[0.75rem] font-medium text-text-muted;
  }

  .field {
    @apply mt-2 min-h-11 w-full rounded border border-border bg-surface-card px-3 py-2.5 text-sm text-text placeholder:text-text-muted/70 focus:border-primary;
  }

  .surface-panel {
    @apply rounded-lg border border-border bg-surface-card;
  }

  .subtle-panel {
    @apply rounded-lg border border-border bg-surface-subtle;
  }

  .toolbar-panel {
    @apply rounded-lg border border-border bg-surface-card;
  }

  .chip {
    @apply inline-flex min-h-9 items-center rounded border border-border bg-surface-card px-3 py-1.5 text-[0.8125rem] font-medium text-navy transition-colors hover:border-primary;
  }

  .data-grid-card {
    @apply rounded-lg border border-border bg-surface-card px-4 py-4;
  }
```

Delete the old separate `.product-grid { … }`, `.catalog-product-grid { … }`, `.kicker { … }`, `.eyebrow { @apply kicker; }` rules that these replace. In the `@media (min-width: 1680px)` and `@media (min-width: 2048px)` blocks, delete the `.catalog-product-grid` and `.product-grid` rules (keep `.brand-grid`). If a media block becomes empty, delete it.

- [ ] **Step 7: Update `tailwind.config.js`**

Add to `theme.extend.colors`:

```js
        'on-primary': 'rgb(var(--on-primary) / <alpha-value>)',
```

Replace the `borderRadius` block in `theme.extend` with:

```js
      borderRadius: {
        sm: '4px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
      },
```

- [ ] **Step 8: Update `Button.tsx`**

Replace the body of `getClasses` with:

```ts
function getClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded border font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';
  const variants: Record<ButtonVariant, string> = {
    primary:
      'border-primary bg-primary text-on-primary hover:border-primary-hover hover:bg-primary-hover',
    secondary:
      'border-border bg-surface-card text-navy hover:border-primary hover:bg-surface-subtle',
    ghost:
      'border-transparent bg-transparent text-navy hover:bg-surface-subtle',
    dark:
      'border-border-blue bg-surface-dark text-text-on-dark hover:border-surface-blue hover:bg-surface-blue',
  };
  const sizes: Record<ButtonSize, string> = {
    xs: 'min-h-8 px-3 text-[0.8125rem]',
    sm: 'min-h-9 px-3.5 text-[0.8125rem]',
    md: 'min-h-11 px-4 text-[0.875rem]',
    lg: 'min-h-12 px-5 text-[0.9375rem]',
    xl: 'min-h-14 px-6 text-base',
  };

  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}
```

- [ ] **Step 9: Update `Badge.tsx`**

Replace the `className` array's first string with:

```ts
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.75rem] font-medium',
```

- [ ] **Step 10: Remove the eyebrow from `SectionHeader.tsx`**

Replace the whole file with:

```tsx
interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  titleAs?: 'h1' | 'h2';
}

export function SectionHeader({
  align = 'left',
  description,
  title,
  titleAs = 'h2',
}: SectionHeaderProps) {
  const TitleTag = titleAs;

  return (
    <div className={align === 'center' ? 'mx-auto max-w-[min(100%,56rem)] text-center' : 'max-w-[min(100%,56rem)]'}>
      <TitleTag className="text-[clamp(1.5rem,1.1rem+1.1vw,2rem)] text-navy">{title}</TitleTag>
      {description ? <p className="text-measure mt-2 text-[0.9375rem] text-text-muted">{description}</p> : null}
    </div>
  );
}
```

Then find and delete every `eyebrow={…}` prop passed to `SectionHeader`:

Run: `grep -rn "eyebrow=" src`
For each hit that is a `<SectionHeader` prop, delete that line. Keep the translation keys in the locale files — several are reused elsewhere (e.g. footer links use `pages.faq.eyebrow`).

- [ ] **Step 11: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass. If `typecheck` reports `Property 'eyebrow' does not exist`, delete that prop at the reported location and re-run.

- [ ] **Step 12: Screenshot check**

With `npm run dev` running, screenshot `/` and `/equipment` at 1440px, light and dark. Confirm: gold buttons have charcoal text (light) / near-black text (dark); page background is warm grey, not cream; headings are condensed; no uppercase labels in `SectionHeader` sections.

- [ ] **Step 13: Commit**

```bash
git add package.json package-lock.json tests/design-tokens.test.ts src/index.css index.html tailwind.config.js src/components/common/Button.tsx src/components/common/Badge.tsx src/components/common/SectionHeader.tsx src
git commit -m "Redesign foundation: tokens, radius, type, button contrast, section header"
```

---

### Task 2: Header, mega menu, and mobile menu

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/MegaMenu.tsx`
- Modify: `src/components/layout/MobileMenu.tsx`
- Modify: `src/components/common/ThemeToggle.tsx`
- Modify: `src/index.css` (`--header-offset` value only, after measuring)

**Interfaces:**
- Consumes: `--header-offset`, `text-on-primary`, `Button`.
- Produces: desktop header height stored in `--header-offset` (used by Tasks 5 and 6 for sticky elements).

- [ ] **Step 1: Remove the utility bar and tagline in `Header.tsx`**

Delete the entire block that starts with `<div className="hidden border-b border-border-blue bg-surface-dark text-text-on-dark xl:block">` and ends with its matching `</div>` (the top utility bar with phone, email, location, `topUtilityNote`, and the language button).

In the logo `<Link>`, delete the `<div className="hidden min-w-0 wide:block">…</div>` (tagline and description), and change the `<img>` className to `"h-11 w-auto object-contain xl:h-12"`.

Change the row-1 container className from
`"wide-shell grid min-h-[4.15rem] grid-cols-[auto_1fr_auto] items-center gap-3 py-3 xl:min-h-[4.9rem] xl:gap-4"`
to
`"wide-shell grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5 xl:gap-6"`.

- [ ] **Step 2: Add the language switch to row 1**

Directly after `<ThemeToggle />` in the right-hand actions, add:

```tsx
            <button
              aria-label={t('common.language.switcher')}
              className="hidden h-10 items-center justify-center rounded border border-border bg-surface-card px-3 text-[0.8125rem] font-semibold text-navy transition-colors hover:border-primary xl:inline-flex"
              onClick={toggleLanguage}
              title={t('common.language.toggle')}
              type="button"
            >
              {language === 'en' ? 'EN / SQ' : 'SQ / EN'}
            </button>
```

In the same actions group, add `rounded` to the className of the mobile inquiry icon button, the desktop inquiry list button, the tablet search icon button, and the menu button. In the desktop inquiry button, change the count `<span>` className to `"rounded-full bg-brand-gold-soft px-2 py-0.5 text-[0.75rem] font-semibold text-navy tabular-nums"`.

- [ ] **Step 3: Turn row 2 into the charcoal nav row with the phone**

Replace `navClass` with:

```ts
function navClass(isActive: boolean) {
  return [
    'text-[0.875rem] font-medium transition-colors',
    isActive ? 'text-accent' : 'text-text-on-dark/80 hover:text-text-on-dark',
  ].join(' ');
}
```

Change the nav row wrapper `<div className="hidden border-t border-border xl:block">` to `<div className="hidden bg-surface-dark xl:block">`, and its inner `<div className="wide-shell flex items-center justify-between gap-4 py-3">` to `<div className="wide-shell flex h-12 items-center justify-between gap-4">`. Change the `<nav … className="flex items-center gap-6">` to `className="flex h-full items-center gap-7"`.

Replace all three dropdown wrappers' `className="relative -mb-3 pb-3"` with `className="relative flex h-full items-center"` (use replace-all on that exact string).

Replace all three chevron buttons' `className="p-1 text-text-muted transition hover:text-navy"` with `className="p-1 text-text-on-dark/70 transition-colors hover:text-text-on-dark"` (replace-all).

Replace the trailing block

```tsx
            <div className="hidden max-w-[22rem] wide:block">
              <p className="text-[0.72rem] uppercase tracking-[0.12em] text-text-muted">
                {t('layout.header.utilitySearchDescription')}
              </p>
            </div>
```

with

```tsx
            {companyProfile.phone ? (
              <a
                className="inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-text-on-dark/80 transition-colors hover:text-text-on-dark"
                href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {companyProfile.phone}
              </a>
            ) : null}
```

Add `Phone` to the lucide import at the top of the file.

- [ ] **Step 4: Restyle the simple dropdown panel**

In `DropdownPanel`, change the panel className's `border border-border bg-surface-card p-4 shadow-dropdown` to `rounded-lg border border-border bg-surface-card p-2 shadow-dropdown`, change `grid gap-2 wide:grid-cols-2` to `grid gap-1 wide:grid-cols-2`, and change each item `NavLink` className to `"rounded px-3 py-2.5 transition-colors hover:bg-surface-subtle"`.

- [ ] **Step 5: Restyle `MegaMenu.tsx`, `MobileMenu.tsx`, `ThemeToggle.tsx`**

`MegaMenu.tsx`:
- Panel: `border border-border bg-surface-card p-5 shadow-dropdown backdrop-blur` → `rounded-lg border border-border bg-surface-card p-5 shadow-dropdown`.
- Delete `<p className="kicker">{t('layout.footer.products')}</p>` and change the following `<h3 className="mt-2 …">` to drop `mt-2`.
- Request-quote `Link`: replace its className with `"inline-flex min-h-10 items-center justify-center rounded border border-border px-4 text-[0.875rem] font-semibold text-navy transition-colors hover:border-primary"`.
- Category card wrapper `"border border-border bg-surface-card p-4"` → `"rounded-md p-3 hover:bg-surface-subtle"`.
- Subcategory links `"border border-transparent px-2.5 py-2 text-sm text-text-muted transition hover:border-border hover:bg-surface-subtle hover:text-navy"` → `"rounded px-2.5 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-card hover:text-navy"`.
- Featured aside box: `"border border-border-blue bg-surface-dark p-4 text-text-on-dark"` → `"rounded-lg bg-surface-dark p-4 text-text-on-dark"`; delete its `<p className="kicker …">…featuredEyebrow…</p>` and drop `mt-2` from the following `<h3>`; change its link className to `"mt-4 inline-flex min-h-10 w-full items-center justify-center rounded bg-primary px-4 text-[0.875rem] font-semibold text-on-primary transition-colors hover:bg-primary-hover"`.
- Quick links box `"border border-border bg-surface-subtle p-4"` → `"rounded-lg bg-surface-subtle p-4"`; each quick link add `rounded` to its className.
- Support box `"border border-border bg-surface-card p-4"` → `"rounded-lg border border-border p-4"`.

`MobileMenu.tsx`:
- Close button and language button: add `rounded`.
- Theme/language row `"mt-4 flex items-center justify-between gap-3 border border-border bg-surface-card px-4 py-3 shadow-card"` → `"mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-card px-4 py-3"`.
- Main links: `"border border-border bg-surface-card px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-navy shadow-card"` → `"rounded-md border border-border bg-surface-card px-4 py-3 text-[0.9375rem] font-semibold text-navy"`.
- Inquiry box: `"mt-5 border border-border-blue bg-surface-dark p-4 text-text-on-dark shadow-card"` → `"mt-5 rounded-lg bg-surface-dark p-4 text-text-on-dark"`; replace `<p className="kicker text-text-on-dark/80">{t('layout.header.inquiryList')}</p>` with `<p className="text-[0.9375rem] font-semibold text-text-on-dark">{t('layout.header.inquiryList')}</p>`.
- `<h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-navy">` → `<h2 className="text-[1.0625rem] text-navy">`.
- Category accordion wrapper `"border border-border bg-surface-card shadow-card"` → `"rounded-md border border-border bg-surface-card"`; title `<p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-navy">` → `<p className="text-[0.9375rem] font-semibold text-navy">`; "view all" link add `rounded`.
- Support and company boxes: `"mt-6 border border-border bg-surface-card p-4 shadow-card"` → `"mt-6 rounded-lg border border-border bg-surface-card p-4"` (both); links add `rounded`.

`ThemeToggle.tsx`: add `rounded` to the button className.

- [ ] **Step 6: Measure the header and check Albanian at narrow widths**

Run the dev server. In the browser at 1440px on `/`, evaluate `document.querySelector('header').offsetHeight` and set `--header-offset` in `src/index.css` `:root` to that value in rem (px / 16, rounded up to 0.25rem; expected ≈ 7rem).
Then screenshot `/` in Albanian (default) at 1280px and 1024px, light and dark:
- 1280px: charcoal nav row is one line; phone visible at the right.
- 1024px: row 1 does not wrap; logo, search, theme, language, inquiry, request-quote all on one line.
- Open each dropdown by hover and by keyboard (Tab to the chevron, Enter); Escape closes.
If the nav wraps at 1280px, reduce `gap-7` to `gap-5`. If row 1 wraps at 1024px, hide the language button below `2xl` (`xl:inline-flex` → `2xl:inline-flex`) since the mobile menu also has it.
Screenshot at 375px: open the mobile menu and confirm no uppercase text.

- [ ] **Step 7: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/MegaMenu.tsx src/components/layout/MobileMenu.tsx src/components/common/ThemeToggle.tsx src/index.css
git commit -m "Two-row header with charcoal nav, restyled mega and mobile menus"
```

---

### Task 3: Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `Button`.

- [ ] **Step 1: Restyle group titles**

In `FooterGroup`, change the button className
`"flex w-full items-center justify-between text-left text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-text-on-dark xl:pointer-events-none"`
to
`"flex w-full items-center justify-between text-left text-[0.9375rem] font-semibold text-text-on-dark xl:pointer-events-none"`.

Change the updates heading `<h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-text-on-dark">` to `<h3 className="text-[0.9375rem] text-text-on-dark">`.

- [ ] **Step 2: Restyle the CTA block**

Change the CTA wrapper `"mb-8 border border-text-on-dark/10 bg-text-on-dark/5 px-5 py-5 lg:flex lg:items-center lg:justify-between"` to `"mb-10 rounded-lg bg-text-on-dark/5 px-5 py-6 lg:flex lg:items-center lg:justify-between lg:px-8"`.
Delete `<p className="kicker text-text-on-dark/80">{t('layout.footer.cta.eyebrow')}</p>` and remove `mt-2` from the following `<h2>`.
Replace the CTA `<Link …>{t('common.actions.requestQuote')}</Link>` with:

```tsx
            <Button size="lg" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Button>
```

Add `import { Button } from '../common/Button';` and remove the `Link` import only if no other `Link` remains (other `Link`s remain — keep it).

- [ ] **Step 3: Tidy logo and social buttons**

Logo `<img className="h-20 w-auto object-contain">` → `className="h-14 w-auto object-contain"`. Social link className: add `rounded`.

- [ ] **Step 4: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

- [ ] **Step 5: Screenshot check**

Footer at 1440px and 375px (expand one group), light and dark: no uppercase, CTA button charcoal-on-gold, newsletter form unchanged in behavior.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "Restyle footer: sentence-case groups, shared primary button"
```

---

### Task 4: Data plate and product card

**Files:**
- Create: `src/utils/dataPlate.ts`
- Create: `tests/data-plate.test.ts`
- Create: `src/components/common/DataPlate.tsx`
- Modify: `src/components/common/ProductCard.tsx` (full rewrite)

**Interfaces:**
- Produces:
  - `type DataPlateKey = 'year' | 'hours' | 'mileage' | 'capacity' | 'power' | 'weight' | 'location'`
  - `interface DataPlateCell { key: DataPlateKey; value: string }`
  - `type DataPlateVariant = 'card' | 'detail'`
  - `getDataPlateCells(product: DataPlateSource, variant: DataPlateVariant, language: 'en' | 'sq'): DataPlateCell[]`
  - `<DataPlate cells={DataPlateCell[]} variant="card" | "detail" />`
  - `<ProductCard product={Product} layout?: 'grid' | 'list' />` (same props as today)

- [ ] **Step 1: Write the failing data-plate tests**

Create `tests/data-plate.test.ts`:

```ts
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
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- tests/data-plate.test.ts`
Expected: FAIL — cannot resolve `../src/utils/dataPlate`.

- [ ] **Step 3: Implement `src/utils/dataPlate.ts`**

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (token tests + 6 data-plate tests).

- [ ] **Step 5: Create `DataPlate.tsx` and rewrite `ProductCard.tsx`**

Create `src/components/common/DataPlate.tsx`:

```tsx
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
        variant === 'detail' ? 'grid-cols-2 sm:grid-cols-3' : '',
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
          >
            {cell.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
```

Replace `src/components/common/ProductCard.tsx` with:

```tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/catalog';
import { useLanguage } from '../../hooks/useLanguage';
import { getProductAvailabilityLabel } from '../../utils/catalog';
import { getDataPlateCells } from '../../utils/dataPlate';
import { formatProductPrice } from '../../utils/formatPrice';
import { routes } from '../../utils/routes';
import { Badge } from './Badge';
import { DataPlate } from './DataPlate';
import { ImageWithFallback } from './ImageWithFallback';
import { InquiryButton } from './InquiryButton';

function getAvailabilityTone(availability: Product['availability']) {
  switch (availability) {
    case 'available':
      return 'green';
    case 'incoming':
      return 'amber';
    case 'reserved':
      return 'slate';
    case 'sold':
    default:
      return 'red';
  }
}

export function ProductCard({
  layout = 'grid',
  product,
}: {
  product: Product;
  layout?: 'grid' | 'list';
}) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isList = layout === 'list';
  const isSold = product.availability === 'sold';
  const cells = getDataPlateCells(product, 'card', language);

  return (
    <article
      className={[
        'group relative flex h-full overflow-hidden rounded-md border border-border bg-surface-card transition-shadow duration-150 hover:shadow-hover focus-within:shadow-hover',
        isList ? 'flex-row' : 'flex-row sm:flex-col',
      ].join(' ')}
    >
      <div className={['relative shrink-0 self-start', isList ? 'w-[40%] sm:w-64' : 'w-[40%] sm:w-full'].join(' ')}>
        <ImageWithFallback
          alt={product.images[0]?.alt ?? product.title}
          aspectRatio="video"
          className="border-0"
          src={product.images[0]?.src}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <Badge tone={getAvailabilityTone(product.availability)}>
            {getProductAvailabilityLabel(product.availability)}
          </Badge>
          {product.deal && !isSold ? <Badge tone="primary">{t('common.status.deal')}</Badge> : null}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <p className="truncate text-[0.8125rem] text-text-muted">
          {product.brand} {product.model}
        </p>
        <h3 className="line-clamp-2 font-sans text-[0.9375rem] font-semibold leading-snug text-navy">
          <Link
            className="after:absolute after:inset-0 after:content-['']"
            to={routes.product(product.categorySlug, product.slug)}
          >
            {product.title}
          </Link>
        </h3>
        <DataPlate cells={cells} variant="card" />
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="min-w-0 truncate text-[0.9375rem] font-semibold tabular-nums text-navy">
            {formatProductPrice(product)}
          </p>
          {isSold ? (
            <span className="text-[0.8125rem] font-medium text-status-sold">{t('common.status.sold')}</span>
          ) : (
            <InquiryButton className="relative z-10 shrink-0" compact productId={product.id} />
          )}
        </div>
      </div>
    </article>
  );
}
```

In `src/components/common/ImageWithFallback.tsx`, change the fallback wrapper `min-h-[220px]` to `min-h-full` so a missing image fits the card's 4:3 box instead of forcing 220px.

- [ ] **Step 6: Verify card behavior in the browser**

Screenshot `/equipment` at 1440px, 768px, 375px, light and dark:
- 1440px: 4 columns; 768px: 2 columns; 375px: one column of horizontal cards (image left).
- Each card: at most two pills, brand+model line, 2-line title, data plate with no empty cells, price, and "+ Add".
- Click "+ Add" on a card: the inquiry count in the header increments and the URL does **not** change. Click the card title area: navigates to the product page.
- Tab through a card: focus ring visible on the title link and then on the add button.
- Find the reserved product (`grep -n "availability: 'reserved'" src/data/products.ts`) and confirm its pill reads "Reserved" and it still has an add button.
- Temporarily break one image path in the browser devtools (edit `src` on an `<img>`) and confirm the fallback stays inside the card box; do not change data files.

- [ ] **Step 7: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add src/utils/dataPlate.ts tests/data-plate.test.ts src/components/common/DataPlate.tsx src/components/common/ProductCard.tsx src/components/common/ImageWithFallback.tsx
git commit -m "Compact product card with data plate; whole card links to detail"
```

---

### Task 5: Shared catalog results, filter sidebar, catalog/category/deals pages

**Files:**
- Create: `src/components/common/CatalogResults.tsx`
- Modify: `src/components/common/FilterSidebar.tsx` (full rewrite)
- Modify: `src/pages/CatalogPage.tsx` (render section only)
- Modify: `src/pages/CategoryPage.tsx` (render section only)
- Modify: `src/pages/DealsPage.tsx` (render section only)

**Interfaces:**
- Consumes: `useCatalogFilters` return value (unchanged), `ProductCard`, `MobileFilterDrawer`, `--header-offset`.
- Produces:

```ts
interface CatalogResultsProps {
  catalog: ReturnType<typeof useCatalogFilters>;
  resultLabel: string;        // e.g. t('common.status.results', { count })
  clearLabel: string;         // label for the "clear all" link next to applied filters
  mobileFiltersLabel: string; // drawer aria label
  emptyState: ReactNode;      // rendered when filteredProducts is empty
  footer?: ReactNode;         // rendered under the grid (deals CTA)
}
```

- [ ] **Step 1: Rewrite `FilterSidebar.tsx`**

Same props as today (`filters`, `setFilters`, `clearAllFilters`, `optionSets`, `onClose?`). View-mode and sort controls move to the toolbar in `CatalogResults`, so they are removed here.

```tsx
import { ChevronDown, X } from 'lucide-react';
import { useId, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import type { CatalogFilterOptionSets, CatalogFilterState } from '../../hooks/useCatalogFilters';
import type { PriceBand } from '../../utils/filters';
import { Button } from './Button';

interface FilterSidebarProps {
  filters: CatalogFilterState;
  setFilters: Dispatch<SetStateAction<CatalogFilterState>>;
  clearAllFilters: () => void;
  optionSets: CatalogFilterOptionSets;
  onClose?: () => void;
}

const inputClass =
  'mt-1.5 h-10 w-full rounded border border-border bg-surface-card px-3 text-sm text-text placeholder:text-text-muted/70';

function FilterGroup({ title, defaultOpen, children }: { title: string; defaultOpen: boolean; children: ReactNode }) {
  return (
    <details className="group border-b border-border px-4 py-3 last:border-b-0" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden="true" className="h-4 w-4 text-text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 grid gap-2">{children}</div>
    </details>
  );
}

function RadioOption({
  checked,
  label,
  name,
  onSelect,
}: {
  checked: boolean;
  label: string;
  name: string;
  onSelect: () => void;
}) {
  return (
    <label className="flex min-h-8 cursor-pointer items-center gap-2.5 text-sm text-text">
      <input checked={checked} className="h-4 w-4 accent-primary" name={name} onChange={onSelect} type="radio" />
      {label}
    </label>
  );
}

export function FilterSidebar({ clearAllFilters, filters, onClose, optionSets, setFilters }: FilterSidebarProps) {
  const { t } = useTranslation();
  const idPrefix = useId();
  const budgetBands = t('catalog.budgetBands', { returnObjects: true }) as Array<{ slug: PriceBand; label: string }>;
  const update = (patch: Partial<CatalogFilterState>) => setFilters((current) => ({ ...current, ...patch }));

  const availabilityOptions = [
    ['all', t('common.status.allStatus')],
    ['available', t('common.status.available')],
    ['incoming', t('common.status.incoming')],
    ['reserved', t('common.status.reserved')],
    ['sold', t('common.status.sold')],
  ] as const;
  const conditionOptions = [
    ['all', t('common.status.allConditions')],
    ['new', t('common.status.new')],
    ['used', t('common.status.used')],
    ['refurbished', t('common.status.refurbished')],
  ] as const;

  return (
    <div className="rounded-lg border border-border bg-surface-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="font-sans text-[0.9375rem] font-semibold text-navy">{t('common.labels.filterResults')}</h2>
        <div className="flex items-center gap-2">
          <button className="text-[0.8125rem] font-semibold text-navy underline underline-offset-4" onClick={clearAllFilters} type="button">
            {t('common.actions.clearAll')}
          </button>
          {onClose ? (
            <button
              aria-label={t('common.accessibility.closeFilters')}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-border text-text xl:hidden"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <FilterGroup defaultOpen title={t('common.labels.availability')}>
        {availabilityOptions.map(([value, label]) => (
          <RadioOption
            checked={filters.availability === value}
            key={value}
            label={label}
            name={`${idPrefix}-availability`}
            onSelect={() => update({ availability: value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup defaultOpen title={t('common.labels.condition')}>
        {conditionOptions.map(([value, label]) => (
          <RadioOption
            checked={filters.condition === value}
            key={value}
            label={label}
            name={`${idPrefix}-condition`}
            onSelect={() => update({ condition: value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup defaultOpen title={t('common.labels.category')}>
        <select
          aria-label={t('common.labels.category')}
          className={inputClass}
          onChange={(event) => update({ category: event.target.value, subcategory: 'all', productType: 'all' })}
          value={filters.category}
        >
          <option value="all">{t('common.status.allCategories')}</option>
          {optionSets.categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
        <select
          aria-label={t('common.labels.subcategory')}
          className={inputClass}
          onChange={(event) => update({ subcategory: event.target.value, productType: 'all' })}
          value={filters.subcategory}
        >
          <option value="all">{t('common.status.allSubcategories')}</option>
          {optionSets.subcategories.map((subcategory) => (
            <option key={subcategory.slug} value={subcategory.slug}>
              {subcategory.title}
            </option>
          ))}
        </select>
        <select
          aria-label={t('common.labels.productType')}
          className={inputClass}
          onChange={(event) => update({ productType: event.target.value })}
          value={filters.productType}
        >
          <option value="all">{t('common.status.allProductTypes')}</option>
          {optionSets.productTypes.map((productType) => (
            <option key={productType.slug} value={productType.slug}>
              {productType.title}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup defaultOpen title={t('common.labels.brand')}>
        <select
          aria-label={t('common.labels.brand')}
          className={inputClass}
          onChange={(event) => update({ brand: event.target.value })}
          value={filters.brand}
        >
          <option value="all">{t('common.status.allBrands')}</option>
          {optionSets.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup defaultOpen={filters.priceBand !== 'all'} title={t('common.labels.priceRange')}>
        <select
          aria-label={t('common.labels.priceRange')}
          className={inputClass}
          onChange={(event) => update({ priceBand: event.target.value as PriceBand })}
          value={filters.priceBand}
        >
          <option value="all">{t('common.status.allPriceBands')}</option>
          {budgetBands.map((band) => (
            <option key={band.slug} value={band.slug}>
              {band.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup defaultOpen={Boolean(filters.yearMin || filters.yearMax)} title={t('common.labels.year')}>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-[0.8125rem] text-text-muted">
            {t('common.labels.yearFrom')}
            <input className={inputClass} inputMode="numeric" onChange={(event) => update({ yearMin: event.target.value })} placeholder="2018" value={filters.yearMin} />
          </label>
          <label className="text-[0.8125rem] text-text-muted">
            {t('common.labels.yearTo')}
            <input className={inputClass} inputMode="numeric" onChange={(event) => update({ yearMax: event.target.value })} placeholder="2025" value={filters.yearMax} />
          </label>
        </div>
      </FilterGroup>

      <FilterGroup defaultOpen={Boolean(filters.hoursMax || filters.mileageMax)} title={t('common.labels.operatingHoursUnder')}>
        <input
          aria-label={t('common.labels.operatingHoursUnder')}
          className={inputClass}
          inputMode="numeric"
          onChange={(event) => update({ hoursMax: event.target.value })}
          placeholder="5000"
          value={filters.hoursMax}
        />
        <label className="text-[0.8125rem] text-text-muted">
          {t('common.labels.mileageUnder')}
          <input className={inputClass} inputMode="numeric" onChange={(event) => update({ mileageMax: event.target.value })} placeholder="200000" value={filters.mileageMax} />
        </label>
      </FilterGroup>

      <FilterGroup defaultOpen={filters.location !== 'all' || filters.tag !== 'all'} title={t('common.labels.location')}>
        <select
          aria-label={t('common.labels.location')}
          className={inputClass}
          onChange={(event) => update({ location: event.target.value })}
          value={filters.location}
        >
          <option value="all">{t('common.status.allLocations')}</option>
          {optionSets.locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          aria-label={t('common.labels.tags')}
          className={inputClass}
          onChange={(event) => update({ tag: event.target.value })}
          value={filters.tag}
        >
          <option value="all">{t('common.status.allTags')}</option>
          {optionSets.tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </FilterGroup>

      {onClose ? (
        <div className="sticky bottom-0 grid gap-3 border-t border-border bg-surface-card px-4 py-4 sm:grid-cols-2 xl:hidden">
          <Button onClick={clearAllFilters} variant="secondary">
            {t('common.actions.clearAll')}
          </Button>
          <Button className="w-full" onClick={onClose}>
            {t('common.actions.applyFilters')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
```

Note: `availability` and `condition` values are string-literal unions in `CatalogFilterState`; the `as const` tuples keep them typed. If `typecheck` rejects `update({ availability: value })`, cast with `value as CatalogFilterState['availability']` (and the same for `condition`).

- [ ] **Step 2: Create `CatalogResults.tsx`**

```tsx
import { Filter, LayoutGrid, List, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { CatalogFilterState, useCatalogFilters } from '../../hooks/useCatalogFilters';
import { FilterSidebar } from './FilterSidebar';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { ProductCard } from './ProductCard';

interface CatalogResultsProps {
  catalog: ReturnType<typeof useCatalogFilters>;
  resultLabel: string;
  clearLabel: string;
  mobileFiltersLabel: string;
  emptyState: ReactNode;
  footer?: ReactNode;
}

export function CatalogResults({ catalog, clearLabel, emptyState, footer, mobileFiltersLabel, resultLabel }: CatalogResultsProps) {
  const { t } = useTranslation();
  const {
    appliedFilters,
    clearAllFilters,
    clearFilter,
    filteredProducts,
    filters,
    mobileFiltersOpen,
    optionSets,
    setFilters,
    setMobileFiltersOpen,
  } = catalog;
  const sortOptions = t('catalog.sortOptions', { returnObjects: true }) as Array<{
    value: CatalogFilterState['sort'];
    label: string;
  }>;
  const viewButton = (mode: CatalogFilterState['viewMode']) =>
    [
      'inline-flex h-9 w-9 items-center justify-center transition-colors',
      filters.viewMode === mode ? 'bg-surface-subtle text-navy' : 'text-text-muted hover:text-navy',
    ].join(' ');

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[16.5rem_minmax(0,1fr)]">
        <aside className="hidden xl:sticky xl:top-[calc(var(--header-offset)+1rem)] xl:block xl:max-h-[calc(100vh-var(--header-offset)-2rem)] xl:self-start xl:overflow-y-auto">
          <FilterSidebar clearAllFilters={clearAllFilters} filters={filters} optionSets={optionSets} setFilters={setFilters} />
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <p aria-live="polite" className="text-sm font-semibold text-navy">
              {resultLabel}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex h-9 items-center gap-2 rounded border border-border bg-surface-card px-3 text-sm font-semibold text-navy xl:hidden"
                onClick={() => setMobileFiltersOpen(true)}
                type="button"
              >
                <Filter aria-hidden="true" className="h-4 w-4" />
                {t('common.labels.filters')}
                {appliedFilters.length > 0 ? ` (${appliedFilters.length})` : ''}
              </button>
              <label className="flex items-center gap-2 text-sm text-text-muted">
                <span className="hidden sm:inline">{t('common.labels.sort')}</span>
                <select
                  aria-label={t('common.labels.sort')}
                  className="h-9 rounded border border-border bg-surface-card px-2 text-sm text-text"
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, sort: event.target.value as CatalogFilterState['sort'] }))
                  }
                  value={filters.sort}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <div aria-label={t('common.labels.view')} className="hidden overflow-hidden rounded border border-border sm:flex" role="group">
                <button
                  aria-label={t('common.status.gridView')}
                  aria-pressed={filters.viewMode === 'grid'}
                  className={viewButton('grid')}
                  onClick={() => setFilters((current) => ({ ...current, viewMode: 'grid' }))}
                  type="button"
                >
                  <LayoutGrid aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  aria-label={t('common.status.listView')}
                  aria-pressed={filters.viewMode === 'list'}
                  className={viewButton('list')}
                  onClick={() => setFilters((current) => ({ ...current, viewMode: 'list' }))}
                  type="button"
                >
                  <List aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {appliedFilters.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {appliedFilters.map((filter) => (
                <button
                  className="chip min-h-8 gap-1.5 py-1"
                  key={`${filter.key}-${filter.label}`}
                  onClick={() => clearFilter(filter.key)}
                  type="button"
                >
                  {filter.label}
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ))}
              <button className="text-[0.8125rem] font-semibold text-navy underline underline-offset-4" onClick={clearAllFilters} type="button">
                {clearLabel}
              </button>
            </div>
          ) : null}

          {filteredProducts.length === 0 ? (
            <div className="mt-6">{emptyState}</div>
          ) : (
            <div className={filters.viewMode === 'list' ? 'mt-4 grid gap-3' : 'catalog-product-grid mt-4'}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} layout={filters.viewMode} product={product} />
              ))}
            </div>
          )}

          {footer}
        </div>
      </div>

      <MobileFilterDrawer label={mobileFiltersLabel} onClose={() => setMobileFiltersOpen(false)} open={mobileFiltersOpen}>
        <FilterSidebar
          clearAllFilters={clearAllFilters}
          filters={filters}
          onClose={() => setMobileFiltersOpen(false)}
          optionSets={optionSets}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </>
  );
}
```

- [ ] **Step 3: Use it in `CatalogPage.tsx`**

Keep everything above `return (` unchanged, but replace the destructuring of `useCatalogFilters(...)` with `const catalog = useCatalogFilters(products, { initialBrand: brandParam || undefined, initialSearch: queryParam || undefined });` followed by `const { filters, filteredProducts, setFilters, clearAllFilters } = catalog;` (the effects use `filters` and `setFilters`). Delete the now-unused `sortOptions` constant.

Replace the returned JSX with:

```tsx
  return (
    <>
      <section className="catalog-shell pb-4 pt-5">
        <Breadcrumbs items={[{ label: t('common.labels.home'), to: routes.home }, { label: t('common.labels.equipment') }]} />
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)]">{t('pages.catalog.eyebrow')}</h1>
          <div className="w-full lg:max-w-md">
            <SearchBar
              buttonLabel={t('common.actions.searchCatalog')}
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={t('pages.catalog.searchPlaceholder')}
              value={filters.search}
            />
          </div>
        </div>
        <nav aria-label={t('common.labels.productGroups')} className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <Link className="chip whitespace-nowrap" key={category.slug} to={routes.category(category.slug)}>
              {category.title}
            </Link>
          ))}
        </nav>
      </section>

      <section className="catalog-shell pb-20">
        <CatalogResults
          catalog={catalog}
          clearLabel={t('common.actions.clearAll')}
          emptyState={
            <EmptyState
              actionLabel={t('common.actions.clearFilters')}
              description={t('pages.catalog.noResults.description')}
              onAction={clearAllFilters}
              secondaryActionLabel={t('common.actions.browseEquipment')}
              secondaryActionTo={routes.equipment}
              title={t('pages.catalog.noResults.title')}
            />
          }
          mobileFiltersLabel={t('pages.catalog.mobileFiltersLabel')}
          resultLabel={t('common.status.results', { count: filteredProducts.length })}
        />
      </section>
    </>
  );
```

Fix imports: add `Breadcrumbs` and `CatalogResults`; remove `Filter`, `SlidersHorizontal`, `FilterSidebar`, `MobileFilterDrawer`, `ProductCard` if unused.

- [ ] **Step 4: Use it in `CategoryPage.tsx`**

Same destructuring change (`const catalog = useCatalogFilters(...)`; keep the names the effects and chips use). Replace the returned JSX's first two `<section>`s with:

```tsx
      <section className="catalog-shell pb-4 pt-5">
        <Breadcrumbs
          items={[
            { label: t('common.labels.home'), to: routes.home },
            { label: t('common.labels.equipment'), to: routes.equipment },
            { label: category.title },
          ]}
        />
        <div className="relative mt-3 overflow-hidden rounded-lg bg-surface-dark">
          <img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" src={category.heroImage} />
          <div className="relative px-5 py-6 sm:px-7 sm:py-8">
            <h1 className="text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)] text-text-on-dark">{category.title}</h1>
            <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-text-on-dark/80">{category.shortDescription}</p>
          </div>
        </div>
        <div className="mt-4 w-full lg:max-w-md">
          {/* existing <SearchBar …/> for this category, unchanged props */}
        </div>
        {/* existing subcategory chip row and product-type chip row, unchanged logic */}
      </section>

      <section className="catalog-shell pb-12">
        <CatalogResults
          catalog={catalog}
          clearLabel={t('pages.category.clearCategoryFilters')}
          emptyState={products.length === 0 ? (/* existing emptyCategory <EmptyState/> */) : (/* existing noMatches <EmptyState/> */)}
          mobileFiltersLabel={t('pages.category.mobileFiltersLabel', { category: category.title })}
          resultLabel={t('common.status.productsInView', { count: filteredProducts.length })}
        />
      </section>
```

Move the existing `<SearchBar …>`, both chip rows, and both `<EmptyState …>` elements into the marked places verbatim (the comments above mark where; do not leave the comments in the file). In both chip rows change the active class `'border-primary bg-surface-subtle text-primary-dark'` to `'border-primary bg-brand-gold-soft text-navy'`. Delete the old `workflowNote` panel and the separate `<MobileFilterDrawer>` at the bottom (now inside `CatalogResults`).

In the final FAQ `<section>`: add `<p className="text-measure mb-6 text-[0.9375rem] text-text-muted">{category.description}</p>` as the first child of the left column; change FAQ `<article className="toolbar-panel p-4 shadow-card">` to `<article className="toolbar-panel p-4">`; in the aside delete the `<p className="kicker">…support.eyebrow…</p>` and remove `mt-2` from the next `<h2>`; change `xl:top-28` to `xl:top-[calc(var(--header-offset)+1rem)]`.

- [ ] **Step 5: Use it in `DealsPage.tsx`**

Same destructuring change. Replace the header `<section>` with the same structure as the catalog header (Breadcrumbs `[Home, t('pages.deals.eyebrow')]`, H1 `t('pages.deals.eyebrow')`, the existing deals `<SearchBar>` on the right, no note panel). Replace the results `<section>` with:

```tsx
      <section className="catalog-shell pb-20">
        <CatalogResults
          catalog={catalog}
          clearLabel={t('common.actions.clearFilters')}
          emptyState={/* existing deals noResults <EmptyState/> */}
          footer={
            <div className="mt-10 rounded-lg bg-surface-dark p-6 text-text-on-dark sm:p-8">
              <h2 className="max-w-[26ch] text-[clamp(1.375rem,1rem+0.8vw,1.75rem)] text-text-on-dark">{t('pages.deals.cta.title')}</h2>
              <p className="text-measure mt-3 text-[0.9375rem] text-text-on-dark/75">{t('pages.deals.cta.description')}</p>
            </div>
          }
          mobileFiltersLabel={t('pages.deals.mobileFiltersLabel')}
          resultLabel={t('common.status.matchingItems', { count: filteredProducts.length })}
        />
      </section>
```

Move the existing `<EmptyState>` in verbatim. Delete the bottom `<MobileFilterDrawer>`. Fix imports.

- [ ] **Step 6: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

- [ ] **Step 7: Verify catalog behavior in the browser**

- `/equipment` at 375px: breadcrumb, H1, search, chip row, then the toolbar and the first product card are visible without scrolling.
- `/equipment?availability=incoming&yearMin=2019`: "Incoming" radio is checked; the "Year" group is open with 2019 filled; an applied-filter chip shows and removing it updates the URL.
- At 375px open the filter drawer, pick "Available" in availability: the desktop sidebar (resize to 1440) shows the same selection — neither instance unchecks the other.
- Sort select and grid/list toggle change the URL (`sort=`, `view=list`) exactly as before.
- `/equipment/heavy-equipment`: banner with image, subcategory chips toggle, products first, overview + FAQ below.
- `/deals`: only deal/available/incoming items, CTA band below the grid.
- Sidebar at 1440px stays below the header while scrolling and scrolls internally if taller than the viewport.
- Light and dark screenshots of all three pages.

- [ ] **Step 8: Commit**

```bash
git add src/components/common/CatalogResults.tsx src/components/common/FilterSidebar.tsx src/pages/CatalogPage.tsx src/pages/CategoryPage.tsx src/pages/DealsPage.tsx
git commit -m "Shared catalog results layout; collapsible radio filters; compact page headers"
```

---

### Task 6: Product detail page

**Files:**
- Modify: `src/pages/ProductDetailPage.tsx` (render section)
- Modify: `src/components/common/ProductGallery.tsx`
- Modify: `src/components/common/ProductSpecs.tsx`

**Interfaces:**
- Consumes: `getDataPlateCells(product, 'detail', language)`, `<DataPlate variant="detail" />`, `getCompanyProfile().phone`, `--header-offset`.

- [ ] **Step 1: Restyle `ProductGallery.tsx`**

Replace the wrapper `"mx-auto max-w-[52rem] 3xl:max-w-none"` with `"w-full"`; main image className `"min-h-[320px] rounded-none 3xl:min-h-[360px]"` → `"rounded-lg"` with `aspectRatio="video"`; thumbnails grid `"mt-4 grid gap-3 sm:grid-cols-3"` → `"mt-3 grid grid-cols-4 gap-2"`; thumbnail button base `'overflow-hidden rounded-none border transition'` → `'overflow-hidden rounded border-2 transition-colors'`, active `'border-brand-gold shadow-card'` → `'border-primary'`, inactive `'border-border'` → `'border-transparent hover:border-border'`; thumbnail `ImageWithFallback` `aspectRatio="video" className="border-0"`.

- [ ] **Step 2: Restyle `ProductSpecs.tsx`**

Delete `<p className="kicker">{t('common.labels.technicalData')}</p>`; change the header wrapper to `"border-b border-border px-4 py-3 sm:px-5"` and the `<h2>` to `className="text-[1.25rem] text-navy"`. In `src/index.css` change `.spec-table th, .spec-table td` padding `px-3 py-3` → `px-4 py-2.5`, and `.spec-table th` add `font-medium` in place of `font-semibold`.

- [ ] **Step 3: Restructure the page JSX**

In `ProductDetailPage.tsx` add imports: `Phone` from lucide, `DataPlate` from `../components/common/DataPlate`, `getDataPlateCells` from `../utils/dataPlate`, `useLanguage` from `../hooks/useLanguage`, `getCompanyProfile` from `../data/catalog`. Inside the component (after the existing early returns) add:

```tsx
  const { language } = useLanguage();
  const companyProfile = getCompanyProfile();
  const plateCells = getDataPlateCells(product, 'detail', language);
  const isSold = product.availability === 'sold';
```

(`useLanguage` is a hook — place it at the top of the component with the other hooks, before any early `return`; keep `plateCells`/`isSold` after the product null-check.)

Prepend the non-plate key facts to the spec table so nothing is lost:

```tsx
  const specRows = [
    { label: t('pages.productDetail.keyFacts.condition'), value: t(`common.status.${product.condition}`) },
    { label: t('common.labels.category'), value: `${taxonomy.subcategoryTitle} / ${taxonomy.productTypeTitle}` },
    { label: t('pages.productDetail.keyFacts.serialStock'), value: product.serialNumber ?? t('common.status.confirmedDuringInquiry') },
    ...technicalSpecs,
  ];
```

Delete `keyFacts` and `usageFact` if now unused (typecheck will flag them).

Replace the first two `<section>`s (breadcrumbs + the three-column gallery/panel/aside grid) with:

```tsx
      <section className="catalog-shell pt-5">
        <Breadcrumbs
          items={[
            { label: t('common.labels.home'), to: routes.home },
            { label: t('common.labels.equipment'), to: routes.equipment },
            { label: taxonomy.categoryTitle, to: routes.category(taxonomy.categorySlug) },
            { label: product.title },
          ]}
        />
      </section>

      <section className="catalog-shell pb-10 pt-4">
        <div className="grid gap-8 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <aside className="xl:sticky xl:top-[calc(var(--header-offset)+1rem)] xl:col-span-5 xl:self-start">
            <p className="text-[0.875rem] text-text-muted">
              {product.brand} {product.model}
            </p>
            <h1 className="mt-1 text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)]">{product.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone={availabilityTone(product.availability)}>{getProductAvailabilityLabel(product.availability)}</Badge>
              {product.deal && !isSold ? <Badge tone="primary">{t('common.status.deal')}</Badge> : null}
              <span className="text-[0.8125rem] text-text-muted">SKU {product.sku}</span>
            </div>
            <p className="mt-4 font-display text-[1.75rem] font-semibold tabular-nums text-navy">{formatProductPrice(product)}</p>
            <div className="mt-4">
              <DataPlate cells={plateCells} variant="detail" />
            </div>
            <p className="text-measure mt-4 text-[0.9375rem] text-text-muted">{product.excerpt}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <InquiryButton disabled={isSold} fullWidth productId={product.id} />
              <Button className="w-full" to={routes.requestQuote} variant="secondary">
                {t('common.actions.requestQuote')}
              </Button>
            </div>
            {companyProfile.phone ? (
              <a
                className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy underline-offset-4 hover:underline"
                href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {companyProfile.phone}
              </a>
            ) : null}
            <p className="mt-3 text-[0.8125rem] text-text-muted">{t('pages.productDetail.inquiryActionsNote')}</p>
          </aside>
        </div>
      </section>

      <section className="catalog-shell pb-10">
        <div className="grid gap-8 xl:grid-cols-12">
          <div className="space-y-8 xl:col-span-7">
            <div>
              <h2 className="text-[1.25rem]">{t('pages.productDetail.inspectionHighlightsTitle')}</h2>
              <p className="text-measure mt-3 text-[0.9375rem] text-text-muted">{product.description}</p>
              <ul className="mt-4 grid gap-2">
                {product.keyFeatures.map((feature) => (
                  <li className="flex items-start gap-3 text-[0.9375rem] text-text" key={feature}>
                    <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <ProductSpecs specs={specRows} />
          </div>
          <div className="space-y-6 xl:col-span-5">
            {/* existing inspection-notes, documents, and delivery/contract panels, restyled per Step 4 */}
          </div>
        </div>
      </section>
```

Move the three existing panels (inspection notes, documents, delivery/contract) into the marked right column verbatim, then remove the comment.

- [ ] **Step 4: Restyle the three right-column panels and the tail of the page**

In the three moved panels: `surface-panel p-5` stays; each inner item `"border border-border bg-surface-subtle p-4 text-sm text-text-muted"` → `"rounded-md bg-surface-subtle p-3 text-sm text-text-muted"`; document link items the same plus keep `transition hover:border-primary` → `transition-colors hover:bg-surface-card`; `<h2 className="text-[1.3rem] text-navy">` → `<h2 className="text-[1.125rem]">`.

Related products: change `relatedProducts.map` to `relatedProducts.slice(0, 4).map`, and `className="product-grid mt-6"` → `className="product-grid mt-4"`; `<h2 className="text-[clamp(1.6rem,1.2rem+0.9vw,2rem)] text-navy">` → `<h2 className="text-[clamp(1.5rem,1.1rem+1.1vw,2rem)]">`.

Mobile sticky bar: delete `<p className="text-xs uppercase tracking-[0.12em] text-text-muted">{t('common.labels.inquiryAction')}</p>`; change the bar `bg-surface-page/95` → `bg-surface-card/95`; the price `<p>` add `tabular-nums`; change the sold case to show `t('common.status.sold')` instead of the add button:

```tsx
          {isSold ? (
            <span className="text-sm font-medium text-status-sold">{t('common.status.sold')}</span>
          ) : (
            <InquiryButton compact productId={product.id} />
          )}
```

Remove now-unused imports (`MapPin`, `Wrench`, `FileText`, `conditionTone` helper) as flagged by lint/typecheck.

- [ ] **Step 5: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

- [ ] **Step 6: Verify in the browser**

Open `/equipment/heavy-equipment/caterpillar-320d-tracked-excavator` (or any product from `/equipment`):
- 1440px: gallery left (7/12), info panel right, panel sticks while scrolling the specs; data plate 3 columns; H1 ≤ 2 lines.
- 375px: gallery, then info; data plate 2 columns; sticky bottom bar with price + Add.
- Spec table still contains condition, category, serial, and every former technical spec.
- Thumbnails switch the main image; keyboard Tab reaches them.
- Light + dark screenshots.

- [ ] **Step 7: Commit**

```bash
git add src/pages/ProductDetailPage.tsx src/components/common/ProductGallery.tsx src/components/common/ProductSpecs.tsx src/index.css
git commit -m "Product page: gallery + sticky info panel with data plate"
```

---

### Task 7: Homepage

**Files:**
- Modify: `src/data/homepage.ts`
- Create: `tests/homepage-data.test.ts`
- Modify: `src/components/magicpath/general-homepage/GeneralHomepageHero.tsx` (rewrite)
- Modify: `src/components/magicpath/general-homepage/GeneralHomepageLanding.tsx` (rewrite)
- Modify: `src/components/magicpath/general-homepage/HomepageCategoryPreviewCard.tsx` (rewrite as tile)
- Modify: `src/components/magicpath/general-homepage/index.ts`
- Delete: `HomepageHeroSpotlightPanel.tsx`, `HomepageSupportLinkCard.tsx`, `HomepageStockPreviewCard.tsx`, `HomepageTrustStrip.tsx` (same folder)
- Modify: `src/pages/HomePage.tsx` only if prop names change (they do not in this plan)

**Interfaces:**
- Consumes: `ProductCard`, `getBrands()`, `getHowItWorksSteps()`, `getCompanyProfile()`, `SiteSearch`.
- Produces: `getHomepageCategoryPreviews()` returns all 10 categories in homepage order; `getHomepageStockPreviewProducts()` returns up to 4.

- [ ] **Step 1: Write the failing homepage data test**

Create `tests/homepage-data.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getCategories } from '../src/data/catalog';
import { getHomepageCategoryPreviews, getHomepageStockPreviewProducts } from '../src/data/homepage';

describe('homepage data', () => {
  it('shows every top-level category, led by the six priority ones', () => {
    const previews = getHomepageCategoryPreviews();
    expect(previews).toHaveLength(getCategories().length);
    expect(previews.slice(0, 6).map((preview) => preview.category.slug)).toEqual([
      'heavy-equipment',
      'lifting-access',
      'trucks-transport',
      'site-power-support',
      'attachments-spare-parts',
      'tools-workshop',
    ]);
  });

  it('previews up to four in-stock or incoming products', () => {
    const products = getHomepageStockPreviewProducts();
    expect(products.length).toBeLessThanOrEqual(4);
    expect(products.every((product) => product.availability === 'available' || product.availability === 'incoming')).toBe(true);
  });

  it('returns exactly four when enough stock exists', () => {
    expect(getHomepageStockPreviewProducts()).toHaveLength(4);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- tests/homepage-data.test.ts`
Expected: FAIL — length 6 vs 10, and 3 vs 4.

- [ ] **Step 3: Update `src/data/homepage.ts`**

Replace `getHomepageCategoryPreviews` so it no longer drops categories outside the priority list; unknown slugs sort after the priority six in their original order:

```ts
function homepageRank(slug: string) {
  const index = HOMEPAGE_CATEGORY_ORDER.indexOf(slug as (typeof HOMEPAGE_CATEGORY_ORDER)[number]);
  return index === -1 ? HOMEPAGE_CATEGORY_ORDER.length : index;
}

export function getHomepageCategoryPreviews(): HomepageCategoryPreview[] {
  const products = getProducts();

  return [...getCategories()]
    .map((category, originalIndex) => ({ category, originalIndex }))
    .sort((first, second) =>
      homepageRank(first.category.slug) - homepageRank(second.category.slug) || first.originalIndex - second.originalIndex,
    )
    .map(({ category }) => ({
      category,
      productCount: products.filter((product) => product.categorySlug === category.slug).length,
      productTypeTitles: category.subcategories
        .flatMap((subcategory) => subcategory.productTypes.map((productType) => productType.title))
        .slice(0, 3),
    }));
}
```

Delete the now-unused `sortCategoriesByHomepageOrder`. In `getHomepageStockPreviewProducts` change `.slice(0, 3)` to `.slice(0, 4)`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS. If "returns exactly four" fails because the catalog has fewer than four available/incoming products, delete that single test and note it in the commit message — do not change product data.

- [ ] **Step 5: Rewrite the hero**

Replace `GeneralHomepageHero.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import { getCompanyProfile, type ProductImage } from '../../../data/catalog';
import { SiteSearch } from '../../search/SiteSearch';

interface GeneralHomepageHeroProps {
  heroImage?: ProductImage;
  quickSearches: string[];
  search: string;
  onQuickSearch: (term: string) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function GeneralHomepageHero({
  heroImage,
  quickSearches,
  search,
  onQuickSearch,
  onSearchChange,
  onSearchSubmit,
}: GeneralHomepageHeroProps) {
  const { t } = useTranslation();
  const companyProfile = getCompanyProfile();

  return (
    <section className="bg-surface-dark text-text-on-dark">
      <div className="wide-shell grid gap-8 py-10 lg:py-14 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-center">
        <div className="max-w-[44rem]">
          <h1 className="text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-[1.05] text-text-on-dark">{t('pages.home.hero.title')}</h1>
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] text-text-on-dark/75">{companyProfile.tagline}</p>
          <div className="mt-6">
            <SiteSearch
              buttonLabel={t('common.actions.search')}
              onChange={onSearchChange}
              onSubmitQuery={() => onSearchSubmit()}
              placeholder={t('pages.home.hero.searchPlaceholder')}
              value={search}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickSearches.slice(0, 4).map((term) => (
              <button
                className="inline-flex min-h-8 items-center rounded border border-text-on-dark/20 px-3 text-[0.8125rem] font-medium text-text-on-dark/85 transition-colors hover:border-accent hover:text-text-on-dark"
                key={term}
                onClick={() => onQuickSearch(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        {heroImage ? (
          <img alt={heroImage.alt} className="hidden aspect-[4/3] w-full rounded-lg object-cover xl:block" src={heroImage.src} />
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Rewrite the category tile**

Replace `HomepageCategoryPreviewCard.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { ImageWithFallback } from '../../common/ImageWithFallback';

export function HomepageCategoryPreviewCard({ preview }: { preview: HomepageCategoryPreview }) {
  const { t } = useTranslation();

  return (
    <Link className="group relative block overflow-hidden rounded-md bg-surface-dark" to={routes.category(preview.category.slug)}>
      <ImageWithFallback alt="" aspectRatio="video" className="border-0" src={preview.category.heroImage} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 pb-3 pt-8">
        <p className="font-display text-[1rem] font-semibold leading-tight text-white group-hover:underline">{preview.category.title}</p>
        <p className="mt-0.5 text-[0.8125rem] text-white/80">{t('common.status.listings', { count: preview.productCount })}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 7: Rewrite the landing**

Replace `GeneralHomepageLanding.tsx`:

```tsx
import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getBrands, getCompanyProfile, getHowItWorksSteps, type Product } from '../../../data/catalog';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { Button } from '../../common/Button';
import { ProductCard } from '../../common/ProductCard';
import { SectionHeader } from '../../common/SectionHeader';
import { GeneralHomepageHero } from './GeneralHomepageHero';
import { HomepageCategoryPreviewCard } from './HomepageCategoryPreviewCard';
import { HomepageSection } from './HomepageSection';

interface GeneralHomepageLandingProps {
  categoryPreviews: HomepageCategoryPreview[];
  previewProducts: Product[];
  quickSearches: string[];
  search: string;
  onQuickSearch: (term: string) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function GeneralHomepageLanding({
  categoryPreviews,
  previewProducts,
  quickSearches,
  search,
  onQuickSearch,
  onSearchChange,
  onSearchSubmit,
}: GeneralHomepageLandingProps) {
  const { t } = useTranslation();
  const steps = getHowItWorksSteps().slice(0, 3);
  const brands = getBrands().filter((brand) => brand.productCount > 0);
  const companyProfile = getCompanyProfile();

  return (
    <>
      <GeneralHomepageHero
        heroImage={previewProducts[0]?.images[0]}
        onQuickSearch={onQuickSearch}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        quickSearches={quickSearches}
        search={search}
      />

      <HomepageSection id="homepage-categories">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title={t('pages.home.categories.title')} />
          <Button size="sm" to={routes.equipment} variant="secondary">
            {t('common.actions.browseCatalog')}
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {categoryPreviews.map((preview) => (
            <HomepageCategoryPreviewCard key={preview.category.slug} preview={preview} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection className="border-y border-border bg-surface-card">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title={t('pages.home.inventory.title')} />
          <Button size="sm" to={routes.deals} variant="secondary">
            {t('common.actions.viewAvailableNow')}
          </Button>
        </div>
        <div className="product-grid mt-6">
          {previewProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection>
        <SectionHeader title={t('pages.howItWorks.eyebrow')} />
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li className="border-t-2 border-primary pt-4" key={step.step}>
              <p className="font-display text-[1.75rem] font-semibold tabular-nums text-primary-dark">{index + 1}</p>
              <h3 className="mt-1 text-[1.125rem]">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </HomepageSection>

      {brands.length > 0 ? (
        <HomepageSection className="border-t border-border" shellClassName="py-8">
          <h2 className="text-[1.125rem]">{t('layout.megaMenu.links.brands')}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link className="chip" to={routes.equipmentWithBrand(brand.name)}>
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </HomepageSection>
      ) : null}

      <section className="bg-surface-dark text-text-on-dark">
        <div className="wide-shell flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-[28ch] text-[clamp(1.5rem,1.1rem+1.1vw,2rem)] text-text-on-dark">{t('pages.home.cta.title')}</h2>
            <p className="text-measure mt-2 text-[0.9375rem] text-text-on-dark/75">{t('pages.home.cta.description')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Button>
            {companyProfile.phone ? (
              <a
                className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-text-on-dark hover:underline"
                href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {companyProfile.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
```

Check the step `key`: `step.step` is `'01'`, `'02'`, `'03'` (unique). The `1/2/3` numbering is justified — it is a real sequence.

The footer keeps its `mt-16`, so a strip of page background separates this closing band from the dark footer. If the two still read as one block in Step 9, add `border-t border-text-on-dark/10` to the `<footer>` className and include `Footer.tsx` in this task's commit.

- [ ] **Step 8: Update the barrel and delete unused files**

Replace `index.ts` with:

```ts
export { HomepageCategoryPreviewCard } from './HomepageCategoryPreviewCard';
export { GeneralHomepageHero } from './GeneralHomepageHero';
export { GeneralHomepageLanding } from './GeneralHomepageLanding';
export { HomepageSection } from './HomepageSection';
```

```bash
git rm src/components/magicpath/general-homepage/HomepageHeroSpotlightPanel.tsx src/components/magicpath/general-homepage/HomepageSupportLinkCard.tsx src/components/magicpath/general-homepage/HomepageStockPreviewCard.tsx src/components/magicpath/general-homepage/HomepageTrustStrip.tsx
grep -rn "HomepageHeroSpotlightPanel\|HomepageSupportLinkCard\|HomepageStockPreviewCard\|HomepageTrustStrip" src
```
Expected: grep prints nothing.

- [ ] **Step 9: Run all validations and check visually**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

Screenshot `/` at 1440, 768, 375, light and dark, in Albanian and English:
- Hero: headline ≤ 2 lines at 1440px, ≤ 4 lines at 375px; search usable; 4 quick chips; stock photo on the right at 1440 only.
- 10 category tiles (5×2 at 1440, 2 columns at 375), titles legible on every image.
- 4 product cards; 3 numbered steps; brand chips link to `/equipment?brand=…`; closing band with request-quote and phone.

- [ ] **Step 10: Commit**

```bash
git add src/data/homepage.ts tests/homepage-data.test.ts src/components/magicpath/general-homepage
git commit -m "Search-first homepage: category tiles, stock cards, steps, brands"
```

---

### Task 8: Remaining pages sweep and design-rule guard

**Files:**
- Create: `tests/design-rules.test.ts`
- Modify (as flagged by the test): `src/pages/AboutPage.tsx`, `BrandsPage.tsx`, `ContactPage.tsx`, `DeliveryInspectionPage.tsx`, `FAQPage.tsx`, `FinancingContractsPage.tsx`, `HowItWorksPage.tsx`, `InquiryListPage.tsx`, `InstitutionsCleaningPage.tsx`, `NotFoundPage.tsx`, `PrivacyPage.tsx`, `RequestQuotePage.tsx`, `SearchPage.tsx`, `TechnicalLibraryPage.tsx`, `TermsPage.tsx`; `src/components/common/BrandCard.tsx`, `CategoryCard.tsx`, `EmptyState.tsx`, `InquirySummary.tsx`, `MobileFilterDrawer.tsx`, `StatCard.tsx`; `src/components/forms/ContactForm.tsx`, `RequestQuoteForm.tsx`; `src/components/search/SiteSearch.tsx`, `SearchResultsList.tsx`
- Modify: `src/index.css` (delete `.kicker`/`.eyebrow` once unused)
- Modify: `CLAUDE.md` (add `npm test` to quality rules)

**Interfaces:**
- Consumes: all foundation classes from Task 1.

- [ ] **Step 1: Write the failing design-rule test**

Create `tests/design-rules.test.ts`:

```ts
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
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- tests/design-rules.test.ts`
Expected: FAIL, listing the offending files for each rule.

- [ ] **Step 3: Fix every listed file with these rules**

Apply to each file the test lists, and nothing else in that file:
1. A `<p className="kicker…">` / `className="eyebrow…"` element **directly above a heading** → delete the element and remove the `mt-*` class from the heading that followed it.
2. A kicker/eyebrow element that is the **only title** of its block (no heading follows) → change it to `<p className="text-[0.9375rem] font-semibold text-navy">` (or `text-text-on-dark` on dark surfaces), keeping its text.
3. Remove `uppercase` and any `tracking-[0.06em]`…`tracking-[0.14em]` from class strings; if the text was a small label, also set `text-[0.8125rem]`.
4. `rounded-none` → `rounded` on inputs/buttons, `rounded-md` on cards, `rounded-lg` on panels. On an `ImageWithFallback` inside a card, just delete `rounded-none` (the card's `overflow-hidden` clips it).
5. On panels (`surface-panel`, `toolbar-panel`, cards) remove `shadow-card`.
6. Sticky offsets written as `top-[8.65rem]`, `top-[9rem]`, `top-28` → `top-[calc(var(--header-offset)+1rem)]`.

Keep all text content, translation keys, props, handlers, and structure otherwise unchanged. After each few files run `npm test -- tests/design-rules.test.ts` to watch the list shrink.

- [ ] **Step 4: Remove the dead label classes**

When `grep -rn "kicker\|eyebrow" src --include=*.tsx | grep className` prints nothing, delete the `.kicker, .eyebrow { … }` rule from `src/index.css`.

- [ ] **Step 5: Add `npm test` to the project quality rules**

In `CLAUDE.md` under "Quality rules", add `- \`npm test\`` as the first item.

- [ ] **Step 6: Run all validations**

Run: `npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass.

- [ ] **Step 7: Visual pass on every remaining route**

Screenshot at 1440 and 375, light and dark: `/inquiry-list` (with 2 items added), `/request-quote`, `/contact`, `/about`, `/faq`, `/how-it-works`, `/financing-contracts`, `/delivery-inspection`, `/technical-library`, `/services/institutions-cleaning`, `/brands`, `/search?q=jcb`, `/privacy`, `/terms`, `/does-not-exist`. Confirm no uppercase labels, no heavy shadowed boxes, forms still submit-validate as before (submit empty contact form → field errors appear).
Keyboard: open and close the inquiry summary, mobile menu, and filter drawer with keyboard only; focus returns to the trigger.

- [ ] **Step 8: Commit**

```bash
git add tests/design-rules.test.ts src CLAUDE.md
git commit -m "Apply redesign to remaining pages; add design-rule guard test"
```

---

### Task 9: Whole-branch verification

**Files:** none (fix-ups only if checks fail).

- [ ] **Step 1: Clean validation run**

Run: `npm ci && npm test && npm run lint && npm run typecheck && npm run audit:i18n && npm run check:images && npm run build`
Expected: all pass; build prints no chunk-size warning.

- [ ] **Step 2: Acceptance criteria walk-through**

Against the spec's acceptance list:
- No uppercase eyebrow labels on any route → covered by `tests/design-rules.test.ts`.
- Primary buttons pass AA in both themes → `tests/design-tokens.test.ts`.
- Desktop header is two rows, no helper text → screenshot `/` at 1440.
- Catalog on mobile shows the first product in the first viewport → screenshot `/equipment` at 375×812.
- Cards: ≤ 2 pills, data plate, price, one action, whole card clickable → Task 4 Step 6 checks repeated on `/deals`.
- Behavior unchanged: filters + URL params, search, inquiry add/remove, language switch, theme switch, dialog focus → click through once each.

- [ ] **Step 3: Report**

Summarize for the owner: what changed per area, before/after screenshots of `/`, `/equipment`, one product page (desktop + mobile), any deviations from the spec and why.
