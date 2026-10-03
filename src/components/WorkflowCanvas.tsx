import React, { useEffect, useMemo, useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  MarkerType,
  BackgroundVariant,
  SelectionMode,
} from '@xyflow/react';

import {
  WORKFLOW_SECTIONS,
  WORKFLOW_NODES,
  WORKFLOW_EDGES,
} from '../data/flowchartData';
import type { WorkflowNodeData, WorkflowSection } from '../types/workflow';

import { StandardNode } from './nodes/StandardNode';
import { DecisionNode } from './nodes/DecisionNode';
import { StartNode } from './nodes/StartNode';
import { TerminalNode } from './nodes/TerminalNode';
import { ChannelNode } from './nodes/ChannelNode';
import { KpiCardNode } from './nodes/KpiCardNode';
import { ReportNode } from './nodes/ReportNode';
import { LockNode } from './nodes/LockNode';
import { RuleCardNode } from './nodes/RuleCardNode';
import { SectionGroupNode } from './nodes/SectionGroupNode';
import { CustomWorkflowEdge } from './edges/CustomWorkflowEdge';

import {
  Focus,
  Compass,
} from 'lucide-react';

interface WorkflowCanvasProps {
  selectedNodeId: string | null;
  onSelectNode: (nodeData: WorkflowNodeData | null) => void;
  selectedSectionId: string | null;
  isDark: boolean;
  focusedNodeIdToAnimate?: string | null;
  fitViewTrigger?: number;
}

const nodeTypes = {
  process: StandardNode,
  decision: DecisionNode,
  start: StartNode,
  terminal: TerminalNode,
  channel: ChannelNode,
  kpi_card: KpiCardNode,
  report: ReportNode,
  lock: LockNode,
  rule_card: RuleCardNode,
  section_group: SectionGroupNode,
};

const edgeTypes = {
  custom: CustomWorkflowEdge,
};

const WorkflowCanvasInner: React.FC<WorkflowCanvasProps> = ({
  selectedNodeId,
  onSelectNode,
  selectedSectionId,
  isDark,
  focusedNodeIdToAnimate,
  fitViewTrigger,
}) => {
  const { fitView, setCenter, fitBounds } = useReactFlow();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [showMinimap, setShowMinimap] = useState(true);

  // Generate initial React Flow nodes
  const initialNodes: Node[] = useMemo(() => {
    // 1. Section group background containers
    const sectionNodes: Node[] = WORKFLOW_SECTIONS.map((sec) => ({
      id: `group_${sec.id}`,
      type: 'section_group',
      position: { x: sec.bounds.x, y: sec.bounds.y },
      data: sec as any,
      selectable: false,
      draggable: false,
      zIndex: -1,
      style: {
        width: sec.bounds.width,
        height: sec.bounds.height,
        pointerEvents: 'none',
      },
    }));

    // 2. Interactive workflow steps
    const stepNodes: Node[] = WORKFLOW_NODES.map((n) => ({
      id: n.id,
      type: n.data.type,
      position: n.position,
      data: n.data as any,
      selected: n.id === selectedNodeId,
      zIndex: 10,
    }));

    return [...sectionNodes, ...stepNodes];
  }, [selectedNodeId]);

  // Generate initial React Flow edges
  const initialEdges: Edge[] = useMemo(() => {
    return WORKFLOW_EDGES.map((e) => {
      const isYes = e.label === 'YES' || e.type === 'decision_yes';
      const isNo = e.label === 'NO' || e.type === 'decision_no';

      let markerColor = '#64748b';
      if (isYes) markerColor = '#10b981';
      else if (isNo) markerColor = '#f43f5e';
      else if (e.label === 'Staff') markerColor = '#3b82f6';
      else if (e.label === 'Admin') markerColor = '#8b5cf6';
      else if (e.type === 'cross_section') markerColor = '#0284c7';

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'custom',
        animated: e.animated || e.type === 'cross_section' || e.type === 'return_loop',
        label: e.label,
        data: { type: e.type },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 18,
          height: 18,
          color: markerColor,
        },
      };
    });
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Active connected node/edge calculation for highlighting
  const activeFocusId = hoveredNodeId || selectedNodeId;

  const connectedInfo = useMemo(() => {
    if (!activeFocusId) return { nodeIds: new Set<string>(), edgeIds: new Set<string>() };

    const nodeIds = new Set<string>([activeFocusId]);
    const edgeIds = new Set<string>();

    WORKFLOW_EDGES.forEach((e) => {
      if (e.source === activeFocusId || e.target === activeFocusId) {
        edgeIds.add(e.id);
        nodeIds.add(e.source);
        nodeIds.add(e.target);
      }
    });

    return { nodeIds, edgeIds };
  }, [activeFocusId]);

  // Update node selection and opacity when selection or hover changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'section_group') {
          const sec = node.data as unknown as WorkflowSection;
          const isCurrentSection = selectedSectionId && sec.id === selectedSectionId;
          return {
            ...node,
            style: {
              ...node.style,
              opacity: selectedSectionId ? (isCurrentSection ? 1 : 0.3) : 1,
            },
          };
        }

        const isSelected = node.id === selectedNodeId;
        const isConnected = connectedInfo.nodeIds.has(node.id);
        const matchesSection = !selectedSectionId || (node.data as any).sectionId === selectedSectionId;

        let opacity = 1;
        if (activeFocusId) {
          opacity = isConnected ? 1 : 0.28;
        } else if (selectedSectionId) {
          opacity = matchesSection ? 1 : 0.35;
        }

        return {
          ...node,
          selected: isSelected,
          style: {
            ...node.style,
            opacity,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          },
        };
      })
    );
  }, [selectedNodeId, hoveredNodeId, selectedSectionId, activeFocusId, connectedInfo, setNodes]);

  // Update edges highlighting
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const isHighlighted = connectedInfo.edgeIds.has(edge.id);
        let opacity = 1;
        if (activeFocusId) {
          opacity = isHighlighted ? 1 : 0.15;
        }

        return {
          ...edge,
          selected: isHighlighted,
          style: {
            ...edge.style,
            opacity,
            transition: 'opacity 0.2s ease',
          },
        };
      })
    );
  }, [activeFocusId, connectedInfo, setEdges]);

  // Viewport adjustments when section is picked
  useEffect(() => {
    if (selectedSectionId) {
      const sec = WORKFLOW_SECTIONS.find((s) => s.id === selectedSectionId);
      if (sec) {
        fitBounds(
          {
            x: sec.bounds.x - 60,
            y: sec.bounds.y - 60,
            width: sec.bounds.width + 120,
            height: sec.bounds.height + 120,
          },
          { duration: 800, padding: 0.1 }
        );
      }
    } else {
      fitView({ duration: 800, padding: 0.08 });
    }
  }, [selectedSectionId, fitBounds, fitView]);

  // Trigger fit view from Navbar button
  useEffect(() => {
    if (fitViewTrigger && fitViewTrigger > 0) {
      fitView({ duration: 700, padding: 0.08 });
    }
  }, [fitViewTrigger, fitView]);

  // Focus on specific node if passed
  useEffect(() => {
    if (focusedNodeIdToAnimate) {
      const node = WORKFLOW_NODES.find((n) => n.id === focusedNodeIdToAnimate);
      if (node) {
        setCenter(node.position.x + 120, node.position.y + 40, { zoom: 1.25, duration: 700 });
      }
    }
  }, [focusedNodeIdToAnimate, setCenter]);

  // Node Click Handlers
  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.type === 'section_group') return;
      onSelectNode(node.data as unknown as WorkflowNodeData);
    },
    [onSelectNode]
  );

  const handleNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'section_group') return;
    setHoveredNodeId(node.id);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null);
  }, []);

  const handlePaneClick = useCallback(() => {
    onSelectNode(null);
    setHoveredNodeId(null);
  }, [onSelectNode]);

  // Custom Minimap node colors
  const minimapNodeColor = useCallback((node: Node) => {
    if (node.type === 'section_group') return 'transparent';
    const nData = node.data as unknown as WorkflowNodeData;
    const sec = WORKFLOW_SECTIONS.find((s) => s.id === nData?.sectionId);
    return sec?.color.accent || '#3b82f6';
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-100/70 dark:bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        onPaneClick={handlePaneClick}
        minZoom={0.12}
        maxZoom={2.8}
        defaultViewport={{ x: 50, y: 50, zoom: 0.55 }}
        selectionMode={SelectionMode.Partial}
        fitViewOptions={{ padding: 0.08 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color={isDark ? '#334155' : '#cbd5e1'}
        />

        <Controls
          showInteractive={false}
          className="!bottom-6 !left-6"
        />

        {showMinimap && (
          <MiniMap
            nodeColor={minimapNodeColor}
            nodeStrokeWidth={2}
            nodeBorderRadius={4}
            maskColor={isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(240, 244, 248, 0.7)'}
            className="!bottom-6 !right-6 hidden md:block"
            zoomable
            pannable
          />
        )}
      </ReactFlow>

      {/* Floating Canvas Quick Status Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => fitView({ duration: 600, padding: 0.08 })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Fit Entire Flowchart"
        >
          <Focus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Fit Screen</span>
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

        <button
          onClick={() => setShowMinimap(!showMinimap)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            showMinimap
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Toggle Navigator Minimap"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Minimap</span>
        </button>

        {selectedSectionId && (
          <>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-100/70 dark:bg-blue-900/50 text-[11px] font-bold text-blue-800 dark:text-blue-200">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    WORKFLOW_SECTIONS.find((s) => s.id === selectedSectionId)?.color.accent || '#2563eb',
                }}
              />
              <span className="truncate max-w-[180px]">
                {WORKFLOW_SECTIONS.find((s) => s.id === selectedSectionId)?.shortTitle}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner {...props} />
    </ReactFlowProvider>
  );
};
