import { useState } from "react"
import styles from "./NewOrganisationForm.module.scss"

import organisationServices from "../../services/organisation";

import helpers from "../../helpers";

import TextInput from "../../atoms/TextInput/TextInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import showToast from "../../atoms/Toast/Toast";

export default function NewOrganisationForm({setIsLoading}: any) {
  const [organisationName, setOrganisationName] = useState("")
  const [displayName, setDisplayName] = useState("")

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
      setIsLoading(true)
      await organisationServices.addNewOrganisation(data)

      setOrganisationName("")
      setDisplayName("")

    } catch (error) {
      return
    }
  };

  return (
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
  );
};
