import { useState } from 'react';
import { getData } from '../../services/getData';
import { useSelector } from 'react-redux';
import styles from "./NewTicketForm.module.scss"

import { useNavigate } from 'react-router-dom';

import { DatePicker, Button, Input, SelectPicker } from 'rsuite';
import ticketServices from '../../services/ticket/index';
import { NavUserType } from '../../typings/navUser';


function NewTicketForm() {
  const navigate = useNavigate()
  const user:NavUserType = useSelector((state: any) => state.user)
  const users = getData(`http://localhost:8000/api/organisationUser/organisation/${user.organisation_id}`)
  console.log(users)
  const ticketTypeOptions = ["Story", "Task", "Bug"]

  const [ticketData, setTicketData] = useState<any>({
    organisation: user.organisation_id ?? "",
    type: '',
    key: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
    due_date: new Date(),
  });

  const handleSubmit = async () => {
    try {
      await ticketServices.addTicket(ticketData)
      navigate(0)
    } catch (error) {
      return
    }
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
