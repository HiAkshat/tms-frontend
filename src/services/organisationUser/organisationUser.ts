import axios from "axios"
import { SendOrganisationUserType, VerifyOtpBodyType } from "./types"
import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

const apiEndpoint = `${server}/organisationUser`
let otp_flag = true
let otp_timeout_flag = true

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
  return await axios
    .post(`${apiEndpoint}/sendOtp/${email}`)
    .then(()=>{
      showToast(`OTP sent to ${email}`)
    })
    .catch(error => {
      if (error.response.data.message) showToast(error.response.data.message)
      else showToast(`Error sending OTP!`)
      throw error
    })
}

const throttle = (func: any, email: string|undefined, limit: number) => {
  if (otp_flag){
    func(email)
    showToast("Sending OTP...")
    otp_flag = false
    setTimeout(()=>{
      otp_flag=true
    }, limit)
  }
}

export const sendOtpBetter = async (email: string|undefined) => {
  if (otp_flag) throttle(sendOtp, email, 10000)
  else{
    if (otp_timeout_flag){
      showToast("Wait for 10 seconds before resending OTP!")
      otp_timeout_flag=false
      setTimeout(() => {
        otp_timeout_flag=true
      }, 10000);
    }
  }
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

export const addOrganisationUser = async (organisationUser: SendOrganisationUserType) => {
  await axios
    .post(`${apiEndpoint}`, organisationUser)
    .then(()=>{
      showToast("User added successfully!")
    }).catch((error) => {
      showToast("Error adding user!")
      throw error
    })
}

export const editOrganisationUser = async (organisationUser: SendOrganisationUserType, id: string|undefined) => {
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
    .put(`${apiEndpoint}/${id}`)
    .then(()=>{
      showToast("User deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting user!")
      throw error
    })
}
