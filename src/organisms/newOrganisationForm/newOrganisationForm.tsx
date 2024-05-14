import { useState } from "react"
import styles from "./NewOrganisationForm.module.scss"

import { Input, Button } from 'rsuite';
// import { Input, Button, Schema, Form } from 'rsuite';
// import { StringType } from 'schema-typed';
import organisationServices from "../../services/organisation";

// const model = Schema.Model({
//   organisation_name: StringType().isRequired("This field is required!"),
//   display_name: StringType().isRequired("This field is required!")
// });

export default function NewOrganisationForm() {
  const [organisation, setOrganisation] = useState<OrganisationType>({
    organisation_name: '',
    display_name: '',
  })

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    validateName(organisation.organisation_name, setIsOrgnNameValid)
    validateName(organisation.display_name, setIsDisplayNameValid)

    if (!isOrgNameValid || !isDisplayNameValid) return

    try {
      await organisationServices.addNewOrganisation(organisation)
      setOrganisation({
        organisation_name: '',
        display_name: '',
      });

    } catch (error) {
      return
    }
  };

  const handleOrgNameChange = (e: string) => {
    setTimeout(() => {
      validateName(e, setIsOrgnNameValid)
    }, 1000);

    setOrganisation((prevState) => ({
      ...prevState,
      organisation_name: e,
    }));
  };

  const handleDisplayNameChange = (e: string) => {
    setTimeout(() => {
      validateName(e, setIsDisplayNameValid)
    }, 1000);

    setOrganisation((prevState) => ({
      ...prevState,
      display_name: e,
    }));
  }

  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true)
  const [isOrgNameValid, setIsOrgnNameValid] = useState(true)

  const validateName = (name: string, setIsNameValid: any) => {
    if (name=="") setIsNameValid(false)
    else setIsNameValid(true)
  };

  return (
    <div className={styles.main}>
      <span className={styles.title}>Add New Organisation</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <div className={styles.inputField}>
            <Input placeholder="Organisation Name" value={organisation.organisation_name} onChange={handleOrgNameChange} required={true}/>
            <span hidden={isOrgNameValid}>Invalid organisation name</span>
          </div>
          <div className={styles.inputField}>
            <Input placeholder="Dislpay Name" value={organisation.display_name} onChange={handleDisplayNameChange} required={true}/>
            <span hidden={isDisplayNameValid}>Invalid display name</span>
          </div>
        </div>
        <Button onClick={handleSubmit} type="submit">Add</Button>
      </form>
    </div>
  );
};
