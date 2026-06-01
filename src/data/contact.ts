import type { SalesContact } from './types';
import { localizeCatalogValue } from '../i18n/catalogLocale';

/*
  Contact maintenance notes
  - Update salesContacts when account managers or territories change.
  - These contacts are used for visible sales information, not checkout.
  - Keep phone and email in a plain business format for easy reuse later in a CMS.
*/

const baseSalesContacts: SalesContact[] = [
  {
    name: 'Arben Kola',
    title: 'Machinery Sales Manager',
    email: 'machinery@rafincompany.com',
    phone: '+355 69 778 2100',
    preferredMethod: 'phone',
    markets: ['Earthmoving', 'Road Equipment', 'Transport'],
    note: 'Primary contact for heavy machinery, inspection scheduling, and company quote negotiation.',
  },
  {
    name: 'Elira Dervishi',
    title: 'Parts and Attachments Coordinator',
    email: 'parts@rafincompany.com',
    phone: '+355 69 778 2110',
    preferredMethod: 'email',
    markets: ['Attachments', 'Spare Parts', 'Small Equipment'],
    note: 'Coordinates stock confirmations, compatibility checks, and combined machine-plus-parts inquiries.',
  },
  {
    name: 'Gentian Hoxha',
    title: 'Contracts and Delivery Support',
    email: 'contracts@rafincompany.com',
    phone: '+355 69 778 2120',
    preferredMethod: 'whatsapp',
    markets: ['Contracts', 'Delivery', 'Export Coordination'],
    note: 'Handles commercial handover, delivery planning, and contract document follow-up after buyer approval.',
  },
];

export function getSalesContacts(): SalesContact[] {
  return baseSalesContacts.map((contact, index) => ({
    ...contact,
    title: localizeCatalogValue(`salesContacts.${index}.title`, contact.title),
    markets: localizeCatalogValue(`salesContacts.${index}.markets`, contact.markets),
    note: localizeCatalogValue(`salesContacts.${index}.note`, contact.note),
  }));
}
