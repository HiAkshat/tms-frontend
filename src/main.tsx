import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store.ts';

import './index.css'

import SystemUserDashboard from './pages/systemUserDashboard/systemUserDashboard.tsx';
import TicketDetails from './pages/ticketDetails/ticketDetails.tsx';
import Login from './pages/login/login.tsx';
import ManageOrganisations from './pages/manageOrganisations/manageOrganisations.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="manageOrganisations" element={<ManageOrganisations />} />
              <Route path="systemDashboard" element={<SystemUserDashboard />} />

              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
