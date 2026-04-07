import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalGridProps {
  topBar: React.ReactNode;
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  bottomPanel: React.ReactNode;
}

export function TerminalGrid({
  topBar,
  leftPanel,
  centerPanel,
  rightPanel,
  bottomPanel,
}: TerminalGridProps) {
  return (
    <div className="h-screen w-screen bg-terminal-bg text-terminal-text overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="h-12 border-b border-terminal-border shrink-0">
        {topBar}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[280px] border-r border-terminal-border shrink-0 flex flex-col overflow-hidden">
          {leftPanel}
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {centerPanel}
        </div>

        {/* Right Panel */}
        <div className="w-[320px] border-l border-terminal-border shrink-0 flex flex-col overflow-hidden">
          {rightPanel}
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="h-[280px] border-t border-terminal-border shrink-0 flex flex-col overflow-hidden">
        {bottomPanel}
      </div>
    </div>
  );
}

export function PanelHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("h-10 px-4 flex items-center border-b border-terminal-border bg-terminal-panel/50 shrink-0 text-xs font-semibold tracking-wider text-terminal-muted uppercase", className)}>
      {children}
    </div>
  );
}

export function PanelContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4", className)}>
      {children}
    </div>
  );
}
