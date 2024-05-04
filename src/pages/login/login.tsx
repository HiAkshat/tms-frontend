import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss"
import showToast from '../../atoms/toast';
// import SubmitButton from '../../atoms/submitButton/submitButton';

import Cookie from 'js-cookie';

export default function Login() {
  const [userType, setUserType] = useState(0)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const dispatch = useDispatch()
  let navigate = useNavigate();

  useEffect(()=>{
    const verifyToken = async (accessToken: string) => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/verifyToken/`, {
          method: "POST",
          headers: {
            "authorization": `BEARER ${accessToken}`
          }
        })
        
        let userData = await res.json()
        userData=userData.user
        const userDetails = { id: userData._id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, organisation_id: userData.organisation ? userData.organisation : "", userType: userData.organisation ? "organisation" : "system", isAuthenticated: true };
        console.log(userDetails)
        dispatch(
          login(userDetails)
        )

        if (userDetails.userType=="system") navigate("../systemDashboard")
        else navigate("../viewTickets")

      } catch (error) {
        console.log("Session expired!")
      }
    }
  
    const accessToken = Cookie.get("accessToken") ?? ""
    verifyToken(accessToken)
  }, [])

  const handleSendOtp = async () => {
    let fetchLink
    if (userType==0) fetchLink=`http://127.0.0.1:8000/api/systemUser/sendOTP/${email}`
    else fetchLink=`http://127.0.0.1:8000/api/organisationUser/sendOTP/${email}`
    
    try{
      showToast("Sending OTP...")
      const request = await fetch(fetchLink, {
        method: "POST",
      })

      if (request.status!=200) showToast("Error sending OTP!")
      else showToast(`OTP sent to ${email}`)
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
      return userData
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserLogin = async (e: React.SyntheticEvent) => {
    const body = JSON.stringify({
      email_id: email,
      otp
    })

    console.log(body)
    let fetch_link
    if (userType==0) fetch_link=`http://127.0.0.1:8000/api/systemUser/verifyOTP`
    else fetch_link=`http://127.0.0.1:8000/api/organisationUser/verifyOTP`

    let response
    if (userType==0){
      response = await fetch(fetch_link, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body
      })
    }

    else {
      response = await fetch(fetch_link, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body
      })
    }
    
    const otpData = await response.json()
    Cookie.set("accessToken", otpData.accessToken)

    if (otpData.valid){
      const userData = await fetchUserData()      
      const userDetails = { id: userData._id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, organisation_id: userType==0 ? '' : userData.organisation, userType: userType==0 ? "system" : "organisation" };
      dispatch(
        login(userDetails)
      )

      showToast("Logged in successfully!")
      if (userType==0) navigate("/systemDashboard");
      else navigate("/viewTickets")
    }

    else {
      showToast("Invalid OTP/credentials!")
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.loginBox}>
        <div className={styles.heading}>
          <span>Login as</span>
          <span onClick={()=>{setUserType(0)}} className={userType==0 ? styles.selected : styles.unselected}>System User</span>
          <span onClick={()=>{setUserType(1)}} className={userType==1 ? styles.selected : styles.unselected}>Organisation User</span>
        </div>
        <div className={styles.inputsBox}>
            <div className={styles.inputWithB}>
              <div className={styles.inputs}>
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email' />
                <input onChange={(e)=>{setOtp(e.target.value)}} type="text" placeholder='Enter your 6-digit OTP' />
              </div>
              <button onClick={handleSendOtp}>Send OTP</button>
            </div>
          <button type={"submit"} onClick={handleUserLogin} title={"Submit"} className={styles.submitButton}>Submit</button>
        </div>
      </div>
    </div>
  )
}
