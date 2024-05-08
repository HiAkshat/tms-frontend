import Navbar from "../../organisms/Navbar/navbar"
import NewUserForm from "../../organisms/NewUserForm/NewUserForm"
import styles from "./ManageUsers.module.scss"
import { useSelector } from "react-redux"
import showToast from "../../atoms/Toast/Toast";
import { useNavigate } from "react-router-dom";
import RsuiteTable from "../../organisms/RsuiteTableUser/RsuiteTableUser";
import { useEffect, useState } from "react";
import organisationUserServices from "../../services/organisationUser";

export default function ManageUsers() {
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user)
  const [users, setUsers] = useState([])

  useEffect(()=>{
    organisationUserServices.getOrganisationUsers().then(data=>{setUsers(data)})
  }, [])

  if (false && !user.isAuthenitcated || user.usertype=='organisation'){
    showToast("Login as system user to access!")
    navigate("../login")
  }

  else{
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.main}>
          <NewUserForm />
          <div className={styles.tableDiv}>
            <span>Users Table</span>
            <RsuiteTable />
          </div>
        </div>
      </div>
    )
  }
}
