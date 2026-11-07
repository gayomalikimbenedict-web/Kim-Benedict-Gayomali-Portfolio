import React from 'react';
import FrameBackground from './FrameBackground';

const PageBackground: React.FC = () => (
  <div className="page-background" aria-hidden="true">
    <FrameBackground />
    <div className="page-glow" />
  </div>
);

export default PageBackground;
