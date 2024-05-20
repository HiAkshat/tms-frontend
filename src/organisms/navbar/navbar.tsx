import styles from "./navbar.module.scss"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { login, updateOrganisation } from "../../redux/userSlice";
import { logout } from "../../redux/userSlice";
import Cookie from "js-cookie"

import { useEffect, useState } from "react";
import { NavUserType, StateType } from "../../typings/navUser";
import verifyTokenServices from "../../services/verifyToken";

export default function Navbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const user: NavUserType = useSelector((state: StateType) => state.user)

  const handleLogout = () => {
    Cookie.remove("accessToken")
    Cookie.remove("organisation")
    dispatch(logout())
    navigate("/login")
  }

  function titleCase(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
 }

 useEffect(()=>{
  const verifyToken = async () => {
    try {
      await verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then((res)=>{
        const userData = res.decoded.user
        const userDetails = { id: userData.unique_id, name: `${userData.first_name} ${userData.last_name}`, email: userData.email_id, organisation_id: userData.organisation ? userData.organisation._id : "", userType: Cookie.get("organisation") ? "organisation" : "system", isAuthenticated: true };
        dispatch(login(userDetails))
        dispatch(updateOrganisation(Cookie.get("organisation")))
      })


    } catch (error) {
      console.log("Session expired!")
      return error
    }
  }

  verifyToken()
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
          <span className={styles.type}>{} {titleCase(user.userType)} User</span>
        </div>
        <img title="logout" onClick={handleLogout} className={styles.logout} src="/logout-128.png" alt="" />
      </div>
    </div>
  )
}
