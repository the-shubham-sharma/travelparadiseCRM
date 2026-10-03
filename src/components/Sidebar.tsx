import React, { useState } from 'react';
import {
  WORKFLOW_SECTIONS,
  WORKFLOW_NODES,
} from '../data/flowchartData';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Search,
  Eye,
  Crosshair,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectNode: (nodeId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  selectedSectionId,
  onSelectSection,
  searchTerm,
  setSearchTerm,
  onSelectNode,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'governance' | 'analytics'>('all');

  const filteredSections = WORKFLOW_SECTIONS.filter((sec) => {
    if (activeCategory === 'all') return true;
    return sec.category === activeCategory;
  });

  const getNodeCountForSection = (sectionId: string) => {
    return WORKFLOW_NODES.filter((n) => n.data.sectionId === sectionId).length;
  };

  const matchingNodes = searchTerm.trim()
    ? WORKFLOW_NODES.filter((n) =>
        n.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.data.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <aside
      className={`transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col z-30 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Workflow Sections
            </h2>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors mx-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed ? (
        <>
          {/* Search Input */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Find workflow step..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
              {[
                { id: 'all', label: 'All Sections' },
                { id: 'core', label: 'Core Flow (1–6)' },
                { id: 'governance', label: 'Governance' },
                { id: 'analytics', label: 'Analytics' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* If actively searching, show matched node results */}
          {searchTerm.trim() ? (
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Matching Steps ({matchingNodes.length})
              </div>
              {matchingNodes.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No workflow steps found matching &ldquo;{searchTerm}&rdquo;
                </div>
              ) : (
                matchingNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => onSelectNode(n.id)}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all text-xs group"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                        {WORKFLOW_SECTIONS.find((s) => s.id === n.data.sectionId)?.shortTitle}
                      </span>
                      <Crosshair className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                      {n.data.label}
                    </div>
                  </button>
                ))
              )}
            </div>
          ) : (
            /* Sections List */
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <button
                onClick={() => onSelectSection(null)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  selectedSectionId === null
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Overview (All Sections)</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedSectionId === null ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {WORKFLOW_NODES.length}
                </span>
              </button>

              <div className="my-1 border-t border-slate-100 dark:border-slate-800/80" />

              {filteredSections.map((sec) => {
                const isSelected = selectedSectionId === sec.id;
                const nodeCount = getNodeCountForSection(sec.id);

                return (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border group ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-400 dark:border-blue-600 shadow-xs'
                        : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: sec.color.accent }}
                        />
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                          {sec.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {nodeCount}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 pl-4.5">
                      {sec.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Sidebar Footer Stats */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 px-1">
              <span>Total Active Steps:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{WORKFLOW_NODES.length} Nodes</span>
            </div>
          </div>
        </>
      ) : (
        /* Collapsed Icon Bar */
        <div className="flex-1 py-3 flex flex-col items-center gap-3 overflow-y-auto">
          <button
            onClick={() => onSelectSection(null)}
            className={`p-2.5 rounded-xl transition-colors ${
              selectedSectionId === null
                ? 'bg-blue-600 text-white'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Full Overview"
          >
            <Eye className="w-4 h-4" />
          </button>
          {WORKFLOW_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] transition-transform hover:scale-110 ${
                selectedSectionId === sec.id
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: sec.color.accent,
                color: '#ffffff',
              }}
              title={sec.title}
            >
              {sec.number}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};
