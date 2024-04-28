import styles from "./navbar.module.scss"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarPart}>
        <span onClick={()=>{navigate("/manageUsers")}} className={styles.navbarButton}>Manage Users</span>
        <span onClick={()=>{navigate("/manageOrganisations")}} className={styles.navbarButton}>Manage Organisations</span>
      </div>
      <div className={styles.navbarPart}>
        <span className={styles.navbarButton}>Currently logged in as: Akshat Gupta (Systen user)</span>
        <span className={styles.navbarButton}>Log out</span>
      </div>
    </div>
  )
}
