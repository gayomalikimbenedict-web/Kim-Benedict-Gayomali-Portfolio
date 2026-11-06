import { RefObject, useEffect } from 'react';

const EASING = 0.12;
const STATIC_LAYOUT = '(max-width: 760px), (pointer: coarse), (prefers-reduced-motion: reduce)';

interface ParallaxLayer {
  ref: RefObject<HTMLElement>;
  /** How far the layer drifts up per pixel scrolled past the container's top. */
  speed: number;
}

/** Eases each layer upward at its own speed while the page scrolls past the container. */
export const useLayerParallax = (containerRef: RefObject<HTMLElement>, layers: readonly ParallaxLayer[]) => {
  useEffect(() => {
    const container = containerRef.current;
    const items = layers.map(({ ref, speed }) => ({ element: ref.current, speed }));
    if (!container || items.some(({ element }) => !element)) return undefined;

    const staticLayout = window.matchMedia(STATIC_LAYOUT);
    let top = 0;
    let target = 0;
    let current = 0;
    let frame = 0;

    const paint = () => {
      items.forEach(({ element, speed }) => {
        if (element) element.style.transform = `translate3d(0, ${-current * speed}px, 0)`;
      });
    };

    const animate = () => {
      current += (target - current) * EASING;
      if (Math.abs(target - current) > 0.1) {
        frame = window.requestAnimationFrame(animate);
      } else {
        current = target;
        frame = 0;
      }
      paint();
    };

    const update = () => {
      target = Math.max(0, window.scrollY - top);
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const measure = () => {
      top = container.getBoundingClientRect().top + window.scrollY;
    };

    const onResize = () => {
      measure();
      update();
    };

    const detach = () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const apply = () => {
      detach();
      if (staticLayout.matches) {
        target = current = 0;
        paint();
        return;
      }
      measure();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', onResize);
      update();
    };

    apply();
    staticLayout.addEventListener('change', apply);

    return () => {
      staticLayout.removeEventListener('change', apply);
      detach();
      target = current = 0;
      paint();
    };
  }, [containerRef, layers]);
};
