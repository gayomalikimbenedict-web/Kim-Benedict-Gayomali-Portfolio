import { useEffect } from 'react';

const EASING = 0.12;

/** Slowly drifts the ambient background as the page scrolls. */
export const useBackgroundDrift = () => {
  useEffect(() => {
    const background = document.querySelector<HTMLElement>('.page-background');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let target = window.scrollY;
    let current = target;

    const reset = () => {
      background?.style.removeProperty('--background-shift-x');
      background?.style.removeProperty('--background-shift-y');
    };

    const animate = () => {
      frame = 0;
      current += (target - current) * EASING;
      const phase = current * 0.0015;
      background?.style.setProperty('--background-shift-x', `${(Math.sin(phase) * 14).toFixed(2)}px`);
      background?.style.setProperty('--background-shift-y', `${(Math.cos(phase) * 22).toFixed(2)}px`);
      if (Math.abs(target - current) > 0.1) frame = window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      target = window.scrollY;
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const apply = () => {
      window.removeEventListener('scroll', schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (reducedMotion.matches) return reset();
      current = target = window.scrollY;
      schedule();
      window.addEventListener('scroll', schedule, { passive: true });
    };

    apply();
    reducedMotion.addEventListener('change', apply);

    return () => {
      reducedMotion.removeEventListener('change', apply);
      window.removeEventListener('scroll', schedule);
      window.cancelAnimationFrame(frame);
      reset();
    };
  }, []);
};
