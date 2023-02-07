import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '@vkontakte/vkui/dist/components.css';
import '@vkontakte/vkui/dist/vkui.css';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import App from 'components/App';
import store from 'store';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider hasPointer>
        <Provider store={store}>
          <App />
        </Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
);

bridge.send('VKWebAppInit');

//import('./eruda.js').then(({ default: eruda }) => {});
