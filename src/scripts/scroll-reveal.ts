/**
 * Scroll Reveal System
 * Intersection Observer-based animation system for revealing elements on scroll
 * WCAG 2.2 AA Compliant - Respects prefers-reduced-motion
 */

interface RevealConfig {
  threshold: number;
  rootMargin: string;
  animationClass: string;
  stagger: boolean;
  staggerDelay: number;
}

const defaultConfig: RevealConfig = {
  threshold: 0.15, // 15% of element visible
  rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
  animationClass: 'reveal--active',
  stagger: false,
  staggerDelay: 100, // ms delay between children
};

/**
 * ScrollReveal Class
 * Manages intersection observation and animation triggers
 */
class ScrollReveal {
  private observer: IntersectionObserver | null = null;
  private elements: Element[];
  private config: RevealConfig;
  private prefersReducedMotion: boolean;

  constructor(selector: string, config: Partial<RevealConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.elements = Array.from(document.querySelectorAll(selector));
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // If reduced motion preferred, reveal all immediately
    if (this.prefersReducedMotion) {
      this.revealAll();
      return;
    }

    this.initObserver();
    this.observe();
  }

  /**
   * Initialize Intersection Observer
   */
  private initObserver(): void {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: this.config.threshold,
        rootMargin: this.config.rootMargin,
      }
    );
  }

  /**
   * Handle intersection events
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (this.config.stagger) {
          this.staggerReveal(entry.target);
        } else {
          entry.target.classList.add(this.config.animationClass);
        }

        // Stop observing once revealed
        this.observer?.unobserve(entry.target);
      }
    });
  }

  /**
   * Reveal element's children with stagger delay
   */
  private staggerReveal(element: Element): void {
    const children = Array.from(element.children);

    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add(this.config.animationClass);
      }, index * this.config.staggerDelay);
    });

    // Also add class to parent
    element.classList.add(this.config.animationClass);
  }

  /**
   * Reveal all elements immediately (for reduced motion)
   */
  private revealAll(): void {
    this.elements.forEach((el) => {
      el.classList.add(this.config.animationClass);

      if (this.config.stagger) {
        const children = Array.from(el.children);
        children.forEach((child) =>
          child.classList.add(this.config.animationClass)
        );
      }
    });
  }

  /**
   * Start observing elements
   */
  private observe(): void {
    if (!this.observer) return;

    this.elements.forEach((el) => this.observer!.observe(el));
  }

  /**
   * Clean up observer
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Manually reveal an element
   */
  public reveal(element: Element): void {
    if (this.config.stagger) {
      this.staggerReveal(element);
    } else {
      element.classList.add(this.config.animationClass);
    }

    // Stop observing
    this.observer?.unobserve(element);
  }
}

/**
 * Initialize all scroll reveal instances
 */
function initScrollReveal(): void {
  // Basic fade-in reveal for sections
  const basicReveal = new ScrollReveal('[data-reveal]', {
    threshold: 0.15,
  });

  // Fade-up reveal with higher threshold
  const fadeUpReveal = new ScrollReveal('[data-reveal-up]', {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  // Staggered reveal for grids/lists
  const staggerReveal = new ScrollReveal('[data-reveal-stagger]', {
    stagger: true,
    staggerDelay: 150,
    threshold: 0.1,
  });

  // Fade-in from left
  const fadeLeftReveal = new ScrollReveal('[data-reveal-left]', {
    threshold: 0.2,
  });

  // Fade-in from right
  const fadeRightReveal = new ScrollReveal('[data-reveal-right]', {
    threshold: 0.2,
  });

  // Store instances for potential cleanup
  (window as any).__scrollRevealInstances = [
    basicReveal,
    fadeUpReveal,
    staggerReveal,
    fadeLeftReveal,
    fadeRightReveal,
  ];
}

/**
 * Cleanup function for page unload
 */
function cleanupScrollReveal(): void {
  const instances = (window as any).__scrollRevealInstances;
  if (instances) {
    instances.forEach((instance: ScrollReveal) => instance.destroy());
    delete (window as any).__scrollRevealInstances;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

// Cleanup on page unload
window.addEventListener('unload', cleanupScrollReveal);

// Export for manual usage
export { ScrollReveal, initScrollReveal, cleanupScrollReveal };
