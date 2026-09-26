import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('aria-hidden'),
  );
}

interface UseDialogSurfaceOptions {
  lockScroll?: boolean;
  onClose: () => void;
  open: boolean;
  panelRef: RefObject<HTMLElement>;
}

export function useDialogSurface({
  lockScroll = true,
  onClose,
  open,
  panelRef,
}: UseDialogSurfaceOptions) {
  useEffect(() => {
    if (!open || typeof document === 'undefined') {
      return;
    }

    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;

    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    const frameId = window.requestAnimationFrame(() => {
      const firstFocusable = getFocusableElements(panel)[0];
      (firstFocusable ?? panel).focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(panel);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstFocusable || activeElement === panel) {
          event.preventDefault();
          lastFocusable.focus();
        }

        return;
      }

      if (activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener('keydown', handleKeyDown);

      if (lockScroll) {
        document.body.style.overflow = previousOverflow;
      }

      previouslyFocused?.focus();
    };
  }, [lockScroll, onClose, open, panelRef]);
}
