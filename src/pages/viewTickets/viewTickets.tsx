import Navbar from "../../organisms/navbar/navbar"
import NewTicketForm from "../../organisms/newTicketForm/newTicketForm"
import TicketTable from "../../organisms/ticketTable/ticketTable"
import { getData } from "../../services/getData"

export default function ViewTickets() {
  const tickets = getData("http://localhost:8000/api/ticket")

  return (
    <div>
      <Navbar />
      <div>
        <NewTicketForm />
        {!tickets.isLoading && <TicketTable data={tickets.data}/>}
      </div>
    </div>
  )
}
