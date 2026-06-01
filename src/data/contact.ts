import type { SalesContact } from './types';
import { localizeCatalogValue } from '../i18n/catalogLocale';

/*
  Contact maintenance notes
  - Update salesContacts when account managers or territories change.
  - These contacts are used for visible sales information, not checkout.
  - Keep phone and email in a plain business format for easy reuse later in a CMS.
*/

const baseSalesContacts: SalesContact[] = [];

export function getSalesContacts(): SalesContact[] {
  return baseSalesContacts.map((contact, index) => ({
    ...contact,
    title: localizeCatalogValue(`salesContacts.${index}.title`, contact.title),
    markets: localizeCatalogValue(`salesContacts.${index}.markets`, contact.markets),
    note: localizeCatalogValue(`salesContacts.${index}.note`, contact.note),
  }));
}
