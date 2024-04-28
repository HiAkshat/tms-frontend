import styles from "./index.module.scss"
import NewOrganisationForm from "../../organisms/newOrganisationForm/newOrganisationForm"
import Navbar from "../../organisms/navbar/navbar"
import OrganisationTable from "../../organisms/organisationTable/organisationTable"
import { useState, useEffect } from "react"

export default function ManageOrganisations(){
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/organisation');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);


  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewOrganisationForm />
        <div className={styles.tableDiv}>
          <span>Organisations Table</span>
          <OrganisationTable data={data} />
        </div>
      </div>
    </div>
  )
}
