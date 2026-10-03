import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { Phone, Mail, MessageSquare, Users } from 'lucide-react';

export const ChannelNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;

  const getChannelConfig = (label: string) => {
    switch (label.toLowerCase()) {
      case 'phone':
        return {
          icon: Phone,
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800',
        };
      case 'email':
        return {
          icon: Mail,
          color: 'text-indigo-600 dark:text-indigo-400',
          bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800',
        };
      case 'whatsapp':
        return {
          icon: MessageSquare,
          color: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800',
        };
      case 'in-person':
      default:
        return {
          icon: Users,
          color: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800',
        };
    }
  };

  const config = getChannelConfig(nodeData.label);
  const IconComponent = config.icon;

  return (
    <div
      className={`relative group px-3.5 py-2 min-w-[100px] rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 shadow-xs ${
        selected
          ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 shadow-md'
          : 'hover:shadow-sm'
      } ${config.bg}`}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-slate-500 !border !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-slate-500 !border !border-white" />

      <IconComponent className={`w-3.5 h-3.5 ${config.color}`} />
      <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">{nodeData.label}</span>
    </div>
  );
};
