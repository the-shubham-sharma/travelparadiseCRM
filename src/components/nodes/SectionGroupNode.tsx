import React from 'react';
import type { NodeProps } from '@xyflow/react';
import type { WorkflowSection } from '../../types/workflow';

export const SectionGroupNode: React.FC<NodeProps> = ({ data }) => {
  const section = data as unknown as WorkflowSection;

  return (
    <div
      className={`w-full h-full rounded-3xl border-2 border-dashed transition-all duration-300 pointer-events-none p-4 ${section.color.bg} ${section.color.border}`}
      style={{
        width: `${section.bounds.width}px`,
        height: `${section.bounds.height}px`,
      }}
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-lg tracking-wider uppercase"
            style={{
              backgroundColor: section.color.accent,
              color: '#ffffff',
            }}
          >
            {section.title}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize hidden sm:inline">
            ({section.category})
          </span>
        </div>
      </div>
    </div>
  );
};
