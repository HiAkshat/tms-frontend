import axios from "axios"
import { OrganisationUserType, VerifyOtpBodyType } from "./types"
import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

const apiEndpoint = `${server}/organisationUser`

export const getOrganisationUsers = async (page: number=1, pageSize: number=10) => {
  const res = await axios
    .get(`${apiEndpoint}?page=${page}&pageSize=${pageSize}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const getOrganisationUsersByOrgId = async (org_id: string) => {
  const res = await axios
    .get(`${apiEndpoint}/organisation/${org_id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const sendOtp = async (email: string|undefined) => {
  await axios
    .post(`${apiEndpoint}/sendOtp/${email}`)
    .then(()=>{
      showToast(`OTP sent to ${email}`)
    })
    .catch(error => {
      showToast(`Error sending OTP!`)
      throw error
    })
}

export const verifyOtp = async (body: VerifyOtpBodyType) => {
  const res = await axios
    .post(`${apiEndpoint}/verifyOtp`, body)
    .then((res)=>{
      showToast("Logged in successfully!")
      return res.data
    })
    .catch(error => {
      showToast("Invalid OTP/credentials")
      throw error
    })

  return res
}

export const getOrganisationUser = async (id: string|undefined) => {
  const res = await axios
    .get(`${apiEndpoint}/${id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const getOrganisationUserByEmail = async (email: string|undefined) => {
  const res = await axios
    .get(`${apiEndpoint}/email/${email}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const addOrganisationUser = async (organisationUser: OrganisationUserType) => {
  await axios
    .post(`${apiEndpoint}`, organisationUser)
    .then(()=>{
      showToast("User added successfully!")
    }).catch((error) => {
      showToast("Error adding user!")
      throw error
    })
}

export const editOrganisationUser = async (organisationUser: OrganisationUserType, id: string|undefined) => {
  await axios
    .put(`${apiEndpoint}/${id}`, organisationUser)
    .then(()=>{
      showToast("User edited successfully!")
    })
    .catch((error)=>{
      showToast("Error editing user!")
      throw error
    })
}

export const deleteOrganisationUser = async (id: string|undefined) => {
  await axios
    .delete(`${apiEndpoint}/${id}`)
    .then(()=>{
      showToast("User deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting user!")
      throw error
    })
}
