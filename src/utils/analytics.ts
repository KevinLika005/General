export type LeadEvent = 'inquiry_add' | 'inquiry_remove' | 'contact_submit' | 'quote_submit';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  umami?: { track: (event: string, data?: Record<string, string | number>) => void };
};

// Provider-agnostic: no-op until one analytics script (GA4/GTM via dataLayer, Plausible or Umami)
// is added to index.html. See docs/seo-plan.md.
// Never pass personal data (names, emails, phones, message text) as params.
export function trackEvent(event: LeadEvent, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const analytics = window as AnalyticsWindow;
  analytics.dataLayer?.push({ event, ...params });
  analytics.plausible?.(event, { props: params });
  analytics.umami?.track(event, params);
}
