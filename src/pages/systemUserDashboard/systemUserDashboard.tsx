import styles from "./index.module.scss"
import Navbar from "../../organisms/navbar/navbar"
import { useNavigate } from "react-router-dom"

export default function SystemUserDashboard() {
  let navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.title}>System User Dashboard</div>
        <div className={styles.buttons}>
          <button onClick={() => {navigate("/manageOrganisations")}}>Manage Organisations</button>
          <button onClick={() => {navigate("/manageUsers")}}>Manage Users</button>
        </div>
      </div>
      {/* <NewOrganisationForm /> */}
    </div>
  )
}