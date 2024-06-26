import styles from "./SystemUserDashboard.module.scss"
import Navbar from "../../organisms/Navbar/navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import showToast from "../../atoms/Toast/Toast";
import { useSelector } from "react-redux"
import { StateType } from "../../typings/navUser";

export default function SystemUserDashboard() {
  let navigate = useNavigate();
  const user = useSelector((state: StateType) => state.user)

  useEffect(()=>{
    if (!(user.isAuthenticated && user.userType=='system')){
      showToast("Login as system user to access!")
      navigate("../login")
    }
  })

  return (
    <div className={styles.page}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.choices}>
        <div onClick={() => {navigate("/manageUsers")}} className={styles.choice}>
          <span>Manage Users</span>
        </div>
        <div onClick={() => {navigate("/manageOrganisations")}} className={styles.choice}>
          <span>Manage Organisations</span>
        </div>
      </div>
    </div>
  )
}
