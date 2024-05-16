import { BrowserRouter, Routes, Route } from "react-router-dom";

import SystemUserDashboard from './pages/SystemUserDashboard/SystemUserDashboard.tsx';
import TicketDetails from './pages/TicketDetails/TicketDetails.tsx';
import Login from './pages/Login/Login.tsx';
import ManageOrganisations from './pages/ManageOrganisations/ManageOrganisations.tsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.tsx';
import NewTicketForm from './organisms/NewTicketForm/NewTicketForm.tsx';
import EditOrganisation from './organisms/EditOrganisation/EditOrganisation.tsx';
import EditUser from './organisms/EditUser/EditUser.tsx';
import ViewTickets from './pages/viewTickets/viewTickets.tsx';
import EditTicket from "./organisms/EditTicket/EditTicket.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="manageOrganisations">
            <Route index element={<ManageOrganisations />} />
            <Route path="edit/:id" element={<EditOrganisation />} />
          </Route>
          <Route path="systemDashboard" element={<SystemUserDashboard />} />
          <Route path="manageUsers">
            <Route index element={<ManageUsers />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
          <Route path="viewTickets" element={<ViewTickets />} />
          <Route path="newTicket" element={<NewTicketForm />} />
          <Route path="ticket/:id" element={<TicketDetails />} />
          <Route path="ticket/edit/:id" element={<EditTicket />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}