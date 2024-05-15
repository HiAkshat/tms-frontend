import axios from "axios"
import { VerifyOtpBodyType } from "./types"
import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

const apiEndpoint = `${server}/systemUser`
let otp_flag=true
let otp_timeout_flag=true

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
      if (error.response.data.message) showToast(error.response.data.message)
      else showToast("Unexpected error occured!")
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
