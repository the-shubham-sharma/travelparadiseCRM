import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { FileSpreadsheet, ChevronRight } from 'lucide-react';

export const ReportNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;

  return (
    <div
      className={`relative group px-4 py-2.5 w-[240px] rounded-xl border transition-all duration-200 bg-white/95 dark:bg-slate-900/95 flex items-center justify-between shadow-xs ${
        selected
          ? 'ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-900 border-violet-500 shadow-md'
          : 'border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-sm'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-violet-600 !border !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-violet-600 !border !border-white" />

      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
          <FileSpreadsheet className="w-4 h-4" />
        </div>
        <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">{nodeData.label}</span>
      </div>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500 transition-colors" />
    </div>
  );
};
