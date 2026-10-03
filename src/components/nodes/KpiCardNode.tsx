import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { BarChart3 } from 'lucide-react';

export const KpiCardNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;

  return (
    <div
      className={`relative group px-4 py-3.5 w-[250px] rounded-xl border-2 transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm ${
        selected
          ? 'ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-900 border-violet-500 shadow-lg'
          : 'border-violet-200 dark:border-violet-900/60 hover:border-violet-400 hover:shadow-md'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-violet-600 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-violet-600 !border-2 !border-white" />

      <div className="flex items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-violet-100 dark:border-violet-900/40">
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
          <BarChart3 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          {nodeData.kpiDetails?.label || 'KPI Matrix'}
        </span>
        <span className="text-[9px] font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950 px-1.5 py-0.5 rounded">
          Live Metric
        </span>
      </div>

      <div className="font-semibold text-xs text-slate-800 dark:text-slate-100 leading-snug whitespace-pre-line mb-2">
        {nodeData.label.split('\n')[0]}
      </div>

      {nodeData.kpiDetails?.items && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {nodeData.kpiDetails.items.map((item, idx) => (
            <span
              key={idx}
              className="text-[9px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200/80 dark:border-slate-700/60"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
