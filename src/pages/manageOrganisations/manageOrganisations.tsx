import styles from "./ManageOrganisations.module.scss"
import NewOrganisationForm from "../../organisms/NewOrganisationForm/NewOrganisationForm"
import Navbar from "../../organisms/Navbar/navbar"
import OrganisationTable from "../../organisms/OrganisationTable/OrganisationTable"
import { getData } from "../../services/getData"
import showToast from "../../atoms/Toast/Toast"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ManageOrganisations(){
  const navigate = useNavigate()
  const organisations = getData('http://127.0.0.1:8000/api/organisation')
  const user = useSelector((state: any) => state.user)

  if (user.isAuthenticated && user.userType=='system'){
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

  else{
    showToast("Login as system user to access!")
    navigate("../login") 
  }
}
