import styles from "./ManageOrganisations.module.scss"
import NewOrganisationForm from "../../organisms/NewOrganisationForm/NewOrganisationForm"
import Navbar from "../../organisms/Navbar/navbar"
import showToast from "../../atoms/Toast/Toast"
import { useNavigate } from "react-router-dom"
import RsuiteTable from "../../organisms/RsuiteTable/RsuiteTable"
import { useEffect } from "react"
import verifyTokenServices from "../../services/verifyToken"
import Cookie from "js-cookie"

export default function ManageOrganisations(){
  const navigate = useNavigate()
  useEffect(()=>{
    verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then(res=>{
      if (!(res.valid && res.userType=='system')){
        showToast("Login as system user to access!")
        navigate("../login")
      }
    })
  }, [])

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewOrganisationForm />
        <div className={styles.tableDiv}>
          <span>Organisations Table</span>
          <RsuiteTable />
        </div>
      </div>
    </div>
  )
}
