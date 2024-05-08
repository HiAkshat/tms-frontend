import { useEffect, useState } from "react"
import showToast from "../../atoms/Toast/Toast"
import Navbar from "../../organisms/Navbar/navbar"
import NewTicketForm from "../../organisms/NewTicketForm/NewTicketForm"
import styles from "./index.module.scss"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RsuiteTable from "../../organisms/RsuiteTableTicket/RsuiteTableTicket"
import ticketServices from "../../services/ticket/index"
import { StateType } from "../../typings/navUser"

export default function ViewTickets() {
  const navigate = useNavigate()
  const user = useSelector((state: StateType) => state.user)
  const [tickets, setTickets] = useState<[TicketType]>()

  useEffect(()=>{
    if (!(user.isAuthenticated && user.userType=='organisation')){
      showToast("Login as organisation user to access!")
      navigate("../login")
    }

    ticketServices.getOrgTickets(user.organisation_id).then((data)=>setTickets(data))
  }, [])

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewTicketForm />
        <div className={styles.tableDiv}>
          <span>Tickets Table</span>
          {tickets && <RsuiteTable data={tickets}/>}
        </div>
      </div>
    </div>
  )
}
