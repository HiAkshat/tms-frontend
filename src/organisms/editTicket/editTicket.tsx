import styles from "./EditTicket.module.scss"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import Navbar from "../Navbar/navbar"
import SelectInput from "../../atoms/SelectInput/SelectInput"
import DateInput from "../../atoms/DateInput/DateInput"
import CustomButton from "../../atoms/CustomButton/CustomButton"
import TextInput from "../../atoms/TextInput/TextInput"
import TextAreaInput from "../../atoms/TextAreaInput/TextAreaInput"
import UploaderInput from "../../atoms/UploaderInput/UploaderInput"
import showToast from "../../atoms/Toast/Toast"

import ticketServices from "../../services/ticket"
import organisationUserServices from "../../services/organisationUser"
import helpers from "../../helpers"
import { useSelector } from "react-redux"
import { StateType } from "../../typings/navUser"


export default function EditTicket() {
  const user =  useSelector((state: StateType) => state.user)

  const [users, setUsers] = useState<[UserType]>()

  const ticketTypeOptions = ["Story", "Task", "Bug"]
  const ticketStatusOptions = ['To be picked', 'In progress', 'In testing', 'Completed']

  const [ticketType, setTicketType] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [assigneeId, setAssigneeId] = useState("")
  const [reporterId, setReporterId] = useState("")
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [files, setFiles] = useState<string[]>()

  // Old values
  const [initalTicket, setInitialTicket] = useState<TicketType>()
  const [changes, setChanges] = useState<{
    user_name: string,
    field: string,
    old_value: string,
    new_value: string,
    time: Date
  }[]>()

  const navigate = useNavigate()
  const {id} = useParams()


  useEffect(()=>{
    try {
      organisationUserServices.getOrganisationUsersByOrgId(Cookies.get("organisation")??"").then(res => setUsers(res))
      ticketServices.getTicket(id).then((ticket) => {
        setInitialTicket(ticket)


        setTicketType(ticket.type)
        setDueDate(new Date(ticket.due_date))
        setSummary(ticket.summary)
        setDescription(ticket.description)
        setAssigneeId(ticket.assignee_id)
        setReporterId(ticket.reporter_id)
        setStatus(ticket.status)
        setFiles(ticket.files)
        setChanges(ticket.edit_history)

        console.log(changes)
      })
    } catch (error){
      return
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(users && !helpers.isTextEmpty(assigneeId) && !helpers.isTextEmpty(reporterId) && !helpers.isTextEmpty(summary) && dueDate && helpers.isDateTodayOrFuture(dueDate))){
      showToast("Invalid data!")
      return
    }

    const assignee_user = users.find(user => user.unique_id == assigneeId)
    const reporter_user = users.find(user => user.unique_id == reporterId)

    try {
      let updated_ticket_data: SendTicketType = {
        organisation: Cookies.get("organisation") ?? "",
        type: ticketType,
        summary,
        description,
        status,
        assignee_id: assigneeId,
        assignee_name: `${assignee_user?.first_name} ${assignee_user?.last_name}` ?? "",
        reporter_id: reporterId,
        reporter_name: `${reporter_user?.first_name} ${reporter_user?.last_name}` ?? "",
        due_date: dueDate,
        files,
      }

      let edit_changes: {
        user_name: string,
        field: string,
        old_value: string,
        new_value: string,
        time: Date
      }[] = []

      if (initalTicket){
        for (const [key, value] of Object.entries(updated_ticket_data)){
          const old_value = initalTicket[key as keyof TicketType]

          const dont_check = ["edit_history", "assignee_id", "reporter_id"]
          if (dont_check.includes(key)) continue

          else if (value instanceof Date && typeof old_value == "string" && key=="due_date"){
            if (new Date(old_value).toDateString() == new Date(value).toDateString()) continue;

            edit_changes.push({
              user_name: user.name,
              field: key,
              old_value: new Date(old_value).toLocaleString('en-GB').split(",")[0],
              new_value: value.toLocaleString('en-GB').split(",")[0],
              time: new Date()
            })
          }

          else if (old_value && old_value!=value){
            edit_changes.push({
              user_name: user.name,
              field: key,
              old_value: old_value.toString(),
              new_value: value.toString(),
              time: new Date()
            })
          }
        }
      }

      if (changes && edit_changes.length>0){
        updated_ticket_data={
          ...updated_ticket_data,
          edit_history: [...changes, ...edit_changes]
        }
      }

      await ticketServices.editTicket(updated_ticket_data, id)
      navigate("../viewTickets")
    } catch (error) {
      return
    }
  };


  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <span className={styles.title}>Edit Ticket</span>
        <form onSubmit={handleSubmit} className={styles.theForm}>
          <div className={styles.inputs}>
            <SelectInput options={ticketTypeOptions} data={ticketType} setData={setTicketType} placeholder={"Type"} field="Type"/>
            <SelectInput options={ticketStatusOptions} data={status} setData={setStatus} placeholder={"Status"} field="Status"/>
            <DateInput date={dueDate} setDate={setDueDate} placeholder="Due Date" />
            {users && <SelectInput arr={users} value={"unique_id"} label={"first_name"} data={assigneeId} setData={setAssigneeId} placeholder={"Assignee"} field="Assignee"/>}
            {users && <SelectInput arr={users} value={"unique_id"} label={"first_name"} data={reporterId} setData={setReporterId} placeholder={"Reporter"} field="Reporter"/>}
            <CustomButton onClick={handleSubmit} text="Update ticket details" width="100%"/>
          </div>
          <div className={styles.inputs}>
            <TextInput text={summary} setText={setSummary} field="Summary" placeholder="Summary"/>
            <TextAreaInput text={description} setText={setDescription} field="Description" placeholder="Description"/>
          </div>
          <div className={styles.inputs}>
            <UploaderInput upload_link="http://localhost:3000/api/ticket/upload" files={files} setFiles={setFiles} field="Add files"/>
          </div>
        </form>
      </div>
    </div>
  )
}
