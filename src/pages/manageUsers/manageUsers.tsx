import Navbar from "../../organisms/Navbar/navbar"
import NewUserForm from "../../organisms/NewUserForm/newUserForm"
import styles from "./ManageUsers.module.scss"
import { useSelector } from "react-redux"
import showToast from "../../atoms/Toast/Toast";
import { useNavigate } from "react-router-dom";
import RsuiteTable from "../../organisms/RsuiteTableUser/RsuiteTableUser";
import { useEffect, useState } from "react";
import organisationUserServices from "../../services/organisationUser";
import { StateType } from "../../typings/navUser";

export default function ManageUsers() {
  const navigate = useNavigate()

  const user = useSelector((state: StateType) => state.user)

  const [isLoading, setIsLoading] = useState(true)


  if (false && !user.isAuthenticated || user.userType=='organisation'){
    showToast("Login as system user to access!")
    navigate("../login")
  }

  else{
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.main}>
          <NewUserForm setIsLoading={setIsLoading}/>
          <div className={styles.tableDiv}>
            <span>Users Table</span>
            <RsuiteTable isLoading={isLoading} setIsLoading={setIsLoading}/>
          </div>
        </div>
      </div>
    )
  }
}
