import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss"
import showToast from '../../atoms/Toast/Toast';

import Cookie from 'js-cookie';

import { Button, Input } from 'rsuite';
import systemUserServices from '../../services/systemUser';
import organisationUserServices from '../../services/organisationUser';
import verifyTokenServices from '../../services/verifyToken';

export default function Login() {
  const [userType, setUserType] = useState(0)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const dispatch = useDispatch()
  let navigate = useNavigate();

  useEffect(()=>{
    const verification = async () => {
      const accessToken = Cookie.get("accessToken") ?? ""
      try {
        await verifyTokenServices.verifyToken(accessToken).then(data => {
          if (data.valid){
            if (data.userType=="system") navigate("../systemDashboard")
              else navigate("../viewTickets")
          }
        })
      } catch (error) {
        return
      }
    }

    verification()
  }, [])

  const handleSendOtp = async () => {
    try{
      showToast("Sending OTP...")
      if (userType==0) await systemUserServices.sendOtp(email)
      else await organisationUserServices.sendOtp(email)
    } catch (error){
      return
    }
  }

  const handleUserLogin = async () => {
    const body = {
      email_id: email,
      otp
    }

    let otpData: OtpDataType | undefined

    try {
      if (userType==0) await systemUserServices.verifyOtp(body).then(data => otpData=data)
      else await organisationUserServices.verifyOtp(body).then(data => otpData=data)


    if (otpData && otpData.valid){
      Cookie.set("accessToken", otpData.accessToken)

      let userData: UserType | undefined
      if (userType==0) await systemUserServices.getSystemUserByEmail(email).then(data => userData=data)
      else{
        await organisationUserServices.getOrganisationUserByEmail(email).then(data => userData=data)
      }

      if (userData){
        const userDetails = { id: userData._id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, organisation_id: userType==0 ? '' : userData.organisation, userType: userType==0 ? "system" : "organisation" };
        dispatch(
          login(userDetails)
        )


        if (userType==0) navigate("/systemDashboard");
        else navigate("/viewTickets")
      }
    }
    } catch (error) {
      console.log(error)
      return
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
                <Input placeholder="Enter your email" value={email} onChange={setEmail} required={true}/>
                <Input placeholder="Enter your 6-digit OTP" value={otp} onChange={setOtp} required={true}/>
              </div>
              <Button onClick={handleSendOtp}>Send OTP</Button>
            </div>
          <Button type="submit" onClick={handleUserLogin} className={styles.submitButton}>Submit</Button>
        </div>
      </div>
    </div>
  )
}
