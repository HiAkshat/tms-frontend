import { BrowserRouter, Routes, Route } from "react-router-dom";

import SystemUserDashboard from './pages/systemUserDashboard/systemUserDashboard.tsx';
import TicketDetails from './pages/ticketDetails/ticketDetails.tsx';
import Login from './pages/login/login.tsx';
import ManageOrganisations from './pages/manageOrganisations/manageOrganisations.tsx';
import ManageUsers from './pages/manageUsers/manageUsers.tsx';
import NewTicketForm from './organisms/newTicketForm/newTicketForm.tsx';
import EditOrganisation from './organisms/editOrganisation/editOrganisation.tsx';
import EditUser from './organisms/editUser/editUser.tsx';
import ViewTickets from './pages/viewTickets/viewTickets.tsx';
import EditTicket from "./organisms/editTicket/editTicket.tsx";

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
