import React, { useState, useEffect, useRef } from 'react';
import {
  WORKFLOW_NODES,
  WORKFLOW_SECTIONS,
  BUSINESS_RULES,
} from '../data/flowchartData';
import {
  Search,
  X,
  ArrowRight,
  GitBranch,
  BookOpen,
  Layers,
  Crosshair,
  Lock,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onSelectSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectNode,
  onSelectSection,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingNodes = cleanQuery
    ? WORKFLOW_NODES.filter(
        (n) =>
          n.data.label.toLowerCase().includes(cleanQuery) ||
          n.data.description?.toLowerCase().includes(cleanQuery) ||
          n.id.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingSections = cleanQuery
    ? WORKFLOW_SECTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingRules = cleanQuery
    ? BUSINESS_RULES.filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQuery) ||
          r.rule.toLowerCase().includes(cleanQuery) ||
          r.details.toLowerCase().includes(cleanQuery)
      )
    : [];

  const handlePickNode = (nodeId: string) => {
    onSelectNode(nodeId);
    onClose();
  };

  const handlePickSection = (sectionId: string) => {
    onSelectSection(sectionId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/40">
          <Search className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workflow steps, sections, and SLA rules..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!cleanQuery ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                Quick Navigation Search
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Type any keyword (e.g. &ldquo;FRT SLA&rdquo;, &ldquo;Duplicate Check&rdquo;, &ldquo;Air Ticket&rdquo;, &ldquo;Admin Login&rdquo;)
              </p>
            </div>
          ) : matchingNodes.length === 0 && matchingSections.length === 0 && matchingRules.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {/* Sections Results */}
              {matchingSections.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-500" /> Sections ({matchingSections.length})
                  </div>
                  {matchingSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handlePickSection(sec.id)}
                      className="w-full text-left p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: sec.color.accent }}
                        />
                        <span className="font-bold text-slate-900 dark:text-white">{sec.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              {/* Nodes Results */}
              {matchingNodes.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-indigo-500" /> Workflow Steps ({matchingNodes.length})
                  </div>
                  {matchingNodes.map((n) => {
                    const sec = WORKFLOW_SECTIONS.find((s) => s.id === n.data.sectionId);
                    return (
                      <button
                        key={n.id}
                        onClick={() => handlePickNode(n.id)}
                        className="w-full text-left p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 transition-all text-xs flex items-center justify-between group"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: sec?.color.accent || '#3b82f6' }}
                            >
                              {sec?.shortTitle}
                            </span>
                            {n.data.isLocked && (
                              <span className="text-[9px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" /> Locked
                              </span>
                            )}
                          </div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                            {n.data.label}
                          </div>
                        </div>
                        <Crosshair className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 flex-shrink-0 ml-2" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Rules Results */}
              {matchingRules.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Business Rules ({matchingRules.length})
                  </div>
                  {matchingRules.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs space-y-1"
                    >
                      <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">
                          {r.number}
                        </span>
                        <span>{r.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {r.rule}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
