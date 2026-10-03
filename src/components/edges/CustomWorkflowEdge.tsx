import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath,
} from '@xyflow/react';

export const CustomWorkflowEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data,
  selected,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const edgeType = (data as { type?: string })?.type;
  const isYes = label === 'YES' || edgeType === 'decision_yes';
  const isNo = label === 'NO' || edgeType === 'decision_no';
  const isCross = edgeType === 'cross_section' || edgeType === 'return_loop';

  let strokeColor = '#94a3b8'; // default slate-400
  if (isYes) strokeColor = '#10b981'; // emerald-500
  else if (isNo) strokeColor = '#f43f5e'; // rose-500
  else if (label === 'Staff') strokeColor = '#3b82f6'; // blue-500
  else if (label === 'Admin') strokeColor = '#8b5cf6'; // purple-500
  else if (isCross) strokeColor = '#0284c7'; // sky-600

  if (selected) {
    strokeColor = '#2563eb';
  }

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth: selected ? 3 : isCross ? 2.5 : 2,
          strokeDasharray: isCross ? '6,4' : undefined,
        }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className={`nodrag nopan text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border transition-all ${
              isYes
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                : isNo
                ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                : label === 'Staff'
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                : label === 'Admin'
                ? 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
