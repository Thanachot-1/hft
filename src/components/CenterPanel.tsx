import React, { useState, useMemo } from 'react';
import { PanelHeader, PanelContent } from './layout/TerminalGrid';
import { TradingChart } from './charts/TradingChart';
import { generateMockCandles, generateMockMarkers } from '@/lib/mockData';
import { LayoutDashboard, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const TIMEFRAMES = ['15s', '1m', '5m', '15m', '1h', '4h'];

export function CenterPanel() {
  const [splitView, setSplitView] = useState(false);
  const [timeframe, setTimeframe] = useState('15s');

  // Generate some stable mock data
  const chart1Data = useMemo(() => generateMockCandles(200, 850.50), []);
  const chart1Markers = useMemo(() => generateMockMarkers(chart1Data), [chart1Data]);

  const chart2Data = useMemo(() => generateMockCandles(200, 175.20), []);
  const chart2Markers = useMemo(() => generateMockMarkers(chart2Data), [chart2Data]);

  return (
    <>
      <PanelHeader className="justify-between bg-terminal-panel">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-terminal-text font-bold">NVDA</span>
            <span className="text-terminal-green">850.50</span>
          </div>
          
          <div className="h-4 w-px bg-terminal-border" />
          
          <div className="flex items-center gap-1">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={cn(
                  "px-2 py-1 rounded text-xs font-mono transition-colors",
                  timeframe === tf 
                    ? "bg-terminal-border text-terminal-text" 
                    : "text-terminal-muted hover:text-terminal-text"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSplitView(!splitView)}
            className={cn(
              "p-1.5 rounded transition-colors",
              splitView ? "bg-terminal-border text-terminal-text" : "text-terminal-muted hover:text-terminal-text"
            )}
            title="Split View"
          >
            <LayoutDashboard size={16} />
          </button>
          <button className="p-1.5 rounded text-terminal-muted hover:text-terminal-text transition-colors" title="Fullscreen">
            <Maximize2 size={16} />
          </button>
        </div>
      </PanelHeader>
      
      <PanelContent className="p-0 flex flex-col bg-terminal-bg">
        {splitView ? (
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-terminal-border">
            <div className="flex-1 flex flex-col relative">
              <div className="absolute top-4 left-4 z-10 font-mono text-sm text-terminal-muted bg-terminal-bg/80 px-2 py-1 rounded">NVDA</div>
              <TradingChart data={chart1Data} markers={chart1Markers} />
            </div>
            <div className="flex-1 flex flex-col relative">
              <div className="absolute top-4 left-4 z-10 font-mono text-sm text-terminal-muted bg-terminal-bg/80 px-2 py-1 rounded">TSLA</div>
              <TradingChart data={chart2Data} markers={chart2Markers} />
            </div>
          </div>
        ) : (
          <div className="flex-1 relative">
            <TradingChart data={chart1Data} markers={chart1Markers} />
          </div>
        )}
      </PanelContent>
    </>
  );
}
