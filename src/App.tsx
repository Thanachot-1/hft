/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TerminalGrid } from './components/layout/TerminalGrid';
import { TopBar } from './components/TopBar';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';
import { BottomPanel } from './components/BottomPanel';

export default function App() {
  return (
    <TerminalGrid
      topBar={<TopBar />}
      leftPanel={<LeftPanel />}
      centerPanel={<CenterPanel />}
      rightPanel={<RightPanel />}
      bottomPanel={<BottomPanel />}
    />
  );
}
