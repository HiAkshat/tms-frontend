import { useEffect } from "react"
import showToast from "../../atoms/toast/toast"
import Navbar from "../../organisms/navbar/navbar"
import NewTicketForm from "../../organisms/newTicketForm/newTicketForm"
import TicketTable from "../../organisms/ticketTable/ticketTable"
import { getData } from "../../services/getData"
import styles from "./index.module.scss"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function ViewTickets() {
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)

  const tickets = getData(`http://localhost:8000/api/ticket/organisation/${user.organisation_id}`)

  useEffect(()=>{
    if (!(user.isAuthenticated && user.userType=='organisation')){
      showToast("Login as organisation user to access!")
      console.log("HEY")
      navigate("../login")
    }
  })

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
