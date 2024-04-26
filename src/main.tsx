import React from 'react'
import ReactDOM from 'react-dom/client'
import { CustomProvider } from 'rsuite';
import App from './App.tsx'
import './index.css'
import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';

import SystemUserDashboard from './pages/systemUserDashboard/systemUserDashboard.tsx';
import TicketDetails from './pages/ticketDetails/ticketDetails.tsx';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SystemUserDashboard />}>
      <Route path="/ticket/:id" element={<TicketDetails />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider theme="dark">
      <RouterProvider router={router} />
    </CustomProvider>
  </React.StrictMode>,
)
