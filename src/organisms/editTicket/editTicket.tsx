import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getData } from "../../services/getData"
import { useSelector } from "react-redux"
import styles from "./index.module.scss"
import TicketDetails from "../../pages/ticketDetails/ticketDetails"
import showToast from "../../atoms/toast"
import { useNavigate } from "react-router-dom"

interface Ticket {
  type: string,
  summary: string,
  description: string,
  assignee: string,
  reporter: string,
  status: string,
  due_date: string
}

export default function EditTicket() {
  const navigate = useNavigate()
  const {id} = useParams()
  const user = useSelector((state: any) => state.user)
  const users = getData(`http://localhost:8000/api/organisationUser/organisation/${user.organisation_id}`)

  const [assignee, setAssignee] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');
  const statuses = ['To be picked', 'In progress', 'In testing', 'Completed']
  const [status, setStatus] = useState<string>('')

  const [ticketData, setTicketData] = useState<Ticket>({
    type: user,
    summary: "",
    description: "",
    assignee: "",
    reporter: "",
    status: "",
    due_date: "new Date('2022-10-31T09:00:00Z')"
  })

  let ticketEditDetails = {
    ticket: "",
    user: user.name,
    field: "",
    old_value: "",
    new_value: ""
  }

  useEffect(()=>{
    fetchTicket()
  }, [])

  const fetchTicket = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ticket/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ticket!');
      }
      const data = await response.json();
      console.log(data)
      setTicketData(data);
      setAssignee(data.assignee._id)
      setReporter(data.reporter._id)
      setStatus(data.status)

      ticketEditDetails.ticket = data._id
      
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`http://127.0.0.1:8000/api/ticket/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData)
    })

    if (!res.ok){
      showToast("Error editing user!")
      return
    }

    const res2 = await fetch(`http://127.0.0.1:8000/api/ticketHistory/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData)
    })


    showToast("User edited successfully!")
    navigate("../viewTickets")
    
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  const handleAssigneeChange = (e: any) => {
    const {name, value} = e.target;
    setAssignee(value)
    setTicketData({
      ...ticketData,
      [name]: value
    })
  }

  const handleReporterChange = (e: any) => {
    const {name, value} = e.target;
    setReporter(value)
    setTicketData({
      ...ticketData,
      [name]: value
    })
  }

  const handleStatusChange = (e: any) => {
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
                {statuses.map((status: any) => (
                  <option key={status} value={status}>{`${status}`}</option>
                ))}
              </select>
            </div>
          {!users.isLoading && 
            <div className={styles.fieldInfo}>
              <label className={styles.fieldTitle} htmlFor="assignee">Assignee:</label>
              <select name="assignee" id="assignee" value={assignee} onChange={handleAssigneeChange}>
                <option value="">Select Assignee</option>
                {users.data.map((user: any) => (
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
                {users.data.map((user: any) => (
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