import { useState, useEffect } from "react"
import styles from "./EditUser.module.scss"
import { useParams } from 'react-router-dom'
import TextInput from "../../atoms/TextInput/TextInput";
import DateInput from "../../atoms/DateInput/DateInput";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import organisationUserServices from "../../services/organisationUser";
import organisationServices from "../../services/organisation";
import EmailInput from "../../atoms/EmailInput/EmailInput";
import NameInput from "../../atoms/NameInput/NameInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import SelectInput from "../../atoms/SelectInput/SelectInput";
import helpers from "../../helpers";
import showToast from "../../atoms/Toast/Toast";

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [dob, setDob] = useState("")
  const [joiningDate, setJoiningDate] = useState()
  const [organisation, setOrganisation] = useState("")
  const [organisations, setOrganisations] = useState<[OrganisationType]>()

  useEffect(() => {
    try {
      organisationServices.getOrganisations().then(res => setOrganisations(res.data))

      organisationUserServices.getOrganisationUser(id).then(data => {
        setEmail(data.email_id)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setDob(data.dob)
        setOrganisation(data.organisation)
      })
    } catch (error) {
      return
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(helpers.validateEmail(email) && helpers.validateName(firstName) && helpers.validateName(lastName) && dob && joiningDate && helpers.isDateBeforeDate(dob, joiningDate) && helpers.isDateBeforeNow(joiningDate))){
      showToast("Invalid data")
      return
    }

    const data = {
      dob: new Date(dob),
      email_id: email,
      first_name: firstName,
      last_name: lastName,
      joining_date: new Date(joiningDate),
      organisation: organisation
    }

    try {
      await organisationUserServices.editOrganisationUser(data, id)

      navigate("..")
    } catch (error) {
      return
    }
  };

  return (
  // <div>
  //   <Navbar />
  //   <div className={styles.main}>
  //     <span className={styles.title}>Edit User</span>
  //     <form onSubmit={handleSubmit} className={styles.theForm}>
  //       <div className={styles.inputs}>
  //         <TextInput placeholder="E-mail ID" name="email_id" value={organisationUser.email_id} onChange={handleChange} required={true} />
  //         <TextInput placeholder="First Name" name="first_name" value={organisationUser.first_name} onChange={handleChange} required={true} />
  //         <TextInput placeholder="Last Name" name="last_name" value={organisationUser.last_name} onChange={handleChange} required={true} />
  //       </div>
  //       <div className={styles.inputs}>
  //         <DateInput name="dob" value={organisationUser.dob.toString()} onChange={handleChange} placeholder="DOB" required={true} />
  //         <DateInput name="joining_date" value={organisationUser.joining_date.toString()} onChange={handleChange} placeholder="Joining Date" required={true} />
  //       </div>
  //       <div className={styles.inputs}>
  //         {organisations &&
  //           <select name="organisation" id="organisation" value={selectedOrganisation} onChange={handleSelectChange}>
  //           <option value="">Select an organisation</option>
  //           {organisations.map((org: OrganisationType) => (
  //             <option key={org._id} value={org._id}>{org.organisation_name}</option>
  //           ))}
  //           </select>
  //         }
  //         <button type="submit">Edit</button>
  //       </div>
  //     </form>
  //   </div>
  // </div>

  <div className={styles.main}>
  <span className={styles.title}>Add New User</span>
  <form onSubmit={handleSubmit} className={styles.theForm}>
    <div className={styles.inputs}>
      <EmailInput email={email} setEmail={setEmail} placeholder={"Email"} />
      <NameInput field="First Name" name={firstName} setName={setFirstName} placeholder="First Name" />
      <NameInput field="Last Name" name={lastName} setName={setLastName} placeholder="Last Name" />
      <CustomButton onClick={handleSubmit} type="submit" text="Add" width="100%"/>
    </div>
    <div className={styles.inputs}>
      <DateInput date={dob} setDate={setDob} placeholder={"DOB"} />
      <DateInput date={joiningDate} setDate={setJoiningDate} placeholder={"Joining Date"} />
      {organisations && <SelectInput data={organisations} value={"_id"} label={"organisation_name"} setValue={setOrganisation}/>}
    </div>
  </form>
</div>
  );
};
