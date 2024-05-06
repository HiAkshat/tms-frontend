import { useState, useEffect } from "react"
import styles from "./EditUser.module.scss"
import { useParams } from 'react-router-dom'
import showToast from "../../atoms/Toast/Toast";
import { getData } from "../../services/getData";
import TextInput from "../../atoms/TextInput/TextInput";
import DateInput from "../../atoms/DateInput/DateInput";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";

interface OrganisationUser {
  email_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  organisation: string;
  joining_date: string;
}

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [organisationUser, setOrganisationUser] = useState<OrganisationUser>({
    email_id: '',
    first_name: '',
    last_name: '',
    dob: "",
    organisation: '',
    joining_date: ""
  })

  const organisations = getData('http://127.0.0.1:8000/api/organisation')

  const [selectedOrganisation, setSelectedOrganisation] = useState('');

  useEffect(() => {
    fetchUser()
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/organisationUser/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch organisations');
      }
      const data = await response.json();
      console.log(data)
      setOrganisationUser(data);
      setSelectedOrganisation(data.organisation)
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  const handleSelectChange = (e: any) => {
    setSelectedOrganisation(e.target.value);
    const { name, value } = e.target;
    setOrganisationUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(organisationUser)
    const res = await fetch(`http://127.0.0.1:8000/api/organisationUser/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisationUser)
    })

    if (!res.ok){
      showToast("Error editing user!")
      return
    }

    setOrganisationUser({
      email_id: '',
      first_name: '',
      last_name: '',
      dob: "",
      organisation: '',
      joining_date: ""
    });

    showToast("User edited successfully!")
    navigate("..")
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganisationUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
  <div>
    <Navbar />
    <div className={styles.main}>
      <span className={styles.title}>Edit User</span>
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
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  </div>
  );
};