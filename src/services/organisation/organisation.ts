import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"
import {OrganisationType} from "./types"
import axios from "axios"

const apiEndpoint = `${server}/organisation`

export const getOrganisations = async (page: string="", pageSize: string="", sortBy: string="") => {
  const sortByString = `&sortBy=${sortBy}`
  const res = await axios
    .get(`${apiEndpoint}?page=${page}&pageSize=${pageSize}${sortBy!="" && sortByString}`)
    .then(res => {return res.data})
    .catch(error => {throw error})

  return res
}

export const getOrganisation = async (id: string|undefined) => {
  const res = await axios
    .get(`${apiEndpoint}/${id}`)
    .then(res => {return res.data})
    .catch(error => {throw error})

  return res
}

export const addNewOrganisation = async (organisation: OrganisationType) => {
  await axios
    .post(`${apiEndpoint}`, organisation)
    .then(()=>{
      showToast("Organisation added successfully!")
    }).catch((error) => {
      showToast("Error adding organisation!")
      throw error
    })
}

export const editOrganisation = async (organisation: OrganisationType, id: string|undefined) => {
  await axios
    .put(`${apiEndpoint}/${id}`, organisation)
    .then(()=>{
      showToast("Organisation edited successfully!")
    })
    .catch((error)=>{
      showToast("Error editing organisation!")
      throw error
    })
}

export const deleteOrganisation = async (id: string|undefined) => {
  await axios
    .delete(`${apiEndpoint}/${id}`)
    .then(()=>{
      showToast("Organisation deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting organisation!")
      throw error
    })
}
