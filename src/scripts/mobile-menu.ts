/**
 * Mobile Menu Handler
 * Vanilla JS with TypeScript, CSP-strict compliant
 * No inline scripts, event delegation pattern
 */

interface MobileMenuElements {
  toggle: HTMLElement | null;
  menu: HTMLElement | null;
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu(): void {
  const elements: MobileMenuElements = {
    toggle: document.querySelector('[data-mobile-menu-toggle]'),
    menu: document.querySelector('[data-mobile-menu]'),
  };

  if (!elements.toggle || !elements.menu) {
    return;
  }

  // Toggle menu on button click
  elements.toggle.addEventListener('click', () => {
    const isExpanded = elements.toggle!.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded, elements);
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.toggle!.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false, elements);
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (
      elements.toggle!.getAttribute('aria-expanded') === 'true' &&
      !elements.toggle!.contains(target) &&
      !elements.menu!.contains(target)
    ) {
      toggleMenu(false, elements);
    }
  });
}

/**
 * Toggle menu open/close state
 */
function toggleMenu(open: boolean, elements: MobileMenuElements): void {
  if (!elements.toggle || !elements.menu) return;

  elements.toggle.setAttribute('aria-expanded', String(open));
  elements.toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');

  if (open) {
    elements.menu.setAttribute('data-mobile-menu-open', '');
  } else {
    elements.menu.removeAttribute('data-mobile-menu-open');
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}

// Export for testing (optional)
export { initMobileMenu };
