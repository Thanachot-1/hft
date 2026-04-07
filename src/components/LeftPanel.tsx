import React from 'react';
import { PanelHeader, PanelContent } from './layout/TerminalGrid';
import { mockWatchlist } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

export function LeftPanel() {
  return (
    <>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <BrainCircuit size={16} className="text-terminal-green" />
          <span>Market & AI State</span>
        </div>
      </PanelHeader>
      <PanelContent className="p-0">
        <div className="flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-[3fr_2fr_2fr] gap-2 px-4 py-2 border-b border-terminal-border text-xs text-terminal-muted font-mono">
            <div>SYMBOL</div>
            <div className="text-right">PRICE</div>
            <div className="text-right">AI CONF</div>
          </div>
          
          {/* Watchlist Items */}
          <div className="flex flex-col">
            {mockWatchlist.map((coin) => (
              <div 
                key={coin.symbol} 
                className="grid grid-cols-[3fr_2fr_2fr] gap-2 px-4 py-3 border-b border-terminal-border/50 hover:bg-terminal-border/30 cursor-pointer transition-colors items-center"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-bold">{coin.symbol}</span>
                  <span className={cn(
                    "font-mono text-xs",
                    coin.aiSignal === 'BUY' ? "text-terminal-green" : 
                    coin.aiSignal === 'SELL' ? "text-terminal-red" : "text-terminal-muted"
                  )}>
                    {coin.aiSignal}
                  </span>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm">{coin.price.toLocaleString()}</span>
                  <span className={cn(
                    "font-mono text-xs",
                    coin.change >= 0 ? "text-terminal-green" : "text-terminal-red"
                  )}>
                    {coin.change >= 0 ? '+' : ''}{coin.change}%
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-sm">{coin.confidence}%</span>
                  {/* Confidence Meter */}
                  <div className="w-full h-1.5 bg-terminal-border rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        coin.confidence >= 80 ? "bg-terminal-green" :
                        coin.confidence >= 50 ? "bg-yellow-500" : "bg-terminal-red"
                      )}
                      style={{ width: `${coin.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PanelContent>
    </>
  );
}
