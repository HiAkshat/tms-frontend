import { useState } from "react"
import styles from "./NewOrganisationForm.module.scss"
import showToast from "../../atoms/Toast/Toast";

import { Input, Button, Schema } from 'rsuite';
import { StringType } from 'schema-typed';
import organisationServices from "../../services/organisation";

const model = Schema.Model({
  organisation_name: StringType().isRequired("This field is required!"),
  display_name: StringType().isRequired("This field is required!")
});

interface Organisation {
  organisation_name: string;
  display_name: string;
}


export default function NewOrganisationForm() {
  const [organisation, setOrganisation] = useState<Organisation>({
    organisation_name: '',
    display_name: '',
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

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
    setOrganisation((prevState) => ({
      ...prevState,
      organisation_name: e,
    }));
  };

  const handleDisplayNameChange = (e: string) => {
    setOrganisation((prevState) => ({
      ...prevState,
      display_name: e,
    }));
  }

  return (
    <div className={styles.main}>
      <span className={styles.title}>Add New Organisation</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <Input placeholder="Organisation Name" value={organisation.organisation_name} onChange={handleOrgNameChange} required={true}/>
          <Input placeholder="Dislpay Name" value={organisation.display_name} onChange={handleDisplayNameChange} required={true}/>
        </div>
        <Button onClick={handleSubmit} type="submit">Add</Button>
      </form>
    </div>
  );
};