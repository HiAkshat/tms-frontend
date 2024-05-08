import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getData } from "../../services/getData"
import { useSelector } from "react-redux"

import styles from "./EditTicket.module.scss"

import { useNavigate } from "react-router-dom"
import ticketServices from "../../services/ticket"
import { NavUserType, StateType } from "../../typings/navUser"

// interface Ticket {
//   type: string,
//   summary: string,
//   description: string,
//   assignee: string,
//   reporter: string,
//   status: string,
//   due_date: string
// }

export default function EditTicket() {
  const navigate = useNavigate()
  const {id} = useParams()
  const user = useSelector((state : StateType) => state.user)
  const users = getData(`http://localhost:8000/api/organisationUser/organisation/${user.organisation_id}`)

  const [assignee, setAssignee] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');
  const statuses = ['To be picked', 'In progress', 'In testing', 'Completed']
  const [status, setStatus] = useState<string>('')

  const [ticketData, setTicketData] = useState({
    type: "",
    summary: "",
    description: "",
    assignee: "",
    reporter: "",
    status: "",
    due_date: "new Date('2022-10-31T09:00:00Z')"
  })

  // let ticketEditDetails = {
  //   ticket: "",
  //   user: user.name,
  //   field: "",
  //   old_value: "",
  //   new_value: ""
  // }

  useEffect(()=>{
    try {
      ticketServices.getTicket(id).then(data => {
        setTicketData(data)
        console.log("HEY")
      })
    } catch (error){
      return
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await ticketServices.editTicket(ticketData, id)
      navigate("../viewTickets")
    } catch (error) {
      return
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setAssignee(value)
    setTicketData({
      ...ticketData,
      [name]: value
    })
  }

  const handleReporterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setReporter(value)
    setTicketData({
      ...ticketData,
      [name]: value
    })
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setStatus(value)
    setTicketData({
      ...ticketData,
      [name]: value
    })
  }

  return (
    <div className={styles.main}>
      <span className={styles.title}>Create Ticket</span>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldsDiv}>
          <div className={styles.fieldInfo}>
            <label className={styles.fieldTitle} htmlFor="type">Type:</label>
            <select id="type" name="type" value={ticketData.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Story">Story</option>
              <option value="Task">Task</option>
              <option value="Bug">Bug</option>
            </select>
          </div>
          <div className={styles.fieldInfo}>
            <label className={styles.fieldTitle} htmlFor="summary">Summary:</label>
            <input type="text" id="summary" name="summary" value={ticketData.summary} onChange={handleChange} required />
          </div>
          <div className={styles.fieldInfo}>
            <label className={styles.fieldTitle} htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={ticketData.description} onChange={handleChange}></textarea>
          </div>
          <div className={styles.fieldInfo}>
            <label className={styles.fieldTitle} htmlFor="due_date">Due Date:</label>
            <input type="date" id="due_date" name="due_date" value={ticketData.due_date} onChange={handleChange} />
          </div>
          <div className={styles.fieldInfo}>
              <label className={styles.fieldTitle} htmlFor="status">Status:</label>
              <select name="status" id="status" value={status} onChange={handleStatusChange}>
                <option value="">Select status</option>
                {statuses.map((status: string) => (
                  <option key={status} value={status}>{`${status}`}</option>
                ))}
              </select>
            </div>
          {!users.isLoading &&
            <div className={styles.fieldInfo}>
              <label className={styles.fieldTitle} htmlFor="assignee">Assignee:</label>
              <select name="assignee" id="assignee" value={assignee} onChange={handleAssigneeChange}>
                <option value="">Select Assignee</option>
                {users.data.map((user: UserType) => (
                  <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
                ))}
              </select>
            </div>
          }
          {!users.isLoading &&
            <div className={styles.fieldInfo}>
              <label className={styles.fieldTitle} htmlFor="assignee">Reporter:</label>
              <select name="reporter" id="reporter" value={reporter} onChange={handleReporterChange}>
                <option value="">Select Reporter</option>
                {users.data.map((user: UserType) => (
                  <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
                ))}
              </select>
            </div>
          }
        </div>
        <button className={styles.addButton} type="submit">Submit</button>
      </form>
    </div>
  )
}
