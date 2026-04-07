/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TerminalGrid } from './components/layout/TerminalGrid';
import { TopBar } from './components/TopBar';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';
import { BottomPanel } from './components/BottomPanel';

export default function App() {
  const [isBrokerConnected, setIsBrokerConnected] = useState(false);

  return (
    <TerminalGrid
      topBar={<TopBar isConnected={isBrokerConnected} />}
      leftPanel={<LeftPanel />}
      centerPanel={<CenterPanel />}
      rightPanel={<RightPanel isConnected={isBrokerConnected} setIsConnected={setIsBrokerConnected} />}
      bottomPanel={<BottomPanel />}
    />
  );
}
