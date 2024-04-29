import { useState } from "react"
import styles from "./index.module.scss"
import showToast from "../../atoms/toast";

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
    console.log(res)
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
        <button className={styles.addButton} type="submit">Add</button>
      </form>
    </div>
  );
};