import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { Lock } from 'lucide-react';

export const LockNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;

  return (
    <div
      className={`relative group px-4 py-3 min-w-[210px] max-w-[260px] rounded-xl border-2 transition-all duration-200 bg-rose-50/90 dark:bg-rose-950/30 shadow-xs ${
        selected
          ? 'ring-2 ring-rose-500 ring-offset-2 dark:ring-offset-slate-900 border-rose-500 shadow-md'
          : 'border-rose-300 dark:border-rose-800/80 hover:border-rose-400 hover:shadow-sm'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-rose-600 !border-2 !border-white" />
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-rose-600 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-rose-600 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-rose-600 !border-2 !border-white" />

      <div className="flex items-center justify-between gap-1.5 mb-1.5">
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 bg-rose-200/80 dark:bg-rose-900/60 px-2 py-0.5 rounded-full">
          <Lock className="w-2.5 h-2.5" /> Immutable Lock
        </span>
        <span className="text-[9px] font-semibold text-rose-700 dark:text-rose-300">Rule 2</span>
      </div>

      <div className="font-bold text-xs text-rose-950 dark:text-rose-100 leading-snug whitespace-pre-line text-center py-0.5">
        {nodeData.label}
      </div>
    </div>
  );
};
