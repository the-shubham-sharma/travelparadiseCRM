import React from 'react';
import { BUSINESS_RULES } from '../data/flowchartData';
import {
  BookOpen,
  ShieldCheck,
  Zap,
  Lock,
  Clock,
  AlertTriangle,
  ArrowRight,
  Database,
  Award,
} from 'lucide-react';

interface GovernanceRulesViewProps {
  onOpenCanvas: (sectionId?: string) => void;
}

export const GovernanceRulesView: React.FC<GovernanceRulesViewProps> = ({ onOpenCanvas }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <BookOpen className="w-4 h-4" /> Section 13: Business Rules & Governance Standard
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            The 8 Golden Business Rules & SLA Measurement System
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Core architectural principles governing entity separation, immutable audit trails, SLA clocks, and data integrity.
          </p>
        </div>

        <button
          onClick={() => onOpenCanvas('section_13')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold self-start md:self-auto shadow-md transition-all"
        >
          <span>View in Flowchart</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {BUSINESS_RULES.map((rule) => {
          return (
            <div
              key={rule.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                      {rule.number}
                    </span>
                    <h2 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {rule.title}
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {rule.category}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                  <p className="text-xs font-semibold text-blue-950 dark:text-blue-200 leading-relaxed">
                    &ldquo;{rule.rule}&rdquo;
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                      Implementation Logic & Standard:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {rule.details}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px] tracking-wider block mb-1">
                      Operational Benefit & Business Impact:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {rule.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
