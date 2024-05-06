import { useEffect } from "react"
import showToast from "../../atoms/Toast/Toast"
import Navbar from "../../organisms/Navbar/navbar"
import NewTicketForm from "../../organisms/NewTicketForm/NewTicketForm"
import TicketTable from "../../organisms/TicketTable/TicketTable"
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
      navigate("../login")
    }
  })

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewTicketForm />
        <div className={styles.tableDiv}>
          <span>Tickets Table</span>
          {!tickets.isLoading && <TicketTable data={tickets.data}/>}
        </div>
      </div>
    </div>
  )
}
