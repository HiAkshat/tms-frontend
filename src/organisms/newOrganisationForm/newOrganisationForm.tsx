import { useState } from "react"
import styles from "./NewOrganisationForm.module.scss"
import showToast from "../../atoms/Toast/Toast";
import TextInput from "../../atoms/TextInput/TextInput";

interface Organisation {
  organisation_name: string;
  display_name: string;
}

export default function NewOrganisationForm() {
  const [organisation, setOrganisation] = useState<Organisation>({
    organisation_name: '',
    display_name: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch("http://127.0.0.1:8000/api/organisation", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisation)
    })

    if (!res.ok){
      showToast("Error adding organisation!")
      return
    }

    setOrganisation({
      organisation_name: '',
      display_name: '',
    });

    showToast("Organisation added successfully!")
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
      <span className={styles.title}>Add New Organisation</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <TextInput name="organisation_name" value={organisation.organisation_name} onChange={handleChange} placeholder="Organisation Name" required={true} />
          <TextInput name="display_name" value={organisation.display_name} onChange={handleChange} placeholder="Display Name" required={true} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};