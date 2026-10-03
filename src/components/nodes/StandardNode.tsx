import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { WORKFLOW_SECTIONS } from '../../data/flowchartData';
import { Lock, ArrowRight } from 'lucide-react';

export const StandardNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;
  const section = WORKFLOW_SECTIONS.find((s) => s.id === nodeData.sectionId);

  return (
    <div
      className={`relative group px-4 py-3 min-w-[210px] max-w-[260px] rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'ring-4 ring-blue-500/20 border-blue-600 bg-white dark:bg-slate-800 shadow-xl scale-102'
          : 'bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg border-slate-200 dark:border-slate-800 shadow-xs'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-blue-600 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-blue-600 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-blue-600 !border-2 !border-white dark:!border-slate-900" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-blue-600 !border-2 !border-white dark:!border-slate-900" />

      <div className="flex items-center justify-between gap-1.5 mb-1.5">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase truncate"
          style={{
            backgroundColor: section?.color.lightBg || 'rgba(59, 130, 246, 0.1)',
            color: section?.color.accent || '#2563eb',
          }}
        >
          {section?.shortTitle || 'Step'}
        </span>

        {nodeData.isLocked && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
            <Lock className="w-2.5 h-2.5" /> Locked
          </span>
        )}

        {nodeData.statusBadge && (
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            {nodeData.statusBadge}
          </span>
        )}
      </div>

      <div className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-snug whitespace-pre-line text-center py-0.5">
        {nodeData.label}
      </div>

      <div className="mt-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Click for details</span>
        <ArrowRight className="w-2.5 h-2.5 text-blue-500" />
      </div>
    </div>
  );
};
