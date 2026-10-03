import React from 'react';
import {
  Compass,
  Search,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  HelpCircle,
  Focus,
} from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  onOpenSearch: () => void;
  onOpenLegend: () => void;
  onFitView: () => void;
  totalNodesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  toggleTheme,
  isFullscreen,
  toggleFullscreen,
  onOpenSearch,
  onOpenLegend,
  onFitView,
  totalNodesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title (No text underneath the logo) */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Compass className="w-5 h-5 text-sky-200" />
            </div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight truncate">
              Travel Paradise CRM Workflow &amp; Governance System
            </h1>
          </div>
        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Fit View Button */}
          <button
            onClick={onFitView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Fit Entire Workflow to Screen"
          >
            <Focus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Fit View</span>
          </button>

          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Search workflow steps (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Legend Button */}
          <button
            onClick={onOpenLegend}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Flowchart Legend"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
