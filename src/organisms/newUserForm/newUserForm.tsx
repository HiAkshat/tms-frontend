import { useEffect, useState } from "react";
import styles from "./NewUserForm.module.scss";

import organisationUserServices from "../../services/organisationUser";
import organisationServices from "../../services/organisation";

import { OrganisationType } from "../../services/organisation/types";

import helpers from "../../helpers";

import EmailInput from "../../atoms/EmailInput/EmailInput";
import NameInput from "../../atoms/NameInput/NameInput";
import DateInput from "../../atoms/DateInput/dateInput";
import SelectInput from "../../atoms/SelectInput/SelectInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import showToast from "../../atoms/Toast/Toast";

export default function NewOrganisationForm({setIsLoading}: any) {
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [dob, setDob] = useState<Date>()
  const [joiningDate, setJoiningDate] = useState()
  const [organisation, setOrganisation] = useState("")

  const [organisations, setOrganisations] = useState<[OrganisationType]>()

  useEffect(()=>{
    organisationServices.getOrganisations().then((res)=>setOrganisations(res.data))
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!(helpers.validateEmail(email) && helpers.validateName(firstName) && helpers.validateName(lastName) && dob && joiningDate && helpers.isDateBeforeDate(dob, joiningDate) && helpers.isDateBeforeNow(joiningDate))){
      showToast("Invalid data")
      return
    }

    try {
      const data = {
        dob: new Date(dob),
        email_id: email,
        first_name: firstName,
        last_name: lastName,
        joining_date: new Date(joiningDate),
        organisation: organisation
      }

      setIsLoading(true)
      await organisationUserServices.addOrganisationUser(data);

      setEmail("")
      setFirstName("")
      setLastName("")
      setDob(undefined)
      setJoiningDate(undefined)
      setOrganisation("")

    } catch (error) {
      return;
    }
  };

  return (
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
          {organisations && <SelectInput arr={organisations} value={"_id"} label={"organisation_name"} data={organisation} setData={setOrganisation}/>}
        </div>
      </form>
    </div>
  );
}
