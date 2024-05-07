import showToast from "../../atoms/Toast/Toast"
import {OrganisationType} from "./types"
import axios from "axios"

export const getOrganisations = async () => {
  const res = await axios
    .get("http://127.0.0.1:8000/api/organisation")
    .then(res => {return res.data})
    .catch(error => {throw error})

  return res
}

export const getOrganisation = async (id: string|undefined) => {
  const res = await axios
    .get(`http://127.0.0.1:8000/api/organisation/${id}`)
    .then(res => {return res.data})
    .catch(error => {throw error})

  return res
} 

export const addNewOrganisation = async (organisation: OrganisationType) => {
  await axios
    .post("http://127.0.0.1:8000/api/organisation", organisation)
    .then(()=>{
      showToast("Organisation added successfully!")
    }).catch((error) => {
      showToast("Error adding organisation!")
      throw error
    })
}

export const editOrganisation = async (organisation: OrganisationType, id: string|undefined) => {
  await axios
    .put(`http://127.0.0.1:8000/api/organisation/${id}`, organisation)
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
    .delete(`http://127.0.0.1:8000/api/organisation/${id}`)
    .then(()=>{
      showToast("Organisation deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting organisation!")
      throw error
    })
}