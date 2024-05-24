import Navbar from "../../organisms/Navbar/navbar"
import NewUserForm from "../../organisms/NewUserForm/NewUserForm"
import styles from "./ManageUsers.module.scss"
import showToast from "../../atoms/Toast/Toast";
import { useNavigate } from "react-router-dom";
import RsuiteTable from "../../organisms/RsuiteTableUser/RsuiteTableUser";
import { useEffect, useState } from "react";
import verifyTokenServices from "../../services/verifyToken";
import Cookie from "js-cookie"


export default function ManageUsers() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const access_token = Cookie.get("accessToken")

    if (access_token){
      verifyTokenServices.verifyToken(access_token).then(res=>{
        if (!(res.valid && res.userType=='system')){
          showToast("Login as system user to access!")
          navigate("../login")
        }
      })
    }
    else{
      showToast("Login as system user to access!")
      navigate("../login")
    }

  }, [])

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewUserForm setIsLoading={setIsLoading}/>
        <div className={styles.tableDiv}>
          <span>Users Table</span>
          <RsuiteTable isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
      </div>
    </div>
  )
}
