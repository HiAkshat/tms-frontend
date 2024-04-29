import { useState, useEffect } from "react"
import styles from "./index.module.scss"
import { useParams } from 'react-router-dom'
import showToast from "../../atoms/toast";

interface OrganisationUser {
  email_id: string;
  first_name: string;
  last_name: string;
  dob: Date;
  organisation: string;
  joining_date: Date;
}

export default function EditUser() {
  const { id } = useParams()

  const [organisationUser, setOrganisationUser] = useState<OrganisationUser>({
    email_id: '',
    first_name: '',
    last_name: '',
    dob: new Date('2022-10-31T09:00:00Z'),
    organisation: '',
    joining_date: new Date('2022-10-31T09:00:00Z')
  })

  const [organisations, setOrganisations] = useState([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState('');

  useEffect(() => {
    fetchOrganisations();
    fetchUser()
  }, []);

  const fetchOrganisations = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/organisation`); // Replace '/api/organisations' with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch organisations');
      }
      const data = await response.json();
      setOrganisations(data);
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/organisationUser/${id}`); // Replace '/api/organisations' with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch organisations');
      }
      const data = await response.json();
      console.log(data)
      setOrganisationUser(data);
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  const handleSelectChange = (e) => {
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
      dob: new Date('2022-10-31T09:00:00Z'),
      organisation: '',
      joining_date: new Date('2022-10-31T09:00:00Z')
    });

    showToast("User edited successfully!")
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
    <span className={styles.title}>Edit User</span>
    <form onSubmit={handleSubmit}>
      <div className={styles.fieldInfo}>
        <label className={styles.fieldTitle}>Email ID</label>
        <input
          type="text"
          name="email_id"
          value={organisationUser.email_id}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.fieldInfo}>
        <label className={styles.fieldTitle}>First Name</label>
        <input
          type="text"
          name="first_name"
          value={organisationUser.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.fieldInfo}>
        <label className={styles.fieldTitle}>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={organisationUser.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.fieldInfo}>
        <label className={styles.fieldTitle}>DOB</label>
        <input
          type="date"
          name="dob"
          value={organisationUser.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.fieldInfo}>
        <label className={styles.fieldTitle}>Joining Date</label>
        <input
          type="date"
          name="joining_date"
          value={organisationUser.joining_date}
          onChange={handleChange}
          required
        />
      </div>
      <select name="organisation" id="organisation" value={selectedOrganisation} onChange={handleSelectChange}>
        <option value="">Select an organisation</option>
        {organisations.map((org) => (
          <option key={org._id} value={org._id}>{org.organisation_name}</option>
        ))}
      </select>
      <button className={styles.addButton} type="submit">Edit</button>
    </form>
  </div>

  );
};