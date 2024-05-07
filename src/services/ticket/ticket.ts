import axios from "axios"
import { TicketType } from "./types"
import showToast from "../../atoms/Toast/Toast"

const apiEndpoint = "http://127.0.0.1:8000/api/ticket/"

export const getOrgTickets = async (id: string|undefined) => {
  const res = await axios
    .get(apiEndpoint+`organisation/${id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const getTicket = async (id: string|undefined) => {
  const res = await axios
    .get(apiEndpoint+`${id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const addTicket = async (ticket: TicketType) => {
  await axios
    .post(apiEndpoint, ticket)
    .then(()=>{
      showToast("Ticket added successfully!")
    }).catch((error) => {
      showToast("Error adding ticket!")
      throw error
    })
}

export const editTicket = async (ticket: TicketType, id: string|undefined) => {
  await axios
    .put(apiEndpoint+`${id}`, ticket)
    .then(()=>{
      showToast("Ticket edited successfully!")
    })
    .catch((error)=>{
      showToast("Error editing ticket!")
      throw error
    })
}

export const deleteTicket = async (id: string|undefined) => {
  await axios
    .delete(apiEndpoint+`${id}`)
    .then(()=>{
      showToast("Ticket deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting ticket!")
      throw error
    })
}
