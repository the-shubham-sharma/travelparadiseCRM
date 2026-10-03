import React, { useState } from 'react';
import type {
  WorkflowNodeData,
  WorkflowSection,
  BusinessRule,
} from '../types/workflow';
import {
  WORKFLOW_SECTIONS,
  WORKFLOW_NODES,
  BUSINESS_RULES,
} from '../data/flowchartData';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Lock,
  ShieldCheck,
  GitFork,
  BookOpen,
  Copy,
  Check,
  Maximize2,
  Share2,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

interface NodeDetailsPanelProps {
  nodeData: WorkflowNodeData | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({
  nodeData,
  onClose,
  onSelectNode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!nodeData) return null;

  const section = WORKFLOW_SECTIONS.find((s) => s.id === nodeData.sectionId);

  // Find incoming nodes
  const incomingNodes = nodeData.incoming
    .map((inId) => WORKFLOW_NODES.find((n) => n.id === inId))
    .filter(Boolean);

  // Find outgoing nodes
  const outgoingNodes = nodeData.outgoing
    .map((outId) => WORKFLOW_NODES.find((n) => n.id === outId))
    .filter(Boolean);

  // Associated rules
  const rules = (nodeData.businessRuleIds || [])
    .map((rId) => BUSINESS_RULES.find((r) => r.id === rId))
    .filter(Boolean) as BusinessRule[];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${nodeData.label} (${nodeData.id})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-80 md:w-96 border-l border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col z-30 shadow-2xl h-full animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: section?.color.accent || '#2563eb' }}
          />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Node Inspector
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title="Copy step details"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Section Badge */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider text-white"
              style={{ backgroundColor: section?.color.accent || '#2563eb' }}
            >
              {section?.title || 'Workflow Step'}
            </span>
            {nodeData.roleAccess && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {nodeData.roleAccess} Access
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug whitespace-pre-line pt-1">
            {nodeData.label}
          </h3>
        </div>

        {/* Status / Lock Badges */}
        {(nodeData.isLocked || nodeData.statusBadge || nodeData.type === 'decision') && (
          <div className="flex flex-wrap gap-1.5">
            {nodeData.isLocked && (
              <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <Lock className="w-3.5 h-3.5 text-rose-500" />
                <span>Immutable Locked Record (Rule 2)</span>
              </div>
            )}
            {nodeData.type === 'decision' && (
              <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <GitFork className="w-3.5 h-3.5 text-amber-500" />
                <span>Decision Branching Point</span>
              </div>
            )}
            {nodeData.statusBadge && (
              <div className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Terminal Status: {nodeData.statusBadge}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Source Workflow Logic
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {nodeData.description ? (
              nodeData.description
            ) : (
              <span className="italic text-slate-400">
                Description and rules have not been explicitly specified in the source diagram for this node.
              </span>
            )}
          </p>
        </div>

        {/* Decision Conditions */}
        {nodeData.decisionBranches && (
          <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <GitFork className="w-3 h-3" /> Decision Conditions
            </div>
            {nodeData.decisionQuestion && (
              <div className="text-xs font-semibold text-amber-950 dark:text-amber-100 italic">
                &ldquo;{nodeData.decisionQuestion}&rdquo;
              </div>
            )}
            <div className="space-y-1.5 text-xs">
              {nodeData.decisionBranches.yes && (
                <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">YES Branch:</span>
                  <button
                    onClick={() => onSelectNode(nodeData.decisionBranches!.yes!)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Jump to target</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
              {nodeData.decisionBranches.no && (
                <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800">
                  <span className="font-bold text-rose-600 dark:text-rose-400">NO Branch:</span>
                  <button
                    onClick={() => onSelectNode(nodeData.decisionBranches!.no!)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Jump to target</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
              {nodeData.decisionBranches.custom?.map((branch, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{branch.label}:</span>
                  <button
                    onClick={() => onSelectNode(branch.targetId)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Jump to target</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incoming Connections */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3 text-blue-500" /> Incoming Steps ({incomingNodes.length})
          </div>
          {incomingNodes.length === 0 ? (
            <div className="text-xs text-slate-400 italic p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
              Initial trigger (No incoming predecessors)
            </div>
          ) : (
            <div className="space-y-1">
              {incomingNodes.map((inc) => (
                <button
                  key={inc!.id}
                  onClick={() => onSelectNode(inc!.id)}
                  className="w-full text-left p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all text-xs flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                    {inc!.data.label.split('\n')[0]}
                  </span>
                  <ArrowLeft className="w-3 h-3 text-slate-400 group-hover:text-blue-500 group-hover:-translate-x-0.5 transition-transform flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Outgoing Connections */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-indigo-500" /> Outgoing Steps ({outgoingNodes.length})
          </div>
          {outgoingNodes.length === 0 ? (
            <div className="text-xs text-slate-400 italic p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
              Terminal state (No downstream steps)
            </div>
          ) : (
            <div className="space-y-1">
              {outgoingNodes.map((outg) => (
                <button
                  key={outg!.id}
                  onClick={() => onSelectNode(outg!.id)}
                  className="w-full text-left p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-xs flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                    {outg!.data.label.split('\n')[0]}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Associated Business Rules */}
        {rules.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-blue-500" /> Governing Business Rules
            </div>
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                  <span className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">
                    {rule.number}
                  </span>
                  <span>{rule.title}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  {rule.rule}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Details */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-[10px] text-slate-400 flex items-center justify-between font-mono">
        <span>Node ID: {nodeData.id}</span>
        <span>Section: {section?.shortTitle}</span>
      </div>
    </div>
  );
};
