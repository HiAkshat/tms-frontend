import { FormEvent, useState, useEffect } from 'react';
import { getData } from '../../services/getData';
import showToast from '../../atoms/toast/toast';
import { useSelector } from 'react-redux';
import styles from "./index.module.scss"
import TextInput from '../../atoms/textInput/textInput';
import DateInput from '../../atoms/dateInput/dateInput';

function NewTicketForm() {
  const [assignee, setAssignee] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');
  const user = useSelector((state: any) => state.user)
  const users = getData(`http://localhost:8000/api/organisationUser/organisation/${user.organisation_id}`)

  const [ticketData, setTicketData] = useState({
    organisation: user.organisation_id,
    type: '',
    key: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
    due_date: '',
    files: [],
  });

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(ticketData)
    ticketData.organisation = user.organisation_id
    const res = await fetch("http://127.0.0.1:8000/api/ticket", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData)
    })
    console.log(res)

    if (!res.ok){
      showToast("Error adding new ticket!")
      return
    }

    showToast("Ticket successfully added!")
  };

  return (
    // <div className={styles.main}>
    //   <span className={styles.title}>Create Ticket</span>
    //   <form onSubmit={handleSubmit}>
    //     <div className={styles.fieldsDiv}>
    //       <div className={styles.fieldInfo}>
    //         <label className={styles.fieldTitle} htmlFor="type">Type:</label>
    //         <select id="type" name="type" value={ticketData.type} onChange={handleChange} required>
    //           <option value="">Select Type</option>
    //           <option value="Story">Story</option>
    //           <option value="Task">Task</option>
    //           <option value="Bug">Bug</option>
    //         </select>
    //       </div>
    //       <div className={styles.fieldInfo}>
    //         <label className={styles.fieldTitle} htmlFor="summary">Summary:</label>
    //         <input type="text" id="summary" name="summary" value={ticketData.summary} onChange={handleChange} required />
    //       </div>
    //       <div className={styles.fieldInfo}>
    //         <label className={styles.fieldTitle} htmlFor="description">Description:</label>
    //         <textarea id="description" name="description" value={ticketData.description} onChange={handleChange}></textarea>
    //       </div>
    //       <div className={styles.fieldInfo}>
    //         <label className={styles.fieldTitle} htmlFor="due_date">Due Date:</label>
    //         <input type="date" id="due_date" name="due_date" value={ticketData.due_date} onChange={handleChange} />
    //       </div>          
    //       {!users.isLoading && 
    //         <div className={styles.fieldInfo}>
    //           <label className={styles.fieldTitle} htmlFor="assignee">Assignee:</label>
              // <select name="assignee" id="assignee" value={assignee} onChange={handleAssigneeChange}>
              //   <option value="">Select Assignee</option>
              //   {users.data.map((user: any) => (
              //     <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
              //   ))}
              // </select>
    //         </div>
    //       }
    //       {!users.isLoading && 
    //         <div className={styles.fieldInfo}>
    //           <label className={styles.fieldTitle} htmlFor="assignee">Reporter:</label>
              // <select name="reporter" id="reporter" value={reporter} onChange={handleReporterChange}>
              //   <option value="">Select Reporter</option>
              //   {users.data.map((user: any) => (
              //     <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
              //   ))}
              // </select>
    //         </div>
    //       }
    //     </div>
    //     <button className={styles.addButton} type="submit">Submit</button>
    //   </form>
    // </div>
    <div className={styles.main}>
      <span className={styles.title}>Add New Ticket</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <select id="type" name="type" value={ticketData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Story">Story</option>
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
          </select>
          <DateInput placeholder='Due Date' name="due_date" value={ticketData.due_date} onChange={handleChange} required={true} />
          {!users.isLoading && 
            <select name="assignee" id="assignee" value={assignee} onChange={handleAssigneeChange}>
              <option value="">Select Assignee</option>
              {users.data.map((user: any) => (
                <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
              ))}
            </select>
          }
          {!users.isLoading && 
            <select name="reporter" id="reporter" value={reporter} onChange={handleReporterChange}>
              <option value="">Select Reporter</option>
              {users.data.map((user: any) => (
                <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
              ))}
            </select>
          }  
        </div>
        <div className={`${styles.inputs} ${styles.desc}`}>
          {/* <TextInput placeholder="Summary" name="summary" value={ticketData.summary} onChange={handleChange} required={true} fullWidth="true"/> */}
          <input className={styles.textInput} type='text' placeholder="Summary" name="summary" value={ticketData.summary} onChange={handleChange} required/>
          <textarea placeholder='Description' id="description" name="description" value={ticketData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
