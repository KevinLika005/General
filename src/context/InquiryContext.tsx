import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { InquiryItem } from '../data/catalog';

interface InquiryContextValue {
  items: InquiryItem[];
  itemCount: number;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearItems: () => void;
  isInInquiryList: (productId: string) => boolean;
}

export const InquiryContext = createContext<InquiryContextValue | undefined>(undefined);

const STORAGE_KEY = 'rafin-machinery-inquiry-list';

function readStoredItems() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredItems(items: InquiryItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage failures so restricted browsers cannot blank the app.
  }
}

function clearStoredItems() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures so restricted browsers cannot blank the app.
  }
}

function getInitialItems() {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = readStoredItems();

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as InquiryItem[];
  } catch {
    clearStoredItems();
    return [];
  }
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>(getInitialItems);

  useEffect(() => {
    writeStoredItems(items);
  }, [items]);

  const value = useMemo<InquiryContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (productId: string) => {
        setItems((currentItems) => {
          const existing = currentItems.find((item) => item.productId === productId);

          if (existing) {
            return currentItems.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [...currentItems, { productId, quantity: 1, notes: '' }];
        });
      },
      removeItem: (productId: string) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.productId !== productId),
        );
      },
      updateQuantity: (productId: string, quantity: number) => {
        const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;

        setItems((currentItems) =>
          currentItems
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: safeQuantity }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      updateNotes: (productId: string, notes: string) => {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.productId === productId ? { ...item, notes } : item,
          ),
        );
      },
      clearItems: () => setItems([]),
      isInInquiryList: (productId: string) =>
        items.some((item) => item.productId === productId),
    }),
    [items],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}
