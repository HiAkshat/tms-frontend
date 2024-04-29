import styles from "./index.module.scss"
import NewOrganisationForm from "../../organisms/newOrganisationForm/newOrganisationForm"
import Navbar from "../../organisms/navbar/navbar"
import OrganisationTable from "../../organisms/organisationTable/organisationTable"
import { getData } from "../../services/getData"

export default function ManageOrganisations(){
  const organisations = getData('http://127.0.0.1:8000/api/organisation')

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewOrganisationForm />
        <div className={styles.tableDiv}>
          <span>Organisations Table</span>
          {!organisations.isLoading && <OrganisationTable data={organisations.data} />}
        </div>
      </div>
    </div>
  )
}
