import Navbar from "../../organisms/navbar/navbar"
import NewUserForm from "../../organisms/newUserForm/newUserForm"
import UserTable from "../../organisms/userTable/userTable"
import styles from "./index.module.scss"
import { getData } from "../../services/getData";
import { useSelector } from "react-redux"
import showToast from "../../atoms/toast";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const navigate = useNavigate()
  const users = getData('http://127.0.0.1:8000/api/organisationUser')
  const user = useSelector((state: any) => state.user)

  if (true || user.isAuthenitcated && user.usertype=='system'){
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.main}>
          <NewUserForm />
          <div className={styles.tableDiv}>
            <span>Users Table</span>
            {!users.isLoading && <UserTable data={users.data}/>}
          </div>
        </div>
      </div>
    )
  }

  else{
    showToast("Login as system user to access!")
    navigate("../login") 
  }
}
