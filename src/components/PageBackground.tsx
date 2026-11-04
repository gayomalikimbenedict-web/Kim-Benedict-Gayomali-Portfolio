import React from 'react';

// Each route is [startX, startY, midX, endY, endX]: it runs right, down, then right.
const ROUTES: ReadonlyArray<readonly [number, number, number, number, number]> = [
  [1170, 75, 1285, 170, 1385],
  [1200, 240, 1290, 325, 1380],
  [1340, 385, 1420, 500, 1500],
  [1320, 600, 1400, 705, 1485],
  [1080, 170, 1165, 240, 1245],
];

const path = ([x1, y1, x2, y2, x3]: readonly number[]) => `M${x1} ${y1}H${x2}V${y2}H${x3}`;
const corners = ([x1, y1, x2, y2, x3]: readonly number[]) => [[x1, y1], [x2, y1], [x2, y2], [x3, y2]];

const PageBackground: React.FC = () => (
  <div className="page-background" aria-hidden="true">
    <div className="page-glow" />
    <div className="page-orbit" />
    <span className="page-particle page-particle--one" />
    <span className="page-particle page-particle--two" />
    <span className="page-particle page-particle--three" />
    <svg className="page-grid" viewBox="0 0 1600 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="grid-lines">
        {ROUTES.map((route) => <path key={path(route)} d={path(route)} />)}
      </g>
      <g className="grid-dots">
        {ROUTES.flatMap(corners).map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.8" />)}
      </g>
      <path className="pulse-line" d={path(ROUTES[0])} />
      <circle className="pulse-dot" cx={ROUTES[0][0]} cy={ROUTES[0][1]} r="4" />
    </svg>
  </div>
);

export default PageBackground;
