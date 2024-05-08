import axios from "axios"
import { SystemUserType, VerifyOtpBodyType } from "./types"
import showToast from "../../atoms/Toast/Toast"

export const getSystemUser = async (id: string|undefined) => {
  const res = await axios
    .get(`http://127.0.0.1:8000/api/systemUser/${id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const getSystemUserByEmail = async (email: string|undefined) => {
  const res = await axios
    .get(`http://127.0.0.1:8000/api/systemUser/email/${email}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const sendOtp = async (email: string|undefined) => {
  await axios
    .post(`http://127.0.0.1:8000/api/systemUser/sendOtp/${email}`)
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
    .post(`http://127.0.0.1:8000/api/systemUser/verifyOtp`, body)
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

export const addOrganisationUser = async (organisationUser: SystemUserType) => {
  await axios
    .post("http://127.0.0.1:8000/api/organisationUser", organisationUser)
    .then(()=>{
      showToast("User added successfully!")
    }).catch((error) => {
      showToast("Error adding user!")
      throw error
    })
}

export const editOrganisationUser = async (organisationUser: SystemUserType, id: string|undefined) => {
  await axios
    .put(`http://127.0.0.1:8000/api/organisationUser/${id}`, organisationUser)
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
    .delete(`http://127.0.0.1:8000/api/organisationUser/${id}`)
    .then(()=>{
      showToast("User deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting user!")
      throw error
    })
}
