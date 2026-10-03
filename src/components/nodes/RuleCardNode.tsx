import React from 'react';
import type { NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';

export const RuleCardNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;
  const ruleNum = nodeData.businessRuleIds?.[0] || '';

  return (
    <div
      className={`relative group p-4 w-[540px] rounded-2xl border-2 transition-all duration-200 bg-white dark:bg-slate-900 shadow-xs ${
        selected
          ? 'ring-4 ring-blue-500/20 border-blue-600 shadow-xl scale-101'
          : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-blue-500/20">
          {ruleNum}
        </div>
        <div className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-semibold">
          {nodeData.label}
        </div>
      </div>
    </div>
  );
};
