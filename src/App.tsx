/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TodoApp from './components/TodoApp';
import { BackgroundEffect, ClickRipples } from './components/Effects';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] font-sans selection:bg-[#d9ff00] selection:text-black relative overflow-hidden">
      <BackgroundEffect />
      <ClickRipples />
      <div className="relative z-10 min-h-screen">
        <TodoApp />
      </div>
    </div>
  );
}

