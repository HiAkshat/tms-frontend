import { useState, useEffect } from "react"
import styles from "./EditUser.module.scss"
import { useParams } from 'react-router-dom'
import { getData } from "../../services/getData";
import TextInput from "../../atoms/TextInput/TextInput";
import DateInput from "../../atoms/DateInput/DateInput";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import organisationUserServices from "../../services/organisationUser";

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [organisationUser, setOrganisationUser] = useState<SendUserType>({
    email_id: '',
    first_name: '',
    last_name: '',
    dob: new Date(),
    organisation: '',
    joining_date: new Date()
  })

  const organisations = getData('http://127.0.0.1:8000/api/organisation')

  const [selectedOrganisation, setSelectedOrganisation] = useState('');

  useEffect(() => {
    try {
      organisationUserServices.getOrganisationUser(id).then(data => {
        setOrganisationUser(data)
        setSelectedOrganisation(data.organisation)
      })
    } catch (error) {
      return
    }
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrganisation(e.target.value);
    const { name, value } = e.target;
    setOrganisationUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await organisationUserServices.editOrganisationUser(organisationUser, id)
      setOrganisationUser({
        email_id: '',
        first_name: '',
        last_name: '',
        dob: new Date(),
        organisation: '',
        joining_date: new Date()
      });
      navigate("..")
    } catch (error) {
      return
    }
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
          <DateInput name="dob" value={organisationUser.dob.toString()} onChange={handleChange} placeholder="DOB" required={true} />
          <DateInput name="joining_date" value={organisationUser.joining_date.toString()} onChange={handleChange} placeholder="Joining Date" required={true} />
        </div>
        <div className={styles.inputs}>
          {!organisations.isLoading &&
            <select name="organisation" id="organisation" value={selectedOrganisation} onChange={handleSelectChange}>
            <option value="">Select an organisation</option>
            {organisations.data.map((org: OrganisationType) => (
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
