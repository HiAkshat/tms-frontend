import styles from "./navbar.module.scss"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/userSlice";

export default function Navbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

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
        <span className={styles.navbarButton}>Currently logged in as: {user.name} ({user.userType} user)</span>
        <span onClick={handleLogout} className={styles.navbarButton}>Log out</span>
      </div>
    </div>
  )
}
