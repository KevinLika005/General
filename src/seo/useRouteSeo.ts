import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getHeadTags, getPageSeo } from './pageSeo';

function upsert(selector: string, create: () => HTMLElement) {
  return document.head.querySelector<HTMLElement>(selector) ?? document.head.appendChild(create());
}

function removeIfPresent(selector: string) {
  document.head.querySelector(selector)?.remove();
}

export function useRouteSeo() {
  const { pathname, search } = useLocation();
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'sq';

  useEffect(() => {
    const tags = getHeadTags(getPageSeo(pathname, search), language);

    document.title = tags.title;

    tags.meta.forEach(({ content, key, value }) => {
      const element = upsert(`meta[${key}="${value}"]`, () => {
        const meta = document.createElement('meta');
        meta.setAttribute(key, value);
        return meta;
      });
      element.setAttribute('content', content);
    });

    if (tags.canonical) {
      const link = upsert('link[rel="canonical"]', () => {
        const element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        return element;
      });
      link.setAttribute('href', tags.canonical);
    } else {
      removeIfPresent('link[rel="canonical"]');
    }

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    tags.alternates.forEach(({ href, hreflang }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });

    if (tags.jsonLd) {
      const script = upsert('script#seo-jsonld', () => {
        const element = document.createElement('script');
        element.id = 'seo-jsonld';
        element.setAttribute('type', 'application/ld+json');
        return element;
      });
      script.textContent = tags.jsonLd;
    } else {
      removeIfPresent('script#seo-jsonld');
    }
  }, [language, pathname, search]);
}
