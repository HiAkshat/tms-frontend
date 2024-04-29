import { FormEvent, useState, useEffect } from 'react';
import { getData } from '../../services/getData';
import showToast from '../../atoms/toast';

function NewTicketForm() {
  const [assignee, setAssignee] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');
  const users = getData('http://localhost:8000/api/organisationUser/organisation/662b08fd1a3985b535157a5f')


  const [ticketData, setTicketData] = useState({
    organisation: '',
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
      showToast("Error adding new ticket!")
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
          <label htmlFor="due_date">Due Date:</label>
          <input type="date" id="due_date" name="due_date" value={ticketData.due_date} onChange={handleChange} />
        </div>
        {!users.isLoading && 
          <div>
            <label htmlFor="assignee">Assignee:</label>
            <select name="assignee" id="assignee" value={assignee} onChange={(e)=>{setAssignee(e.target.value)}}>
              <option value="">Select Assignee</option>
              {users.data.map((user: any) => (
                <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
              ))}
            </select>
          </div>
        }
        {!users.isLoading && 
          <div>
            <label htmlFor="assignee">Reporter:</label>
            <select name="reporter" id="reporter" value={reporter} onChange={(e)=>{setReporter(e.target.value)}}>
              <option value="">Select Reporter</option>
              {users.data.map((user: any) => (
                <option key={user._id} value={user._id}>{`${user.first_name}`}</option>
              ))}
            </select>
          </div>
        }
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
