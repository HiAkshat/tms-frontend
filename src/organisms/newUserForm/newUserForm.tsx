import { useState, useEffect } from "react"
import { Notification, toaster } from 'rsuite';
import styles from "./index.module.scss"

interface OrganisationUser {
  email_id: string;
  first_name: string;
  last_name: string;
  dob: Date;
  organisation: string; // Assuming you will pass the ObjectId as a string
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

  const [organisations, setOrganisations] = useState([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState('');

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const fetchOrganisations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/organisation'); // Replace '/api/organisations' with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch organisations');
      }
      const data = await response.json();
      setOrganisations(data);
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
    const res = await fetch("http://127.0.0.1:8000/api/organisationUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisationUser)
    })
    console.log("HEY")
    console.log(res)
    if (!res.ok){
      toaster.push(<Notification>Error adding organisation user!</Notification>, {
        placement: 'bottomEnd'
      });
      return
    }

    // Reset form fields after submission
    setOrganisationUser({
      email_id: '',
      first_name: '',
      last_name: '',
      dob: new Date('2022-10-31T09:00:00Z'),
      organisation: '',
      joining_date: new Date('2022-10-31T09:00:00Z')
    });

    toaster.push(<Notification>User added successfully!</Notification>, {
      placement: 'bottomEnd',
    });
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
        <button className={styles.addButton} type="submit">Add</button>
      </form>
    </div>
  );
};