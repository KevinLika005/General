# General Trading Setup

Project: General Trading — B2B inquiry-commerce catalog.
No checkout, no payments, no live pricing engine.
Stack: Vite 5, React 18, TypeScript, Tailwind 3, React Router 7, i18next.
Repo: ~/Documents/General

## Data rules
- Catalog data lives in `src/data/*.ts`.
- For product/category/brand edits, first read `INVENTORY_GUIDE.md`.
- Do not invent products, brands, contacts, or specs.
- Preserve TypeScript types.
- Keep `sq` and `en` localization complete.
- Do not change unrelated page logic when editing data.

## Safety rules
- Never print or commit secrets.
- Never commit `.env`, `server/mail/config.local.php`, or local credentials.
- Do not add a database/CMS unless explicitly requested.

## Quality rules
Before saying a task is done, run:
- `npm run lint`
- `npm run typecheck`
- `npm run audit:i18n`
- `npm run build`

## Known blockers
- `VITE_MAIL_ENDPOINT` + PHP mail pipeline not fully turnkey.
- `src/data/contact.ts` missing real sales contacts.
- `npm run check:images` fails.
- Dark/light theme not fully QA'd.
- Redesign plan exists but is not fully executed.
