import styles from "./EditOrganisation.module.scss"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import organisationServices from "../../services/organisation";

import { Button, Input } from "rsuite";
import Navbar from "../Navbar/navbar";

export default function EditOrganisation() {
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true)
  const [isOrgNameValid, setIsOrgnNameValid] = useState(true)

  const navigate = useNavigate()

  const { id } = useParams()
  const [organisation, setOrganisation] = useState<OrganisationType>({
    organisation_name: '',
    display_name: '',
  })

  useEffect(()=>{
    organisationServices.getOrganisation(id).then((data)=>{setOrganisation(data)})
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    validateName(organisation.organisation_name, setIsOrgnNameValid)
    validateName(organisation.display_name, setIsDisplayNameValid)

    if (!isOrgNameValid || !isDisplayNameValid) return

    try {
      await organisationServices.editOrganisation(organisation, id)
      setOrganisation({
        organisation_name: '',
        display_name: '',
      });

      navigate("..")
    } catch (error) {
      return
    }
  };

  const validateName = (name: string, setIsNameValid: any) => {
    if (name=="") setIsNameValid(false)
    else setIsNameValid(true)
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

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <span className={styles.title}>Edit Organisation</span>
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
          <Button onClick={handleSubmit} type="submit">Edit</Button>

          {/* <div className={styles.fieldInfo}>
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
          <button className={styles.addButton} type="submit">Edit</button> */}
        </form>
      </div>
    </div>
  );
};
