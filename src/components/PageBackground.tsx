import React, { useRef } from 'react';
import { useWorkflowTrail } from '../hooks/useWorkflowTrail';
import FrameBackground from './FrameBackground';

// The four workflow steps (Understand, Plan, Build, Refine) drawn as circuit routes.
// Each route runs: start -> across to midX -> down/up to end Y -> across to end.
const NODES: ReadonlyArray<readonly [number, number]> = [
  [1180, 90],
  [1400, 260],
  [1250, 520],
  [1430, 780],
  [1300, 1060],
];
const MID_X: readonly number[] = [1290, 1325, 1340, 1365];

const ROUTES = MID_X.map((midX, i) => {
  const [x1, y1] = NODES[i];
  const [x2, y2] = NODES[i + 1];
  return `M${x1} ${y1}H${midX}V${y2}H${x2}`;
});

const PageBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useWorkflowTrail(svgRef);

  return (
    <div className="page-background" aria-hidden="true">
      <FrameBackground />
      <div className="page-glow" />
      <svg ref={svgRef} className="page-grid" viewBox="0 0 1600 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="flow-routes">
          {ROUTES.map((d) => <path key={d} className="flow-base" d={d} />)}
          {ROUTES.map((d) => <path key={`lit-${d}`} className="flow-lit" d={d} />)}
        </g>
        <g className="flow-nodes">
          {NODES.map(([cx, cy]) => <circle key={`${cx}-${cy}`} className="flow-node" cx={cx} cy={cy} r="4.5" />)}
        </g>
        <circle className="flow-dot" cx={NODES[0][0]} cy={NODES[0][1]} r="5" />
      </svg>
    </div>
  );
};

export default PageBackground;
