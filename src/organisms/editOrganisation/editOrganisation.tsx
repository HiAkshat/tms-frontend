import { Notification, toaster } from 'rsuite';
import styles from "./index.module.scss"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface Organisation {
  organisation_name: string;
  display_name: string;
}

export default function EditOrganisation() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [organisation, setOrganisation] = useState<Organisation>({
    organisation_name: '',
    display_name: '',
  })

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/organisation/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setOrganisation(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
  }, [])

  console.log("HEY")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`http://127.0.0.1:8000/api/organisation/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisation)
    })

    if (!res.ok){
      console.log("NOO")
      toaster.push(<Notification>Error editing organisation!</Notification>, {
        placement: 'bottomEnd'
      });
      return
    }

    navigate("..")

    // Reset form fields after submission
    setOrganisation({
      organisation_name: '',
      display_name: '',
    });

    toaster.push(<Notification>Organisation edited successfully!</Notification>, {
      placement: 'bottomEnd',
    });
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