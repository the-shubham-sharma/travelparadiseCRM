import React from 'react';
import {
  X,
  PlayCircle,
  GitFork,
  CheckCircle2,
  Lock,
  Phone,
  BarChart3,
  FileSpreadsheet,
  UserCheck,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const nodeTypes = [
    {
      title: 'Start / Entry Step',
      desc: 'Capsule node indicating beginning of a workflow or user login portal.',
      icon: PlayCircle,
      color: 'bg-emerald-600 text-white',
    },
    {
      title: 'Process Step',
      desc: 'Standard operational step executed by staff or background system engine.',
      icon: ArrowRight,
      color: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 border',
    },
    {
      title: 'Decision Node',
      desc: 'Branching logic point evaluating conditions with explicit YES / NO / Role pathways.',
      icon: GitFork,
      color: 'bg-amber-50 dark:bg-amber-950 border-amber-400 dark:border-amber-700 text-amber-900 dark:text-amber-200 border-2',
    },
    {
      title: 'Communication Channel',
      desc: 'Omnichannel interaction touchpoints: Phone, Email, WhatsApp, and In-Person.',
      icon: Phone,
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 border',
    },
    {
      title: 'Immutable Locked Step',
      desc: 'Rule 2 security safeguard: Submitter fields locked against direct modification.',
      icon: Lock,
      color: 'bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 border-2',
    },
    {
      title: 'Terminal / Closed State',
      desc: 'Final lifecycle outcome: Completed, Lost, Cancelled, CRM Access, or Exit.',
      icon: CheckCircle2,
      color: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 border-2',
    },
    {
      title: 'KPI Metric Grid',
      desc: 'Real-time CRM Dashboard funnel metrics and SLA compliance counters.',
      icon: BarChart3,
      color: 'bg-violet-50 dark:bg-violet-950 border-violet-300 dark:border-violet-700 text-violet-900 dark:text-violet-200 border-2',
    },
    {
      title: 'Operational Report',
      desc: 'Specialized report generators (Monthly, Destination, Staff, Margin, Lost).',
      icon: FileSpreadsheet,
      color: 'bg-white dark:bg-slate-800 border-violet-200 dark:border-violet-800 text-slate-800 dark:text-slate-200 border',
    },
  ];

  const connectorStyles = [
    { label: 'Standard Forward Flow', style: 'Solid grey line with directional arrow', color: 'border-slate-400' },
    { label: 'YES Decision Branch', style: 'Solid emerald green line with "YES" badge', color: 'border-emerald-500' },
    { label: 'NO Decision Branch', style: 'Solid rose red line with "NO" badge', color: 'border-rose-500' },
    { label: 'Cross-Section Transition', style: 'Animated dashed sky-blue line', color: 'border-sky-500 border-dashed' },
    { label: 'Repeat Client Return Loop', style: 'Animated loop returning to Permanent Query ID', color: 'border-teal-500 border-dashed' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                Interactive Flowchart Legend
              </h2>
              <p className="text-xs text-slate-500">Visual guide to node shapes, badges, and connectors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Node Types */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Workflow Node Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodeTypes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl flex items-start gap-3 shadow-2xs ${item.color}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs">{item.title}</div>
                    <div className="text-[11px] opacity-80 leading-snug">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connector Styles */}
        <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Connector & Direction Types
          </h3>
          <div className="space-y-2">
            {connectorStyles.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-0 border-t-2 ${item.color}`} />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.style}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
