import { createRoot } from 'react-dom/client';

import '@/i18n';
import '@/styles/index.css';

import GameApp from '@/apps/GameApp/GameApp.tsx';

createRoot(document.getElementById('root')!).render(<GameApp />);
