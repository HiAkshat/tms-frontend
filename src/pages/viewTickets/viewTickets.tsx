import Navbar from "../../organisms/navbar/navbar"
import NewTicketForm from "../../organisms/newTicketForm/newTicketForm"
import TicketTable from "../../organisms/ticketTable/ticketTable"
import { getData } from "../../services/getData"
import styles from "./index.module.scss"
import { useSelector } from "react-redux"

// <div className={styles.page}>
// <Navbar />
// <div className={styles.main}>
//   <NewUserForm />
//   <div className={styles.tableDiv}>
//     <span>Users Table</span>
//     {!users.isLoading && <UserTable data={users.data}/>}
//   </div>
// </div>
// </div>
export default function ViewTickets() {
  const user = useSelector((state: any) => state.user)
  const tickets = getData(`http://localhost:8000/api/ticket/organisation/${user.organisation_id}`)

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewTicketForm />
        <div className={styles.tableDiv}>
          <span>Tickets</span>
          {!tickets.isLoading && <TicketTable data={tickets.data}/>}
        </div>
      </div>
    </div>
  )
}
