import axios from "axios"
import { EditOrganisationUserType, SendOrganisationUserType, VerifyOtpBodyOrganisationType } from "./types"
import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

const apiEndpoint = `${server}/organisationUser`
let otp_flag = true
let otp_timeout_flag = true

export const getOrganisationUsers = async (page: number=1, pageSize: number=10, sortBy: string="", filters: any={}) => {
  Object.keys(filters).forEach(key => filters[key] === undefined || filters[key] === null ? delete filters[key] : {});

  const sortByString = `&sortBy=${sortBy}`
  const filterQuery = new URLSearchParams(filters).toString() ?? ""
  console.log(filterQuery)
  const res = await axios
    .get(`${apiEndpoint}?page=${page}&pageSize=${pageSize}${sortBy ?? sortByString}&${filterQuery}`)
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

export const verifyOtp = async (body: VerifyOtpBodyOrganisationType) => {
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

export const editOrganisationUser = async (organisationUser: EditOrganisationUserType, id: string|undefined) => {
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

export const addOrganisationToUser = async (user_id: string, organisation_id: string, joining_date: Date) => {
  await axios
    .put(`${apiEndpoint}/addOrganisation/${user_id}`, {
      organisation_id: organisation_id,
      joining_date: joining_date
    })
    .then(()=>{
      showToast("Organisation added successfully!")
    })
    .catch((error)=>{
      showToast("Error removing organisation!")
      throw error
    })

}

export const removeOrganisationFromUser = async (user_id: string, organisation_id: string) => {
  await axios
    .put(`${apiEndpoint}/removeOrganisation/${user_id}`, {organisation_id: organisation_id})
    .then(()=>{
      showToast("Organisation removed successfully!")
    })
    .catch((error)=>{
      showToast("Error removing organisation!")
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
