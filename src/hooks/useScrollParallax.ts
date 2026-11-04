import { useEffect } from 'react';

const TARGETS = ['.panel', '.project-card', '.approach-step', '.how-step', '.photo-frame', '.testimonial-placeholder']
  .map((selector) => `.page-section:not(.home-section) ${selector}`)
  .join(', ');
const STATIC_LAYOUT = '(max-width: 760px), (pointer: coarse), (prefers-reduced-motion: reduce)';
const MAX_OFFSET = 18;
const VAR = '--scroll-parallax-y';

/** Nudges cards vertically as they pass the middle of the viewport. */
export const useScrollParallax = () => {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    const staticLayout = window.matchMedia(STATIC_LAYOUT);
    let frame = 0;

    const reset = () => cards.forEach((card) => card.style.removeProperty(VAR));

    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const offsets = cards.map((card, index) => {
        const { top, height } = card.getBoundingClientRect();
        const depth = 0.025 + (index % 3) * 0.01;
        return Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, (middle - (top + height / 2)) * depth));
      });
      cards.forEach((card, index) => card.style.setProperty(VAR, `${offsets[index].toFixed(2)}px`));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const stop = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const apply = () => {
      stop();
      if (staticLayout.matches) return reset();
      schedule();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    };

    apply();
    staticLayout.addEventListener('change', apply);

    return () => {
      staticLayout.removeEventListener('change', apply);
      stop();
      reset();
    };
  }, []);
};
