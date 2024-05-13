import axios from "axios"
import { VerifyOtpBodyType } from "./types"
import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

const apiEndpoint = `${server}/systemUser`

export const getSystemUser = async (id: string|undefined) => {
  const res = await axios
    .get(`${apiEndpoint}/${id}`)
    .then(res => {return res.data})
    .catch(error => {
      throw error
    })

  return res
}

export const getSystemUserByEmail = async (email: string|undefined) => {
  const res = await axios
    .get(`${apiEndpoint}/email/${email}`)
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
