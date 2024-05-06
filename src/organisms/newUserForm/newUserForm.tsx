import { useState, useEffect } from "react"
import styles from "./index.module.scss"
import { getData } from "../../services/getData";
import showToast from "../../atoms/toast/toast";
import TextInput from "../../atoms/textInput/textInput";
import DateInput from "../../atoms/dateInput/dateInput";

import { Button, ButtonGroup, ButtonToolbar } from 'rsuite';

interface OrganisationUser {
  email_id: string;
  first_name: string;
  last_name: string;
  dob: Date;
  organisation: string;
  joining_date: Date;
}

export default function NewOrganisationForm() {
  const [organisationUser, setOrganisationUser] = useState<OrganisationUser>({
    email_id: '',
    first_name: '',
    last_name: '',
    dob: new Date('2022-10-31T09:00:00Z'),
    organisation: '',
    joining_date: new Date('2022-10-31T09:00:00Z')
  })

  const organisations = getData('http://127.0.0.1:8000/api/organisation')
  const [selectedOrganisation, setSelectedOrganisation] = useState('');

  const handleSelectChange = (e: any) => {
    setSelectedOrganisation(e.target.value);
    const { name, value } = e.target;
    setOrganisationUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(organisationUser)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("http://127.0.0.1:8000/api/organisationUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisationUser)
    })

    if (!res.ok){
      showToast("Error adding organisation user!")
      return
    }

    setSelectedOrganisation("")
    setOrganisationUser({
      email_id: '',
      first_name: '',
      last_name: '',
      dob: new Date('2022-10-31T09:00:00Z'),
      organisation: '',
      joining_date: new Date('2022-10-31T09:00:00Z')
    });

    showToast("User added successfully!")
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganisationUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.main}>
      <span className={styles.title}>Add New User</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <TextInput placeholder="E-mail ID" name="email_id" value={organisationUser.email_id} onChange={handleChange} required={true} />
          <TextInput placeholder="First Name" name="first_name" value={organisationUser.first_name} onChange={handleChange} required={true} />
          <TextInput placeholder="Last Name" name="last_name" value={organisationUser.last_name} onChange={handleChange} required={true} />
        </div>
        <div className={styles.inputs}>
          <DateInput name="dob" value={organisationUser.dob} onChange={handleChange} placeholder="DOB" required={true} />
          <DateInput name="joining_date" value={organisationUser.joining_date} onChange={handleChange} placeholder="Joining Date" required={true} />
        </div>
        <div className={styles.inputs}>
          {!organisations.isLoading &&
            <select name="organisation" id="organisation" value={selectedOrganisation} onChange={handleSelectChange}>
            <option value="">Select an organisation</option>
            {organisations.data.map((org: any) => (
              <option key={org._id} value={org._id}>{org.organisation_name}</option>
            ))}
            </select>
          }
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
};