import { RefObject, useEffect } from 'react';

const EASING = 0.12;
const MAX_CANVAS_WIDTH = 1600;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

interface FrameSequenceOptions {
  frameCount: number;
  frameSrc: (index: number) => string;
}

/**
 * Draws one frame of an image sequence onto a canvas, chosen by page scroll progress.
 * Frames that are missing or still loading are skipped, so the page looks normal without them.
 */
export const useFrameSequence = (
  canvasRef: RefObject<HTMLCanvasElement>,
  { frameCount, frameSrc }: FrameSequenceOptions,
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const frames: Array<HTMLImageElement | undefined> = new Array(frameCount).fill(undefined);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let animationFrame = 0;
    let target = 0;
    let current = 0;
    let lastDrawn = -1;
    let disposed = false;

    const readProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
    };

    const draw = (progress: number) => {
      let index = Math.round(clamp(progress, 0, 1) * (frameCount - 1));
      while (index >= 0 && !frames[index]) index -= 1; // nearest frame loaded so far
      const image = index >= 0 ? frames[index] : undefined;
      if (!image || index === lastDrawn) return;
      lastDrawn = index;

      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    };

    const resize = () => {
      const ratio = Math.min(1, MAX_CANVAS_WIDTH / window.innerWidth);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      lastDrawn = -1;
      draw(current);
    };

    const animate = () => {
      animationFrame = 0;
      current += (target - current) * EASING;
      if (Math.abs(target - current) < 0.0005) current = target;
      draw(current);
      if (current !== target) animationFrame = window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      target = readProgress();
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      resize();
      schedule();
    };

    const apply = () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      target = current = readProgress();
      resize();
      if (reducedMotion.matches) return; // static frame only
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', onResize);
    };

    for (let i = 0; i < frameCount; i += 1) {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (disposed) return;
        frames[i] = image;
        draw(current);
      };
      image.src = frameSrc(i);
    }

    apply();
    reducedMotion.addEventListener('change', apply);

    return () => {
      disposed = true;
      reducedMotion.removeEventListener('change', apply);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [canvasRef, frameCount, frameSrc]);
};
