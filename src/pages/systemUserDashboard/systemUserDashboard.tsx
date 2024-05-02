import styles from "./index.module.scss"
import Navbar from "../../organisms/navbar/navbar"
import { useNavigate } from "react-router-dom"

export default function SystemUserDashboard() {
  let navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div onClick={() => {navigate("/manageUsers")}} className={styles.choices}>
        <div className={styles.choice}>
          <span>Manage Users</span>
        </div>
        <div onClick={() => {navigate("/manageUsers")}} className={styles.choice}>
          <span>Manage Organisations</span>
        </div>
      </div>
    </div>
  )
}