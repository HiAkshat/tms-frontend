import styles from "./navbar.module.scss"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/userSlice";
import Cookie from "js-cookie"

import { useEffect } from "react";
import { login } from "../../redux/userSlice";
import { NavUserType } from "../../typings/navUser";

export default function Navbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const user: NavUserType = useSelector((state: any) => state.user)

  const handleLogout = () => {
    Cookie.remove("accessToken")
    dispatch(logout())
    navigate("/login")
  }

  function titleCase(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
 }

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
      userData=userData.decoded.user
      const userDetails = { id: userData._id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, organisation_id: userData.organisation ? userData.organisation : "", userType: userData.organisation ? "organisation" : "system", isAuthenticated: true };
      dispatch(
        login(userDetails)
      )

      // if (userDetails.userType=="system") navigate("../systemDashboard")
      // else navigate("../viewTickets")

    } catch (error) {
      console.log("Session expired!")
      return error
    }
  }

  const accessToken = Cookie.get("accessToken") ?? ""
  verifyToken(accessToken)
}, [])

  return (
    <div className={styles.navbar}>
      {user.userType=="system" ?
        <div className={styles.navbarPart}>
          <span onClick={()=>{navigate("/manageUsers")}} className={styles.navbarButton}>Manage Users</span>
          <span onClick={()=>{navigate("/manageOrganisations")}} className={styles.navbarButton}>Manage Organisations</span>
        </div>
        :
        <div className={styles.navbarPart}>
          <span onClick={()=>{navigate("/viewTickets")}} className={styles.navbarButton}>View Tickets</span>
        </div>
      }
      <div className={styles.navbarPart}>
        <div className={styles.user}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.type}>{titleCase(user.userType)} User</span>
        </div>
        <img title="logout" onClick={handleLogout} className={styles.logout} src="/logout-128.png" alt="" />
      </div>
    </div>
  )
}
