import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss"
import Cookie from 'js-cookie';

import { Button, Input } from 'rsuite';
import systemUserServices from '../../services/systemUser';
import organisationUserServices from '../../services/organisationUser';
import verifyTokenServices from '../../services/verifyToken';
import helpers from '../../helpers';
import EmailInput from '../../atoms/EmailInput/EmailInput';
import showToast from '../../atoms/Toast/Toast';
import SelectInput from '../../atoms/SelectInput/SelectInput';
import organisationServices from '../../services/organisation';
import { updateOrganisation } from '../../redux/userSlice';

export default function Login() {
  const [userType, setUserType] = useState(0)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const [organisation, setOrganisation] = useState("")
  const [organisations, setOrganisations] = useState<OrganisationType[]>()

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

    organisationServices.getOrganisations().then((res)=>{
      setOrganisations(res.data)
    })
  }, [])

  const handleSendOtp = async () => {
    if (!helpers.validateEmail(email)){
      showToast("Invalid email!")
      return
    }

    try{
      if (userType==0) await systemUserServices.sendOtpBetter(email)
      else await organisationUserServices.sendOtpBetter(email)
    } catch (error){
      return
    }
  }

  const handleUserLogin = async () => {
    const body = {
      email_id: email,
      otp,
      organisation_id: organisation
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
        const userDetails = { id: userData.unique_id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, userType: userType==0 ? "system" : "organisation" };
        dispatch(
          login(userDetails)
        )



        if (userType==0) navigate("/systemDashboard");
        else{
          Cookie.set("organisation", organisation)
          dispatch(updateOrganisation(organisation))
          navigate("/viewTickets")
        }
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
                <EmailInput email={email} setEmail={setEmail}/>
                <Button className={styles.otpButton} onClick={handleSendOtp}>Send OTP</Button>
              </div>
              <div className={styles.otpInput}>
                <span className={styles.inputHeading}>OTP</span>
                <Input placeholder="Enter your 6-digit OTP" value={otp} onChange={(val: string)=>{
                  const inputValue = val
                  const numericValue = inputValue.replace(/\D/g, '');
                  const truncatedValue = numericValue.slice(0, 6);
                  setOtp(truncatedValue)
                }} required={true}/>
              </div>
              {organisations && userType==1 && <SelectInput className={styles.orgSelect} arr={organisations} value={"unique_id"} label={"organisation_name"} data={organisation} setData={setOrganisation}/>}
            </div>
          <Button type="submit" onClick={handleUserLogin} className={styles.submitButton}>Submit</Button>
        </div>
      </div>
    </div>
  )
}
