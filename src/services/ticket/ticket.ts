import axios from "axios"
import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

const apiEndpoint = `${server}/ticket/`

export const getOrgTickets = async (id: string|undefined,page: number=1, pageSize: number=10, sortBy: string="", filters: any={}) => {
  Object.keys(filters).forEach(key => filters[key] === undefined || filters[key] === null || filters[key] === "" ? delete filters[key] : {});
  console.log(filters)
  let sortByString=""
  if (sortBy!=""){
    sortByString = `&sortBy=${sortBy}`
  }

  const filterQuery = new URLSearchParams(filters).toString() ?? ""

  const res = await axios
    .get(apiEndpoint+`organisation/${id}?page=${page}&pageSize=${pageSize}${sortByString}&${filterQuery}`)
    // .get(apiEndpoint+`organisation/${id}`)
    .then(res => {
      return res.data
    })
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

export const addTicket = async (ticket: SendTicketType) => {
  await axios
    .post(apiEndpoint, ticket)
    .then(()=>{
      showToast("Ticket added successfully!")
    }).catch((error) => {
      showToast("Error adding ticket!")
      throw error
    })
}

export const editTicket = async (ticket: SendTicketType, id: string|undefined) => {
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

export const downloadFile = async (filename: string) => {
  window.open(apiEndpoint+`download/${filename}`, '_blank')
}
