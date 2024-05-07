import axios from "axios"
import { OrganisationUserType } from "./types"
import showToast from "../../atoms/Toast/Toast"

export const getOrganisationUsers = async () => {
  const res = await axios
    .get("http://127.0.0.1:8000/api/organisationUser")
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const getOrganisationUser = async (id: string|undefined) => {
  const res = await axios
    .get(`http://127.0.0.1:8000/api/organisationUser/${id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const addOrganisationUser = async (organisationUser: OrganisationUserType) => {
  await axios
    .post("http://127.0.0.1:8000/api/organisationUser", organisationUser)
    .then(()=>{
      showToast("Organisation user added successfully!")
    }).catch((error) => {
      showToast("Error adding organisation user!")
      throw error
    })
}

export const editOrganisationUser = async (organisationUser: OrganisationUserType, id: string|undefined) => {
  await axios
    .put(`http://127.0.0.1:8000/api/organisationUser/${id}`, organisationUser)
    .then(()=>{
      showToast("Organisation user edited successfully!")
    })
    .catch((error)=>{
      showToast("Error editing organisation user!")
      throw error
    })
}

export const deleteOrganisationUser = async (id: string|undefined) => {
  await axios
    .delete(`http://127.0.0.1:8000/api/organisationUser/${id}`)
    .then(()=>{
      showToast("Organisation user deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting organisation user!")
      throw error
    })
}