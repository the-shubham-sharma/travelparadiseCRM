import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { XCircle, LogOut, CheckCircle2 } from 'lucide-react';

export const TerminalNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;
  const isSuccess =
    nodeData.id.includes('mark_completed') ||
    nodeData.id.includes('crm_access') ||
    nodeData.id.includes('tp_crm') ||
    nodeData.id.includes('data_recovery');

  const isLostOrCancel =
    nodeData.id.includes('close_junk') ||
    nodeData.id.includes('lost') ||
    nodeData.id.includes('cancelled') ||
    nodeData.id.includes('close_lost');

  return (
    <div
      className={`relative group px-4 py-3 min-w-[190px] max-w-[250px] rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'ring-2 ring-slate-900 dark:ring-slate-100 ring-offset-2 shadow-lg'
          : 'hover:shadow-md'
      } ${
        isSuccess
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
          : isLostOrCancel
          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-100'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-slate-700 dark:!bg-slate-200 !border-2 !border-white" />
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !bg-slate-700 dark:!bg-slate-200 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-slate-700 dark:!bg-slate-200 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !bg-slate-700 dark:!bg-slate-200 !border-2 !border-white" />

      <div className="flex items-center justify-between gap-1.5 mb-1">
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            isSuccess
              ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
              : isLostOrCancel
              ? 'bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          {isSuccess ? 'Completed State' : isLostOrCancel ? 'Closed State' : 'Terminal'}
        </span>
        {isSuccess ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : isLostOrCancel ? (
          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        ) : (
          <LogOut className="w-3.5 h-3.5 text-slate-500" />
        )}
      </div>

      <div className="font-bold text-xs leading-snug whitespace-pre-line text-center">
        {nodeData.label}
      </div>
    </div>
  );
};
