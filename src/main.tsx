import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.ts';

import 'rsuite/dist/rsuite.min.css';
import './index.css'
import AppRoutes from './routes.tsx';

import { CustomProvider } from 'rsuite';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider theme="dark">
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </CustomProvider>
  </React.StrictMode>,
)
