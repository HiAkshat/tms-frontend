import Navbar from "../../organisms/Navbar/navbar"
import NewUserForm from "../../organisms/NewUserForm/NewUserForm"
import UserTable from "../../organisms/UserTable/UserTable"
import styles from "./ManageUsers.module.scss"
import { getData } from "../../services/getData";
import { useSelector } from "react-redux"
import showToast from "../../atoms/Toast/Toast";
import { useNavigate } from "react-router-dom";
import Popup from "../../atoms/popup/popup";
import RsuiteTable from "../../organisms/RsuiteTableUser/RsuiteTableUser";

export default function ManageUsers() {
  const navigate = useNavigate()
  const users = getData('http://127.0.0.1:8000/api/organisationUser')
  const user = useSelector((state: any) => state.user)
  
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
            {!users.isLoading && <RsuiteTable data={users.data}/>}
            {/* {!users.isLoading && <UserTable data={users.data}/>} */}
          </div>
        </div>
      </div>
    )
  }
}
