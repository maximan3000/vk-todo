import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import bridge from '@vkontakte/vk-bridge';

import '@vkontakte/vkui/dist/components.css';
import '@vkontakte/vkui/dist/vkui.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);

bridge.send('VKWebAppInit');
