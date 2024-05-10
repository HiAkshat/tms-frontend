import { useState } from "react";
import styles from "./NewUserForm.module.scss";
import { getData } from "../../services/getData";

import { DatePicker, Button, Input, SelectPicker } from "rsuite";
import { useNavigate } from "react-router-dom";

import organisationUserServices from "../../services/organisationUser";
import showToast from "../../atoms/Toast/Toast";

export default function NewOrganisationForm() {
  const navigate = useNavigate();

  const [organisationUser, setOrganisationUser] = useState<SendUserType>({
    email_id: "",
    first_name: "",
    last_name: "",
    dob: new Date(),
    organisation: "",
    joining_date: new Date(),
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true)
  const [isLastNameValid, setIsLastNameValid] = useState(true)


  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setIsEmailValid(false);
      return false
    } else {
      setIsEmailValid(true);
      return true
    }
  };

  const validateName = (name: string, setIsNameValid: any) => {
    const namePattern = /^[a-z ,.'-]+$/i
    if (!namePattern.test(name)) {
      setIsNameValid(false);
      return false
    } else {
      setIsNameValid(true);
      return true
    }
  };

  const organisations = getData("http://127.0.0.1:8000/api/organisation");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    validateEmail(organisationUser.email_id)
    validateName(organisationUser.first_name, setIsFirstNameValid)
    validateName(organisationUser.last_name, setIsLastNameValid)

    if (!isEmailValid || !isFirstNameValid || !isLastNameValid) return

    try {
      await organisationUserServices.addOrganisationUser(organisationUser);

      setOrganisationUser({
        email_id: "",
        first_name: "",
        last_name: "",
        dob: new Date(),
        organisation: "",
        joining_date: new Date(),
      });

      navigate(0);
    } catch (error) {
      return;
    }
  };

  return (
    <div className={styles.main}>
      <span className={styles.title}>Add New User</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <div className={styles.inputField}>
            <Input
              placeholder="E-mail ID"
              value={organisationUser.email_id}
              onChange={(val: string) =>{
                setTimeout(() => {
                  validateEmail(val)
                }, 1000);
                setOrganisationUser({ ...organisationUser, email_id: val })
              }
              }
              required={true}
            />
            <span hidden={isEmailValid}>Invalid email</span>
          </div>
          <div className={styles.inputField}>
            <Input
              placeholder="First Name"
              value={organisationUser.first_name}
              onChange={(val: string) =>{
                setTimeout(() => {
                  validateName(val, setIsFirstNameValid)
                }, 1000);
                setOrganisationUser({ ...organisationUser, first_name: val })
              }}
              required={true}
            />
            <span hidden={isFirstNameValid}>Invalid first name</span>
          </div>
          <div className={styles.inputField}>
            <Input
              placeholder="Last Name"
              value={organisationUser.last_name}
              onChange={(val: string) =>{
                setTimeout(() => {
                  validateName(val, setIsLastNameValid)
                }, 1000);
                setOrganisationUser({ ...organisationUser, last_name: val })
              }}
              required={true}
            />
            <span hidden={isLastNameValid}>Invalid last name</span>
          </div>

        </div>
        <div className={styles.inputs}>
          <DatePicker
            name="dob"
            value={organisationUser.dob}
            onChange={(val: Date | null) => {
              setOrganisationUser({
                ...organisationUser,
                dob: val ?? new Date(),
              });
            }}
            placeholder="DOB"
          />
          <DatePicker
            name="joining_date"
            value={organisationUser.joining_date}
            onChange={(val: Date | null) => {
              setOrganisationUser({
                ...organisationUser,
                joining_date: val ?? new Date(),
              });
            }}
            placeholder="Joining Date"
          />
          {!organisations.isLoading && (
            <SelectPicker
              data={organisations.data.map((org: OrganisationType) => ({
                label: org.organisation_name,
                value: org._id,
              }))}
              onChange={(val) => {
                setOrganisationUser({
                  ...organisationUser,
                  organisation: val ?? "",
                });
              }}
              value={organisationUser.organisation}
            />
          )}
        </div>
        <div className={styles.inputs}>
          <Button onClick={handleSubmit} type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
