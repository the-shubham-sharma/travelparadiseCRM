import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { WORKFLOW_SECTIONS } from '../../data/flowchartData';
import { GitFork } from 'lucide-react';

export const DecisionNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;
  const section = WORKFLOW_SECTIONS.find((s) => s.id === nodeData.sectionId);

  return (
    <div
      className={`relative group px-4 py-3 min-w-[210px] max-w-[270px] rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'ring-4 ring-amber-500/20 shadow-2xl border-amber-500 bg-amber-50 dark:bg-amber-950/60 scale-102'
          : 'bg-white dark:bg-slate-900 border-amber-400 dark:border-amber-600 hover:border-amber-500 hover:shadow-lg shadow-xs'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-white dark:!border-slate-900" />

      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-md">
          <GitFork className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Decision
        </span>
        <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">
          {section?.shortTitle}
        </span>
      </div>

      <div className="font-extrabold text-xs text-amber-950 dark:text-amber-100 leading-snug whitespace-pre-line text-center py-1">
        {nodeData.label}
      </div>

      <div className="mt-1.5 pt-1 border-t border-amber-200 dark:border-amber-800/60 flex items-center justify-center gap-3 text-[10px] font-bold">
        <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
          YES ✓
        </span>
        <span className="text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-800">
          NO ✗
        </span>
      </div>
    </div>
  );
};
