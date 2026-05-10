export type ProductCondition = 'new' | 'used' | 'refurbished';
export type ProductAvailability = 'available' | 'reserved' | 'incoming' | 'sold';
export type ProductPriceMode = 'visible' | 'starting-from' | 'price-on-request';

export interface EquipmentSubcategory {
  slug: string;
  title: string;
  description: string;
}

export interface EquipmentCategory {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  accent: string;
  seoIntro: string;
  subcategories: EquipmentSubcategory[];
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDocument {
  title: string;
  href: string;
  kind?: 'brochure' | 'inspection-report' | 'service-record' | 'serial-verification' | 'certificate' | 'video';
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  title: string;
  categorySlug: string;
  subcategory: string;
  brand: string;
  model: string;
  year: number;
  condition: ProductCondition;
  availability: ProductAvailability;
  priceMode: ProductPriceMode;
  price?: number;
  priceCurrency: 'EUR';
  location: string;
  operatingHours?: number;
  mileageKm?: number;
  fuelType?: string;
  enginePower?: string;
  weight?: string;
  capacity?: string;
  transmission?: string;
  serialNumber?: string;
  images: ProductImage[];
  excerpt: string;
  description: string;
  keyFeatures: string[];
  specs: ProductSpec[];
  documents?: ProductDocument[];
  inspectionNotes?: string[];
  tags: string[];
  featured?: boolean;
  deal?: boolean;
  createdAt: string;
}

export interface BrandDefinition {
  slug: string;
  name: string;
  description: string;
  logoText: string;
  image?: string;
}

export interface Brand extends BrandDefinition {
  productCount: number;
}

export interface InquiryItem {
  productId: string;
  quantity: number;
  notes: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  categorySlug?: string;
}

export interface TrustFeature {
  title: string;
  description: string;
  icon: 'shield' | 'file' | 'truck' | 'search' | 'building' | 'wrench';
}

export interface SalesContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  preferredMethod: 'email' | 'phone' | 'whatsapp';
  markets: string[];
  note: string;
}

export interface SocialLink {
  label: 'LinkedIn' | 'Instagram' | 'Facebook';
  href: string;
}

export interface CompanyProfile {
  name: string;
  parentName: string;
  shortDescription: string;
  tagline: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  address: string;
  locationLabel: string;
  hours: string;
  heroHeadline: string;
  heroSubheadline: string;
  topUtilityNote: string;
  socialLinks: SocialLink[];
}

export interface SiteMetadata {
  siteName: string;
  title: string;
  description: string;
  ogType: 'website';
  themeColor: string;
}

