import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss"
import showToast from '../../atoms/toast';

export default function Login() {
  const [userType, setUserType] = useState(0)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const dispatch = useDispatch()
  let navigate = useNavigate();

  const handleSendOtp = async () => {
    try{
      const sendOTP = await fetch(`http://127.0.0.1:8000/api/systemUser/sendOTP/${email}`, {
        method: "POST",
      })
      showToast(`OTP sent to ${email}`)
    } catch (error){
      showToast("Error sending OTP!")
      return
    }
  }

  const fetchUserData = async () => {
    try {
      let response;

      if (userType==0) response = await fetch(`http://127.0.0.1:8000/api/systemUser/email/${email}`)
      else response = await fetch(`http://127.0.0.1:8000/api/organisationUser/email/${email}`)
      const userData = await response.json();
      console.log(userData)
      return userData
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectChange = async (e: { target: { value: string; }; }) => {
    setUserType(parseInt(e.target.value));
  };

  const handleUserLogin = async (e: React.SyntheticEvent) => {
    const body = JSON.stringify({
      email_id: email,
      otp
    })

    const response = await fetch(`http://127.0.0.1:8000/api/systemUser/verifyOTP`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    
    const otpData = await response.json()

    if (otpData.valid){
      const userData = await fetchUserData()
      const userDetails = { name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, userType: userType==0 ? "System" : "Organisation" };
      dispatch(
        login(userDetails)
      )
      
      showToast("Logged in successfully!")
      navigate("/systemDashboard");
    }

    else {
      showToast("Invalid OTP/credentials!")
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.formInfo}>
        <span className={styles.loginTitle}>Login as</span>
        <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Enter your email' />
        <button className={styles.submitButton} onClick={handleSendOtp}>Send OTP</button>
        <input onChange={(e)=>{setOtp(e.target.value)}} type="text" placeholder='Enter received OTP on mail' />
        <select id="userType" value={userType} onChange={handleSelectChange}>
          <option value={0}>System User</option>
          <option value={1}>Organization User</option>
        </select>
      </div>
      <button className={styles.submitButton} onClick={handleUserLogin} type='submit'>Submit</button>
    </div>
  )
}
