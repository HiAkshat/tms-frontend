import styles from "./EditOrganisation.module.scss"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import organisationServices from "../../services/organisation";


export default function EditOrganisation() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [organisation, setOrganisation] = useState<OrganisationType>({
    organisation_name: '',
    display_name: '',
  })

  useEffect(()=>{
    organisationServices.getOrganisation(id).then((data)=>{setOrganisation(data)})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await organisationServices.editOrganisation(organisation, id)
      navigate("..")
      setOrganisation({
        organisation_name: '',
        display_name: '',
      });
    } catch (error) {
      return
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganisation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.main}>
      <span className={styles.title}>Edit Organisation</span>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldInfo}>
          <label className={styles.fieldTitle}>Organisation Name</label>
          <input
            type="text"
            name="organisation_name"
            value={organisation.organisation_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.fieldInfo}>
          <label className={styles.fieldTitle}>Display Name</label>
          <input
            type="text"
            name="display_name"
            value={organisation.display_name}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.addButton} type="submit">Edit</button>
      </form>
    </div>
  );
};
