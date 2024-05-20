import { useState, useEffect } from "react"
import styles from "./EditUser.module.scss"
import { useParams } from 'react-router-dom'
import DateInput from "../../atoms/DateInput/DateInput";
import { useNavigate } from "react-router-dom";
import organisationUserServices from "../../services/organisationUser";
import NameInput from "../../atoms/NameInput/NameInput";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import helpers from "../../helpers";
import showToast from "../../atoms/Toast/Toast";
import { OrganisationUserType } from "../../services/organisationUser/types";
import Navbar from "../Navbar/navbar";

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [dob, setDob] = useState<Date>()

  useEffect(() => {
    try {
      organisationUserServices.getOrganisationUser(id).then((data: OrganisationUserType) => {

        setEmail(data.email_id)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setDob(new Date(data.dob))
      })
    } catch (error) {
      return
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(helpers.validateEmail(email) && helpers.validateName(firstName) && helpers.validateName(lastName) && dob)){
      showToast("Invalid data")
      return
    }

    const data = {
      email_id: email,
      dob: new Date(dob),
      first_name: firstName,
      last_name: lastName,
    }

    try {
      await organisationUserServices.editOrganisationUser(data, id)

      navigate("..")
    } catch (error) {
      return
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <span className={styles.title}>Add New User</span>
        <form onSubmit={handleSubmit} className={styles.theForm}>
          <div className={styles.inputs}>
            <NameInput field="First Name" name={firstName} setName={setFirstName} placeholder="First Name" />
            <CustomButton onClick={handleSubmit} type="submit" text="Update details" width="100%"/>
          </div>
          <div className={styles.inputs}>
            <NameInput field="Last Name" name={lastName} setName={setLastName} placeholder="Last Name" />
          </div>
          <div className={styles.inputs}>
            <DateInput date={dob} setDate={setDob} placeholder={"DOB"} />
          </div>
        </form>
      </div>
    </div>
  );
};
