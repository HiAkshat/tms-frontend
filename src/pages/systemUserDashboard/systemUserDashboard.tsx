import styles from "./index.module.scss"
import NewOrganisationForm from "../../organisms/newOrganisationForm"

export default function SystemUserDashboard() {
  return (
    <div>
      <div className={styles.main}>System User Dashboard</div>
      <div>
        <button>Manage Organisations</button>
        <button>Manage Users</button>
      </div>
      <NewOrganisationForm />
    </div>
  )
}