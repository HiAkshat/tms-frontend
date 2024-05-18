import { useEffect, useState } from 'react';
import styles from "./NewTicketForm.module.scss"

import ticketServices from '../../services/ticket/index';

import organisationUserServices from '../../services/organisationUser';
import verifyTokenServices from '../../services/verifyToken';

import Cookie from "js-cookie"

import SelectInput from '../../atoms/SelectInput/SelectInput';
import DateInput from '../../atoms/DateInput/DateInput';
import TextInput from '../../atoms/TextInput/TextInput';
import TextAreaInput from '../../atoms/TextAreaInput/TextAreaInput';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import helpers from '../../helpers';
import showToast from '../../atoms/Toast/Toast';
import UploaderInput from '../../atoms/UploaderInput/UploaderInput';

function NewTicketForm() {
  const [users, setUsers] = useState<[UserType]>()
  const ticketTypeOptions = ["Story", "Task", "Bug"]

  const [ticketType, setTicketType] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [assigneeId, setAssigneeId] = useState("")
  const [reporterId, setReporterId] = useState("")
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<string[]>()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    console.log(!helpers.isTextEmpty(assigneeId) , !helpers.isTextEmpty(reporterId) , !helpers.isTextEmpty(summary) , dueDate &&  helpers.isDateTodayOrFuture(dueDate))
    if (!(users && !helpers.isTextEmpty(assigneeId) && !helpers.isTextEmpty(reporterId) && !helpers.isTextEmpty(summary) && dueDate && helpers.isDateTodayOrFuture(dueDate))){
      showToast("Invalid data!")
      return
    }

    const assignee_user = users.find(user => user.unique_id == assigneeId)
    const reporter_user = users.find(user => user.unique_id == reporterId)

    try {
      const data: SendTicketType = {
        organisation: Cookie.get("organisation") ?? "",
        type: ticketType,
        summary,
        description,
        assignee_id: assigneeId,
        assignee_name: `${assignee_user?.first_name} ${assignee_user?.last_name}` ?? "",
        reporter_id: reporterId,
        reporter_name: `${reporter_user?.first_name} ${reporter_user?.last_name}` ?? "",
        due_date: dueDate,
        files
      }

      await ticketServices.addTicket(data)
    } catch (error) {
      return
    }
  };

  useEffect(()=>{
    try {
      verifyTokenServices.verifyToken(Cookie.get("accessToken") ?? "").then(()=>{
        organisationUserServices.getOrganisationUsersByOrgId(Cookie.get("organisation")??"").then(res => {
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
          <SelectInput options={ticketTypeOptions} data={ticketType} setData={setTicketType} placeholder={"Type"}/>
          <DateInput date={dueDate} setDate={setDueDate} placeholder="Due Date" />
          {users && <SelectInput arr={users} value={"unique_id"} label={"first_name"} data={assigneeId} setData={setAssigneeId} placeholder={"Assignee"}/>}
          {users && <SelectInput arr={users} value={"unique_id"} label={"first_name"} data={reporterId} setData={setReporterId} placeholder={"Reporter"}/>}
          <CustomButton onClick={handleSubmit} text="Add Ticket" width="100%"/>
        </div>
        <div className={styles.inputs}>
          <TextInput text={summary} setText={setSummary} field="Summary" placeholder="Summary"/>
          <TextAreaInput text={description} setText={setDescription} field="Description" placeholder="Description"/>
        </div>
        <div className={styles.inputs}>
          <UploaderInput upload_link="http://localhost:3000/api/ticket/upload" files={files} setFiles={setFiles} />
        </div>
      </form>
    </div>
  );
}

export default NewTicketForm;
