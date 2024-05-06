import { useState, useEffect } from "react"
import styles from "./NewUserForm.module.scss"
import { getData } from "../../services/getData";
import showToast from "../../atoms/Toast/Toast";
import TextInput from "../../atoms/TextInput/TextInput";
import DateInput from "../../atoms/DateInput/DateInput";

import { Form, ButtonToolbar, Button, Input } from 'rsuite';
import React from "react";

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


interface OrganisationUser {
  email_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  organisation: string;
  joining_date: string;
}

export default function NewOrganisationForm() {
  const [organisationUser, setOrganisationUser] = useState<OrganisationUser>({
    email_id: '',
    first_name: '',
    last_name: '',
    dob: '',
    organisation: '',
    joining_date: ''
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
      dob: '',
      organisation: '',
      joining_date: ''
    });

    showToast("User added successfully!")
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sampleObj = {
      ...organisationUser,
      [name]: value,
    }
    setOrganisationUser(sampleObj);
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