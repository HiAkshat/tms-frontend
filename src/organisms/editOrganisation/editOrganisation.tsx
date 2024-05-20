import styles from "./EditOrganisation.module.scss"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import organisationServices from "../../services/organisation";

import Navbar from "../Navbar/navbar";
import TextInput from "../../atoms/TextInput/TextInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import helpers from "../../helpers";
import showToast from "../../atoms/Toast/Toast";

export default function EditOrganisation() {
  const navigate = useNavigate()

  const [organisationName, setOrganisationName] = useState("")
  const [displayName, setDisplayName] = useState("")

  const { id } = useParams()

  useEffect(()=>{
    organisationServices.getOrganisation(id).then((data)=>{
      setOrganisationName(data.organisation_name)
      setDisplayName(data.display_name)
    })
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (helpers.isTextEmpty(organisationName) || helpers.isTextEmpty(displayName)){
      showToast("Invalid data!")
      return
    }

    const data = {
      organisation_name: organisationName,
      display_name: displayName
    }

    try {
      await organisationServices.editOrganisation(data, id)
      navigate("..")
    } catch (error) {
      return
    }
  };


  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
      <span className={styles.title}>Add New Organisation</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <TextInput text={organisationName} field="Organisation Name" setText={setOrganisationName} placeholder="Organisation Name"  />
          <TextInput text={displayName} field="Display Name" setText={setDisplayName} placeholder="Display Name"  />
          <CustomButton onClick={handleSubmit} type="submit" text="Add" width="100%"/>
        </div>
      </form>
    </div>
    </div>
  );
};
