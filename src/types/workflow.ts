export type NodeType =
  | 'start'
  | 'terminal'
  | 'process'
  | 'decision'
  | 'channel'
  | 'kpi_card'
  | 'report'
  | 'lock'
  | 'rule_card'
  | 'section_group';

export interface WorkflowSection {
  id: string;
  number: number | string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'core' | 'governance' | 'analytics';
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    accent: string;
    lightBg: string;
  };
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface WorkflowNodeData {
  id: string;
  label: string;
  sectionId: string;
  type: NodeType;
  description?: string;
  decisionQuestion?: string;
  decisionBranches?: {
    yes?: string;
    no?: string;
    custom?: { label: string; targetId: string }[];
  };
  incoming: string[];
  outgoing: string[];
  businessRuleIds?: number[];
  roleAccess?: 'Staff' | 'Admin' | 'Both' | 'System';
  isLocked?: boolean;
  statusBadge?: string;
  kpiDetails?: {
    label: string;
    items: string[];
  };
}

export interface WorkflowEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'decision_yes' | 'decision_no' | 'cross_section' | 'return_loop';
  animated?: boolean;
  style?: React.CSSProperties;
}

export interface BusinessRule {
  id: number;
  number: number;
  title: string;
  rule: string;
  category: 'Identity' | 'Immutability' | 'Lifecycle' | 'Performance' | 'Alerts' | 'Security';
  details: string;
  impact: string;
}
