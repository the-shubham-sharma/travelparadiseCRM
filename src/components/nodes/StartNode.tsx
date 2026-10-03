import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { PlayCircle } from 'lucide-react';

export const StartNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;

  return (
    <div
      className={`relative group px-4 py-2.5 min-w-[150px] max-w-[220px] rounded-full border-2 transition-all duration-200 shadow-sm ${
        selected
          ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 shadow-md border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
          : 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-500 hover:shadow-md'
      }`}
    >
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-emerald-400 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-emerald-400 !border-2 !border-white dark:!border-slate-900" />

      <div className="flex items-center justify-center gap-2 font-bold text-xs tracking-wide">
        <PlayCircle className="w-4 h-4 text-emerald-100" />
        <span>{nodeData.label}</span>
      </div>
    </div>
  );
};
