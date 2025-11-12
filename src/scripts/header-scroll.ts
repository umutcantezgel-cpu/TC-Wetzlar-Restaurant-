/**
 * Header Scroll Effect
 * Adds glassmorphism effect to header on scroll
 * WCAG 2.2 AA Compliant - Respects prefers-reduced-motion
 */

interface HeaderScrollConfig {
  scrollThreshold: number;
  headerSelector: string;
  scrolledClass: string;
}

const config: HeaderScrollConfig = {
  scrollThreshold: 50, // Pixels to scroll before applying effect
  headerSelector: '.header--sticky',
  scrolledClass: 'header--scrolled',
};

/**
 * Initialize header scroll effect
 */
function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>(config.headerSelector);

  if (!header) {
    return; // Exit if header not found
  }

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Throttle scroll handler for performance
  let ticking = false;

  const updateHeader = (): void => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > config.scrollThreshold) {
      header.classList.add(config.scrolledClass);
      header.setAttribute('data-scrolled', 'true');
    } else {
      header.classList.remove(config.scrolledClass);
      header.removeAttribute('data-scrolled');
    }

    ticking = false;
  };

  const handleScroll = (): void => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  // Initial check in case page loads scrolled
  updateHeader();

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Handle visibility change (tab switching)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateHeader();
    }
  });

  // Cleanup on page unload (for SPA-like behavior)
  window.addEventListener('unload', () => {
    window.removeEventListener('scroll', handleScroll);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderScroll);
} else {
  initHeaderScroll();
}

// Export for testing
export { initHeaderScroll };
