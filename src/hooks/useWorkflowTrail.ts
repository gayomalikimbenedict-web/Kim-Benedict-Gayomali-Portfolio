import { RefObject, useEffect } from 'react';

const EASING = 0.1;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Moves a glowing dot along the background workflow routes as the page scrolls.
 * The route behind the dot lights up and each step node turns on when it is reached.
 */
export const useWorkflowTrail = (svgRef: RefObject<SVGSVGElement>) => {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    const base = Array.from(svg.querySelectorAll<SVGPathElement>('.flow-base'));
    const lit = Array.from(svg.querySelectorAll<SVGPathElement>('.flow-lit'));
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>('.flow-node'));
    const dot = svg.querySelector<SVGCircleElement>('.flow-dot');
    const lengths = base.map((path) => path.getTotalLength());
    const starts = lengths.reduce<number[]>((acc, length) => [...acc, acc[acc.length - 1] + length], [0]);
    const total = starts[starts.length - 1];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let target = 0;
    let current = 0;

    const render = (progress: number) => {
      const distance = progress * total;
      lit.forEach((path, i) => {
        path.style.strokeDasharray = `${clamp(distance - starts[i], 0, lengths[i])} ${lengths[i]}`;
      });
      nodes.forEach((node, i) => node.classList.toggle('is-lit', distance >= starts[i]));
      const segment = clamp(starts.findIndex((start, i) => distance < starts[i + 1] || i === lengths.length - 1), 0, lengths.length - 1);
      const point = base[segment].getPointAtLength(clamp(distance - starts[segment], 0, lengths[segment]));
      dot?.setAttribute('cx', point.x.toFixed(1));
      dot?.setAttribute('cy', point.y.toFixed(1));
    };

    const readProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
    };

    const animate = () => {
      frame = 0;
      current += (target - current) * EASING;
      if (Math.abs(target - current) < 0.0005) current = target;
      render(current);
      if (current !== target) frame = window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      target = readProgress();
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const apply = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (reducedMotion.matches) {
        target = current = readProgress();
        render(current);
        return;
      }
      target = current = readProgress();
      render(current);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    };

    apply();
    reducedMotion.addEventListener('change', apply);

    return () => {
      reducedMotion.removeEventListener('change', apply);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [svgRef]);
};
