import Navbar from "../../organisms/navbar"
import NewUserForm from "../../organisms/newUserForm/newUserForm"
import UserTable from "../../organisms/userTable/userTable"
import { useState, useEffect } from "react";
import styles from "./index.module.scss"

export default function ManageUsers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/organisationUser');
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
    console.log(data)
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <NewUserForm />
        <div className={styles.tableDiv}>
          <span>Users Table</span>
          <UserTable data={data}/>
        </div>
      </div>
    </div>
  )
}
