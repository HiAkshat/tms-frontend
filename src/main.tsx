import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CustomProvider } from 'rsuite';

import { Provider } from 'react-redux';
import store from './redux/store.ts';

import './index.css'
import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';

import SystemUserDashboard from './pages/systemUserDashboard/systemUserDashboard.tsx';
import TicketDetails from './pages/ticketDetails/ticketDetails.tsx';
import Login from './pages/login/login.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomProvider theme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<SystemUserDashboard />} />
              <Route path="login" element={<Login />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
        </CustomProvider>
    </Provider>
  </React.StrictMode>,
)
