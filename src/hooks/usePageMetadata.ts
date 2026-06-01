import { useEffect } from 'react';
import { siteMetadata } from '../data/catalog';

interface PageMetadataOptions {
  title: string;
  description: string;
  ogType?: 'website' | 'product';
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

export function usePageMetadata({ description, ogType = 'website', title }: PageMetadataOptions) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteMetadata.siteName,
    });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
  }, [description, ogType, title]);
}
