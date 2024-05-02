import { useParams } from "react-router-dom"
import { getData } from "../../services/getData"
import Navbar from "../../organisms/navbar/navbar"
import styles from "./index.module.scss"

export default function TicketDetails() {
  const {id} = useParams()
  const ticket_details = getData(`http://localhost:8000/api/ticket/${id}`)
  console.log(ticket_details)

  function formattedDate(dateString: string) {
    const date = new Date(dateString);
  
    // Extract date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
  
    // Format as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }

  return (
    <div className={styles.page}>
      <Navbar />
      {!ticket_details.isLoading &&
        <div className={styles.main}>
          <div className={styles.ticketDiv}>
            <span className={styles.title}>Ticket {ticket_details.data.key}</span>
            <div className={styles.rowDiv}>
              <span>Created <span>{formattedDate(ticket_details.data.createdAt)}</span></span>
              <span>Last updated <span>{formattedDate(ticket_details.data.updatedAt)}</span></span>
              <span>Type <span>Story</span></span>
            </div>
            <div className={styles.colDiv}>
              {ticket_details.data.assignee && <span>Assignee <span>{`${ticket_details.data.assignee.first_name} ${ticket_details.data.assignee.last_name}`}</span></span>}
              {ticket_details.data.reporter && <span>Reporter <span>{`${ticket_details.data.reporter.first_name} ${ticket_details.data.reporter.last_name}`}</span></span>}
            </div>
            <div className={styles.colDiv}>
              <span>Current Status <span>{ticket_details.data.status}</span></span>
              <span>Due Date <span>{formattedDate(ticket_details.data.due_date)}</span></span>
            </div>
            <div className={styles.colDiv}>
              <span>Description</span>
              <p className={styles.desc}>{ticket_details.data.description}</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
