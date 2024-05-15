import { useEffect, useState } from 'react';
import styles from "./NewTicketForm.module.scss"

import { useNavigate } from 'react-router-dom';

import { DatePicker, Button, Input, SelectPicker, Uploader } from 'rsuite';
import ticketServices from '../../services/ticket/index';

import organisationUserServices from '../../services/organisationUser';
import verifyTokenServices from '../../services/verifyToken';

import Cookie from "js-cookie"

function NewTicketForm() {
  const navigate = useNavigate()

  const [users, setUsers] = useState<[UserType]>()
  const [orgId, setOrgId] = useState('')
  const ticketTypeOptions = ["Story", "Task", "Bug"]

  const [file, setFile] = useState<any>()

  const [ticketData, setTicketData] = useState<SendTicketType>({
    organisation: orgId ?? "",
    type: '',
    key: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
    due_date: new Date(),
    files: [""]
  });

  const handleSubmit = async () => {
    console.log(ticketData)

    try {
      await ticketServices.addTicket({...ticketData, organisation: orgId})
      // navigate(0)
    } catch (error) {
      return
    }
  };

  useEffect(()=>{
    try {
      verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then((res)=>{
        const org_id = res.decoded.user.organisation._id
        setOrgId(org_id)
        organisationUserServices.getOrganisationUsersByOrgId(org_id).then(res => {
          setUsers(res)
        })
      })

    } catch (error){
      return
    }
  }, [])

  return (
    <div className={styles.main}>
      <span className={styles.title}>Add New Ticket</span>
      <form onSubmit={handleSubmit} className={styles.theForm}>
        <div className={styles.inputs}>
          <SelectPicker placeholder="Type" data={ticketTypeOptions.map(ticketType => ({label: ticketType, value: ticketType}))} onChange={(val)=>{setTicketData({...ticketData, type: val ?? ""})}} value={ticketData.type}/>
          <DatePicker placeholder="Due Date" name="Due Date" value={ticketData.due_date} onChange={(val: Date|null)=>{setTicketData({...ticketData, due_date: val ?? new Date()})}} />
          {users && <SelectPicker placeholder="Assignee" data={users.map((user: UserType) => ({label: `${user.first_name}`, value: user._id}))} onChange={(val)=>{setTicketData({...ticketData, assignee: val ?? ""})}} value={ticketData.assignee}/>}
          {users && <SelectPicker placeholder="Reporter" data={users.map((user: UserType) => ({label: `${user.first_name}`, value: user._id}))} onChange={(val)=>{setTicketData({...ticketData, reporter: val ?? ""})}} value={ticketData.reporter}/>}
        </div>
        <div className={styles.inputs}>
          <Input placeholder="Summary" value={ticketData.summary} onChange={(val: string)=>setTicketData({...ticketData, summary: val})} required={true}/>
          <Input as="textarea" rows={3} placeholder="Description" value={ticketData.description} onChange={(val: string) => setTicketData({...ticketData, description: val})} />
        </div>
        {/* <div className={styles.inputs}> */}

          {/* <input type="file" onChange={(e: any)=>setFile(e.target.files[0])}/> */}
          {/* <button onClick={upload}>Upload file test</button> */}
        {/* </div> */}
      <Uploader action="http://localhost:3000/api/ticket/upload" draggable onChange={(e)=>{
        console.log(e)
        }}

        onSuccess={(res)=>{
          console.log(res)
          const newFiles = ticketData.files ?? [""]
          newFiles.push(res.filename)
          setTicketData({...ticketData, files: newFiles})
          console.log(ticketData)
        }}
      >
        <div style={{ width: 400, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Click or Drag files to this area to upload</span>
        </div>
      </Uploader>
        <div className={styles.inputs}>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default NewTicketForm;
