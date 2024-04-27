import styles from "./navbar.module.scss"

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarPart}>
        <span className={styles.navbarButton}>Manage Users</span>
        <span className={styles.navbarButton}>Manage Organisations</span>
      </div>
      <div className={styles.navbarPart}>
        <span className={styles.navbarButton}>Currently logged in as: Akshat Gupta (Systen user)</span>
        <span className={styles.navbarButton}>Log out</span>
      </div>
    </div>
  )
}
