/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getSiteUrlProblem } from './src/seo/siteUrl';

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    const problem = getSiteUrlProblem(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL);

    // Canonicals, sitemap and structured data are baked in at build time, so a production build
    // with a missing or placeholder domain would ship wrong URLs to search engines.
    if (problem && process.env.ALLOW_PLACEHOLDER_SITE_URL !== '1') {
      throw new Error(
        `\n\nRefusing to build: ${problem}.\n` +
          'Set the real production origin in .env.production.local (VITE_SITE_URL=https://<domain>),\n' +
          'or run `npm run build:local` to allow a placeholder domain for local testing only.\n',
      );
    }

    if (problem) {
      console.warn(`\n[site-url] ${problem}. Local test build only: do not deploy this dist/.\n`);
    }
  }

  return {
    plugins: [react()],
    test: {
      setupFiles: ['./tests/setup.ts'],
    },
  };
});
