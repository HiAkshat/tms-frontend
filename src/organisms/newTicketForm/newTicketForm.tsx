import { FormEvent, useState, useEffect } from 'react';
import { Notification, toaster } from 'rsuite';


interface User {
  _id: string;
  email: string;
}

function NewTicketForm() {
  const [assignee, setAssignee] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/organisationUser');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
    console.log(users)
  }, []);

  const [ticketData, setTicketData] = useState({
    type: '',
    key: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
    status: 'TOBEPICKED',
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/ticket", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData)
    })
    console.log(res)

    if (!res.ok){
      console.log("NOO")
      toaster.push(<Notification>Error adding organisation!</Notification>, {
        placement: 'bottomEnd'
      });
      return
    }
    console.log('Submitted data:', ticketData);
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={ticketData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Story">Story</option>
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
          </select>
        </div>
        <div>
          <label htmlFor="key">Key:</label>
          <input type="text" id="key" name="key" value={ticketData.key} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="summary">Summary:</label>
          <input type="text" id="summary" name="summary" value={ticketData.summary} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={ticketData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="assignee">Assignee:</label>
          <input type="text" id="assignee" name="assignee" value={ticketData.assignee} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="reporter">Reporter:</label>
          <input type="text" id="reporter" name="reporter" value={ticketData.reporter} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="due_date">Due Date:</label>
          <input type="date" id="due_date" name="due_date" value={ticketData.due_date} onChange={handleChange} />
        </div>
        {/* <select name="assignee" id="assignee" value={assignee} onChange={handleSelectChange}>
          <option value="">Select an organisation</option>
          {organisations.map((org) => (
            <option key={org._id} value={org._id}>{org.organisation_name}</option>
          ))}
        </select> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
