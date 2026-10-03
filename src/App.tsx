import React, { useState, useEffect, useCallback } from 'react';
import {
  WORKFLOW_NODES,
} from './data/flowchartData';
import type { WorkflowNodeData } from './types/workflow';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NodeDetailsPanel } from './components/NodeDetailsPanel';
import { LegendModal } from './components/LegendModal';
import { SearchModal } from './components/SearchModal';

export function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<WorkflowNodeData | null>(null);
  const [focusedNodeIdToAnimate, setFocusedNodeIdToAnimate] = useState<string | null>(null);
  const [fitViewTrigger, setFitViewTrigger] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dark Theme Management
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('tp_crm_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tp_crm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tp_crm_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Fullscreen Management
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsLegendOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for selection & navigation
  const handleSelectSection = useCallback((sectionId: string | null) => {
    setSelectedSectionId(sectionId);
  }, []);

  const handleSelectNodeById = useCallback((nodeId: string) => {
    const node = WORKFLOW_NODES.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNodeData(node.data);
      setSelectedSectionId(node.data.sectionId);
      setFocusedNodeIdToAnimate(nodeId);
    }
  }, []);

  const handleSelectNodeFromCanvas = useCallback((nodeData: WorkflowNodeData | null) => {
    setSelectedNodeData(nodeData);
    if (nodeData) {
      setFocusedNodeIdToAnimate(nodeData.id);
    }
  }, []);

  const handleFitView = useCallback(() => {
    setSelectedSectionId(null);
    setFitViewTrigger((prev) => prev + 1);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-hidden transition-colors">
      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLegend={() => setIsLegendOpen(true)}
        onFitView={handleFitView}
        totalNodesCount={WORKFLOW_NODES.length}
      />

      {/* Main Flowchart Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Section Navigation Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          selectedSectionId={selectedSectionId}
          onSelectSection={handleSelectSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSelectNode={handleSelectNodeById}
        />

        {/* Central Interactive Flowchart Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden relative h-full">
          <WorkflowCanvas
            selectedNodeId={selectedNodeData?.id || null}
            onSelectNode={handleSelectNodeFromCanvas}
            selectedSectionId={selectedSectionId}
            isDark={isDark}
            focusedNodeIdToAnimate={focusedNodeIdToAnimate}
            fitViewTrigger={fitViewTrigger}
          />
        </main>

        {/* Right Node Details Inspector Panel */}
        {selectedNodeData && (
          <NodeDetailsPanel
            nodeData={selectedNodeData}
            onClose={() => setSelectedNodeData(null)}
            onSelectNode={handleSelectNodeById}
          />
        )}
      </div>

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNode={handleSelectNodeById}
        onSelectSection={handleSelectSection}
      />

      {/* Diagram Legend Modal */}
      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />
    </div>
  );
}

export default App;
