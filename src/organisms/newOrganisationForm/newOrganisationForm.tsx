import { useState } from "react"
import styles from "./NewOrganisationForm.module.scss"
import showToast from "../../atoms/Toast/Toast";

import { Input, Button, Schema } from 'rsuite';
import { StringType } from 'schema-typed';

const model = Schema.Model({
  organisation_name: StringType().isRequired("This field is required!"),
  display_name: StringType().isRequired("This field is required!")
  // email: StringType().isEmail().isRequired(),
  // age: NumberType().range(18, 30),
  // password: StringType().isRequired().proxy(['confirmPassword']),
  // confirmPassword: StringType().equalTo('password')
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

    const res = await fetch("http://127.0.0.1:8000/api/organisation", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisation)
    })

    if (!res.ok){
      showToast("Error adding organisation!")
      return
    }

    setOrganisation({
      organisation_name: '',
      display_name: '',
    });

    showToast("Organisation added successfully!")
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