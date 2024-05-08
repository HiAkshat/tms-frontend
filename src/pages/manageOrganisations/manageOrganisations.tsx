import styles from "./ManageOrganisations.module.scss"
import NewOrganisationForm from "../../organisms/NewOrganisationForm/NewOrganisationForm"
import Navbar from "../../organisms/Navbar/navbar"
import { getData } from "../../services/getData"
import showToast from "../../atoms/Toast/Toast"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import RsuiteTable from "../../organisms/RsuiteTable/RsuiteTable"
import { useEffect } from "react"
import { StateType } from "../../typings/navUser"

export default function ManageOrganisations(){
  const navigate = useNavigate()
  const organisations = getData('http://127.0.0.1:8000/api/organisation')
  const user = useSelector((state: StateType) => state.user)

  useEffect(()=>{
    if (!(user.isAuthenticated && user.userType=='system')){
      showToast("Login as system user to access!")
      navigate("../login")
    }
  })

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewOrganisationForm />
        <div className={styles.tableDiv}>
          <span>Organisations Table</span>
          {!organisations.isLoading && <RsuiteTable />}
        </div>
      </div>
    </div>
  )
}
