import React, { useState } from 'react';
import { mockWatchlist } from '@/lib/mockData';
import { Activity, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopBar({ isConnected }: { isConnected?: boolean }) {
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="h-full flex items-center justify-between px-4 bg-terminal-panel">
      <div className="flex items-center space-x-6 overflow-hidden">
        <div className="flex items-center space-x-2 text-terminal-green font-mono font-bold shrink-0">
          <Activity size={18} />
          <span>HFT_TERMINAL_V4</span>
        </div>
        
        {/* Ticker Tape */}
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
          {mockWatchlist.map((coin) => (
            <div key={coin.symbol} className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-terminal-muted font-mono text-sm">{coin.symbol}</span>
              <span className="font-mono text-sm">{coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className={cn(
                "font-mono text-xs",
                coin.change >= 0 ? "text-terminal-green" : "text-terminal-red"
              )}>
                {coin.change >= 0 ? '+' : ''}{coin.change}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center shrink-0 ml-4">
        {/* Broker Connection Status */}
        <div className="flex items-center space-x-2 mr-6 pr-6 border-r border-terminal-border">
          <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-terminal-green animate-pulse" : "bg-terminal-red")} />
          <span className={cn("text-xs font-mono font-bold tracking-wider", isConnected ? "text-terminal-green" : "text-terminal-red")}>
            {isConnected ? "BROKER CONNECTED" : "DISCONNECTED"}
          </span>
        </div>

        {/* Demo / Live Toggle */}
        <div className="flex items-center space-x-3">
          <span className={cn("text-xs font-mono font-bold", !isLive ? "text-terminal-text" : "text-terminal-muted")}>PAPER</span>
          <button 
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none",
              isLive ? "bg-terminal-green" : "bg-terminal-border"
            )}
          >
            <div className={cn(
              "w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out",
              isLive ? "translate-x-6" : "translate-x-0"
            )} />
          </button>
          <span className={cn("text-xs font-mono font-bold flex items-center gap-1", isLive ? "text-terminal-green" : "text-terminal-muted")}>
            {isLive && <Radio size={12} className="animate-pulse" />}
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
