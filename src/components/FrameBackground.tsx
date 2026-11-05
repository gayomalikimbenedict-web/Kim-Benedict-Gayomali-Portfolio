import React, { useRef } from 'react';
import { useFrameSequence } from '../hooks/useFrameSequence';
import './FrameBackground.css';

const FRAME_COUNT = 60;
const frameSrc = (index: number) => `/frames/frame_${String(index).padStart(3, '0')}.jpg`;

// Scroll-driven image sequence behind the page. Frames live in public/frames.
const FrameBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFrameSequence(canvasRef, { frameCount: FRAME_COUNT, frameSrc });
  return <canvas ref={canvasRef} className="frame-canvas" aria-hidden="true" />;
};

export default FrameBackground;
