import Navbar from "../../organisms/navbar/navbar"
import NewUserForm from "../../organisms/newUserForm/newUserForm"
import UserTable from "../../organisms/userTable/userTable"
import styles from "./index.module.scss"
import { getData } from "../../services/getData";

export default function ManageUsers() {
  const users = getData('http://127.0.0.1:8000/api/organisationUser')

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
