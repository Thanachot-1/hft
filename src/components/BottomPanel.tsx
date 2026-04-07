import React, { useState, useEffect } from 'react';
import { PanelHeader, PanelContent } from './layout/TerminalGrid';
import { mockLogs, mockOpenPositions } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'POSITIONS' | 'HISTORY' | 'LOGS';

export function BottomPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('POSITIONS');
  const [pnlEvents, setPnlEvents] = useState<{ id: number; amount: number; isProfit: boolean }[]>([]);

  // Simulate random PnL events for gamification
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const isProfit = Math.random() > 0.4;
        const amount = Math.floor(Math.random() * 500) + 10;
        const newEvent = { id: Date.now(), amount, isProfit };
        
        setPnlEvents(prev => [...prev, newEvent]);
        
        // Remove event after animation
        setTimeout(() => {
          setPnlEvents(prev => prev.filter(e => e.id !== newEvent.id));
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PanelHeader className="p-0 border-b-0">
        <div className="flex h-full">
          {(['POSITIONS', 'HISTORY', 'LOGS'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 h-full flex items-center text-xs font-mono font-bold tracking-wider border-r border-terminal-border transition-colors",
                activeTab === tab 
                  ? "bg-terminal-bg text-terminal-text border-t-2 border-t-terminal-green" 
                  : "bg-terminal-panel text-terminal-muted hover:text-terminal-text border-t-2 border-t-transparent"
              )}
            >
              {tab === 'LOGS' && <Terminal size={14} className="mr-2" />}
              {tab}
            </button>
          ))}
        </div>
      </PanelHeader>
      
      <PanelContent className="p-0 bg-terminal-bg relative">
        {/* PnL Gamification Animations */}
        <div className="absolute right-8 bottom-8 pointer-events-none z-50">
          <AnimatePresence>
            {pnlEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -50, scale: 1.2 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={cn(
                  "absolute bottom-0 right-0 font-mono font-bold text-lg whitespace-nowrap",
                  event.isProfit ? "text-terminal-green" : "text-terminal-red"
                )}
              >
                {event.isProfit ? '+' : '-'}${event.amount.toFixed(2)} {event.isProfit ? '🤑🚀' : '🩸😭'}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {activeTab === 'POSITIONS' && (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-terminal-panel/80 backdrop-blur text-xs text-terminal-muted font-mono uppercase">
              <tr>
                <th className="p-3 font-normal">Symbol</th>
                <th className="p-3 font-normal">Type</th>
                <th className="p-3 font-normal text-right">Size</th>
                <th className="p-3 font-normal text-right">Entry Price</th>
                <th className="p-3 font-normal text-right">Mark Price</th>
                <th className="p-3 font-normal text-right">PnL (ROE%)</th>
                <th className="p-3 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono divide-y divide-terminal-border/50">
              {mockOpenPositions.map(pos => (
                <tr key={pos.id} className="hover:bg-terminal-border/20 transition-colors">
                  <td className="p-3 font-bold">{pos.symbol}</td>
                  <td className={cn("p-3 font-bold", pos.type === 'LONG' ? "text-terminal-green" : "text-terminal-red")}>
                    {pos.type}
                  </td>
                  <td className="p-3 text-right">{pos.size}</td>
                  <td className="p-3 text-right">{pos.entry.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 text-right">{(pos.entry * 1.02).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className={cn("p-3 text-right", pos.pnl >= 0 ? "text-terminal-green" : "text-terminal-red")}>
                    {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)} ({pos.pnlPercent.toFixed(2)}%)
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-xs px-2 py-1 bg-terminal-border hover:bg-terminal-muted/30 rounded transition-colors">
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'LOGS' && (
          <div className="p-4 font-mono text-sm flex flex-col gap-1">
            {mockLogs.map(log => (
              <div key={log.id} className="flex gap-4 hover:bg-terminal-border/20 px-2 py-1 rounded">
                <span className="text-terminal-muted shrink-0">{log.time}</span>
                <span className={cn(
                  "shrink-0 w-16",
                  log.type === 'INFO' ? "text-blue-400" :
                  log.type === 'TRADE' ? "text-terminal-green" :
                  log.type === 'WARN' ? "text-yellow-400" : "text-terminal-red"
                )}>
                  [{log.type}]
                </span>
                <span className="text-terminal-text">{log.message}</span>
              </div>
            ))}
            <div className="flex gap-4 px-2 py-1 mt-2">
              <span className="text-terminal-green animate-pulse">_</span>
            </div>
          </div>
        )}

        {activeTab === 'HISTORY' && (
          <div className="p-8 text-center text-terminal-muted font-mono">
            No recent order history.
          </div>
        )}
      </PanelContent>
    </>
  );
}
