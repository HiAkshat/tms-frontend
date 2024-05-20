import { useEffect, useState } from "react"
import showToast from "../../atoms/Toast/Toast"
import Navbar from "../../organisms/Navbar/navbar"
import NewTicketForm from "../../organisms/newTicketForm/newTicketForm"
import styles from "./index.module.scss"
import { useNavigate } from "react-router-dom"
import RsuiteTable from "../../organisms/RsuiteTableTicket/RsuiteTableTicket"
import Cookie from "js-cookie"
import verifyTokenServices from "../../services/verifyToken"

import socket from "../../socket/socket"
import { useDispatch } from "react-redux"
import { updateOrganisation } from "../../redux/userSlice"

export default function ViewTickets() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    socket.on('newticket', (data) => {
      // showToast(`New Ticket YIPEEE: ${data.message}`)
      // Display toast or notification for the new ticket
    });

    verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then(res=>{
      if (!(res.valid && res.userType=='organisation')){
        showToast("Login as organisation user to access!")
        navigate("../login")
      }

      else {
        dispatch(updateOrganisation(Cookie.get("organisation")))
      }
    })
  }, [])

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewTicketForm setIsLoading={setIsLoading}/>
        <div className={styles.tableDiv}>
          <span>Tickets Table</span>
          <RsuiteTable isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
      </div>
    </div>
  )
}
