import { useEffect, useState } from 'react';

type SectionLink = { readonly label: string; readonly href: string };

/** Tracks which section sits near the top of the viewport (scroll spy). */
export const useActiveSection = (items: readonly SectionLink[]) => {
  const [active, setActive] = useState(items[0].label);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const threshold = window.innerHeight * 0.3;
      let match = items[0].label;
      let lastTop = Number.NEGATIVE_INFINITY;

      items.forEach(({ label, href }) => {
        const section = document.getElementById(href.slice(1));
        if (!section) return;
        const { top } = section.getBoundingClientRect();
        if (top <= threshold && top > lastTop) {
          lastTop = top;
          match = label;
        }
      });

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? items[items.length - 1].label : match);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  return [active, setActive] as const;
};
