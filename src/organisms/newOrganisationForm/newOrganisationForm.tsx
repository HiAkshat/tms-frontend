import { useState } from "react"
import styles from "./NewOrganisationForm.module.scss"

import { Input, Button } from 'rsuite';
// import { Input, Button, Schema, Form } from 'rsuite';
// import { StringType } from 'schema-typed';
import organisationServices from "../../services/organisation";
import TextInput from "../../atoms/TextInput/TextInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import helpers from "../../helpers";
import showToast from "../../atoms/Toast/Toast";

// const model = Schema.Model({
//   organisation_name: StringType().isRequired("This field is required!"),
//   display_name: StringType().isRequired("This field is required!")
// });

export default function NewOrganisationForm() {
  const [organisationName, setOrganisationName] = useState("")
  const [displayName, setDisplayName] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    // console.log(organisationName)
    // console.log(displayName)

    if (helpers.isTextEmpty(organisationName) || helpers.isTextEmpty(displayName)){
      showToast("Invalid data!")
      return
    }

    const data = {
      organisation_name: organisationName,
      display_name: displayName
    }

    try {
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
