import { FormEvent, useState, useEffect } from 'react';
import { getData } from '../../services/getData';
import showToast from '../../atoms/Toast/Toast';
import { useSelector } from 'react-redux';
import styles from "./NewTicketForm.module.scss"

import DateInput from '../../atoms/DateInput/DateInput';

import { DatePicker, Button, Input, SelectPicker } from 'rsuite';


function NewTicketForm() {
  const [assignee, setAssignee] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');
  const user = useSelector((state: any) => state.user)
  const users = getData(`http://localhost:8000/api/organisationUser/organisation/${user.organisation_id}`)

  const ticketTypeOptions = ["Story", "Task", "Bug"]

  const [ticketData, setTicketData] = useState({
    organisation: user.organisation_id,
    type: '',
    key: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
    due_date: new Date(),
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

  const handleSubmit = async () => {
    // e.preventDefault();
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
    <div className={styles.main}>
      <span className={styles.title}>Add New Ticket</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <SelectPicker placeholder="Type" data={ticketTypeOptions.map(ticketType => ({label: ticketType, value: ticketType}))} onChange={(val: any)=>{setTicketData({...ticketData, type: val})}} value={ticketData.type}/>
          <DatePicker placeholder="Due Date" name="Due Date" value={ticketData.due_date} onChange={(val: Date|null)=>{setTicketData({...ticketData, due_date: val ?? new Date()})}} />
          {!users.isLoading && <SelectPicker placeholder="Assignee" data={users.data.map((user: any) => ({label: `${user.first_name}`, value: user._id}))} onChange={(val: any)=>{setTicketData({...ticketData, assignee: val})}} value={ticketData.assignee}/>}
          {!users.isLoading && <SelectPicker placeholder="Reporter" data={users.data.map((user: any) => ({label: `${user.first_name}`, value: user._id}))} onChange={(val: any)=>{setTicketData({...ticketData, reporter: val})}} value={ticketData.reporter}/>}
        </div>  
        <div className={styles.inputs}>
          <Input placeholder="Summary" value={ticketData.summary} onChange={(val: string)=>setTicketData({...ticketData, summary: val})} required={true}/>
          <Input as="textarea" rows={3} placeholder="Description" value={ticketData.description} onChange={(val: string) => setTicketData({...ticketData, description: val})} />
        </div>
        <div className={styles.inputs}>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default NewTicketForm;
