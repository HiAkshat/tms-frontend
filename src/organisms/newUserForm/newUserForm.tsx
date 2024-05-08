import { useState } from "react"
import styles from "./NewUserForm.module.scss"
import { getData } from "../../services/getData";

import { DatePicker, Button, Input, SelectPicker } from 'rsuite';
import { useNavigate } from "react-router-dom";

import organisationUserServices from "../../services/organisationUser";

export default function NewOrganisationForm() {
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      await organisationUserServices.addOrganisationUser(organisationUser)

      setOrganisationUser({
        email_id: '',
        first_name: '',
        last_name: '',
        dob: new Date(),
        organisation: '',
        joining_date: new Date()
      });

      navigate(0)
    } catch (error) {
      return
    }
  };

  return (
    <div className={styles.main}>
      <span className={styles.title}>Add New User</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <Input placeholder="E-mail ID" value={organisationUser.email_id} onChange={(val: string)=>setOrganisationUser({...organisationUser, email_id: val})} required={true}/>
          <Input placeholder="First Name" value={organisationUser.first_name} onChange={(val: string)=>setOrganisationUser({...organisationUser, first_name: val})} required={true}/>
          <Input placeholder="Last Name" value={organisationUser.last_name} onChange={(val: string)=>setOrganisationUser({...organisationUser, last_name: val})}required={true}/>
        </div>
        <div className={styles.inputs}>
          <DatePicker name="dob" value={organisationUser.dob} onChange={(val: Date|null)=>{setOrganisationUser({...organisationUser, dob: val ?? new Date()})}} placeholder="DOB"/>
          <DatePicker name="joining_date" value={organisationUser.joining_date} onChange={(val: Date|null)=>{setOrganisationUser({...organisationUser, joining_date: val ?? new Date()})}} placeholder="Joining Date" />
          {!organisations.isLoading && <SelectPicker data={organisations.data.map((org: OrganisationType) => ({label: org.organisation_name, value: org._id}))} onChange={(val)=>{setOrganisationUser({...organisationUser, organisation: val ?? ""})}} value={organisationUser.organisation}/> }

          </div>
        <div className={styles.inputs}>
          <Button onClick={handleSubmit} type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
};
