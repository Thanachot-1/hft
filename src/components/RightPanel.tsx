import React, { useState } from 'react';
import { PanelHeader, PanelContent } from './layout/TerminalGrid';
import { mockPortfolio } from '@/lib/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Settings, ShieldAlert, Key, Wallet, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightPanelProps {
  isConnected?: boolean;
  setIsConnected?: (val: boolean) => void;
}

export function RightPanel({ isConnected = false, setIsConnected }: RightPanelProps) {
  const [capital, setCapital] = useState('100000');
  const [risk, setRisk] = useState('2.0');
  const [alpacaKey, setAlpacaKey] = useState('');
  const [alpacaSecret, setAlpacaSecret] = useState('');

  return (
    <>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <Settings size={16} className="text-terminal-muted" />
          <span>Control & Allocation</span>
        </div>
      </PanelHeader>
      
      <PanelContent className="flex flex-col gap-6">
        {/* API Config / Sign-In */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-terminal-muted uppercase tracking-wider flex items-center gap-2">
            <Key size={14} />
            Alpaca Authentication
          </h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-terminal-muted font-mono">Alpaca API Key ID</label>
            <input 
              type="password" 
              value={alpacaKey}
              onChange={(e) => setAlpacaKey(e.target.value)}
              placeholder="PK..."
              disabled={isConnected}
              className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 text-sm font-mono text-terminal-text focus:outline-none focus:border-terminal-green transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-terminal-muted font-mono">Alpaca Secret Key</label>
            <input 
              type="password" 
              value={alpacaSecret}
              onChange={(e) => setAlpacaSecret(e.target.value)}
              placeholder="SK..."
              disabled={isConnected}
              className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 text-sm font-mono text-terminal-text focus:outline-none focus:border-terminal-green transition-colors disabled:opacity-50"
            />
          </div>

          <button 
            onClick={() => setIsConnected?.(!isConnected)}
            className={cn(
              "w-full py-2 rounded font-mono text-xs font-bold transition-colors uppercase tracking-wider mt-1",
              isConnected 
                ? "bg-terminal-border text-terminal-text hover:bg-terminal-border/80" 
                : "bg-terminal-green text-terminal-bg hover:bg-terminal-green/90"
            )}
          >
            {isConnected ? "Disconnect Broker" : "Connect to Alpaca"}
          </button>
        </div>

        <div className="h-px bg-terminal-border w-full" />

        {/* Account Overview */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-terminal-muted uppercase tracking-wider flex items-center gap-2">
            <Wallet size={14} />
            Account Overview
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-terminal-bg border border-terminal-border rounded p-3 flex flex-col gap-1">
              <span className="text-[10px] text-terminal-muted font-mono uppercase">Total Equity</span>
              <span className="text-sm font-mono font-bold text-terminal-text">$125,000.00</span>
            </div>
            <div className="bg-terminal-bg border border-terminal-border rounded p-3 flex flex-col gap-1">
              <span className="text-[10px] text-terminal-muted font-mono uppercase">Buying Power</span>
              <span className="text-sm font-mono font-bold text-terminal-green">$80,000.00</span>
            </div>
          </div>

          <a 
            href="https://app.alpaca.markets/brokerage/dashboard/overview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2 bg-terminal-bg hover:bg-terminal-border/50 text-terminal-text border border-terminal-border rounded font-mono text-xs font-bold transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Manage Funds / Withdraw
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="h-px bg-terminal-border w-full" />

        {/* Order Entry / Config */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-terminal-muted uppercase tracking-wider">Risk Parameters</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-terminal-muted font-mono">Max Total Capital (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-muted font-mono text-sm">$</span>
              <input 
                type="text" 
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 pl-7 text-sm font-mono text-terminal-text focus:outline-none focus:border-terminal-green transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-terminal-muted font-mono">Risk Per Trade (%)</label>
            <div className="relative">
              <input 
                type="text" 
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 pr-7 text-sm font-mono text-terminal-text focus:outline-none focus:border-terminal-green transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-terminal-muted font-mono text-sm">%</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-terminal-border w-full" />

        {/* Portfolio Stack */}
        <div className="flex flex-col gap-4 flex-1 min-h-[200px]">
          <h3 className="text-xs font-semibold text-terminal-muted uppercase tracking-wider">Portfolio Stack</h3>
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPortfolio}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {mockPortfolio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#181A20', borderColor: '#2B3139', color: '#EAECEF', fontFamily: 'Roboto Mono' }}
                  itemStyle={{ color: '#EAECEF' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-terminal-muted font-mono">TOTAL</span>
              <span className="text-sm font-bold font-mono">$100K</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {mockPortfolio.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-mono">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-terminal-muted">{item.name}</span>
                <span className="ml-auto">{(item.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-terminal-border w-full" />

        {/* Manual Override */}
        <div className="flex flex-col gap-4 mt-auto">
          <h3 className="text-xs font-semibold text-terminal-red uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={14} />
            Manual Override
          </h3>
          <button className="w-full py-3 bg-terminal-red/10 hover:bg-terminal-red/20 text-terminal-red border border-terminal-red/30 rounded font-mono text-sm font-bold transition-colors uppercase tracking-wider">
            Close All Positions
          </button>
        </div>
      </PanelContent>
    </>
  );
}
