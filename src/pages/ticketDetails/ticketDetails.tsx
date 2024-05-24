import { useParams } from "react-router-dom"
import Navbar from "../../organisms/Navbar/navbar"
import styles from "./TicketDetails.module.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ticketServices from "../../services/ticket/index"
import { StateType } from "../../typings/navUser"
import commentServices from "../../services/comment"
import organisationUserServices from "../../services/organisationUser"
import { TicketType } from "../../typings/ticket"

export default function TicketDetails() {
  const {id} = useParams()
  const [ticket, setTicket] = useState<TicketType>()

  const [assigneeName, setAssigneeName] = useState("")
  const [reporterName, setReporterName] = useState("")

  useEffect(()=>{
    try {
      organisationUserServices.getOrganisationUsers().then(res => {
        ticketServices.getTicket(id).then(data => {
          const assignee_user = res.data?.find((user: UserType) => user.unique_id == ticket?.assignee_id)
          const reporter_user = res.data?.find((user: UserType) => user.unique_id == ticket?.reporter_name)

          setAssigneeName(assignee_user ? `${assignee_user?.first_name} ${assignee_user?.last_name}` : "Deleted User")
          setReporterName(reporter_user ? `${reporter_user?.first_name} ${reporter_user?.last_name}` : "Deleted User")
          setTicket(data)
        })
      })

      commentServices.getComments(id).then(data => setComments(data))
    } catch (error) {
      return
    }

  }, [])


  const [comments, setComments] = useState<[Comment]>()
  const [commentInput, setCommentInput] = useState("")
  const [commentsLoading, setCommentsLoading] = useState(false)

  const [showActions, setShowActions] = useState<string>()

  const user = useSelector((state: StateType) => state.user)

  useEffect(()=>{
    commentServices.getComments(id).then(data => setComments(data))
    setCommentsLoading(false)
  }, [commentsLoading])


  function formattedDate(dateString: string) {
    const date = new Date(dateString);

    // Extract date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Format as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const handleCommentSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const body = {
      ticket: id,
      user_id: user.id,
      user_name: user.name,
      content: commentInput
    }
    console.log(body)

    try {
      setCommentsLoading(true)
      await commentServices.addComment(body)
      setCommentInput("")
    } catch (error) {
      return
    }
  }

  const handleCommentDelete = async () => {
    try {
      setCommentsLoading(true)
      await commentServices.deleteComment(showActions)
    } catch (error) {
      return
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />
        <div className={styles.main}>
          {ticket!=undefined &&
            <div className={styles.ticketDiv}>
              <span className={styles.title}>Ticket {ticket.key}</span>

              <div className={styles.divider}>

                <div className={styles.ticketInfo}>
                  <div className={styles.rowDiv}>
                    <span>Created <span>{formattedDate(ticket.createdAt)}</span></span>
                    <span>Last updated <span>{formattedDate(ticket.updatedAt)}</span></span>
                    <span>Type <span>Story</span></span>
                  </div>
                  <div className={styles.colDiv}>
                    { <span>Assignee <span>{assigneeName}</span></span>}
                    { <span>Reporter <span>{reporterName}</span></span>}
                  </div>
                  <div className={styles.colDiv}>
                    <span>Current Status <span>{ticket.status}</span></span>
                    <span>Due Date <span>{formattedDate(ticket.due_date.toString())}</span></span>
                  </div>
                  <div className={styles.colDiv}>
                    <span>Summary</span>
                    <p className={styles.desc}>{ticket.summary}</p>
                  </div>
                  <div className={styles.colDiv}>
                    <span>Description</span>
                    <p className={styles.desc}>{ticket.description}</p>
                  </div>
                  <div className={styles.colDiv}>
                    <span>Files</span>
                    {ticket.files && ticket.files.length>0 ? ticket.files.map((file: string) => {
                      if (file!=""){
                        return (
                        <div className={styles.fileDownload} onClick={async ()=>{
                          console.log("TRYING..")
                          await ticketServices.downloadFile(file)
                        }}>
                          <img src="/attach-128.png" alt="" />
                          <p className={styles.filename}>{file}</p>
                        </div>
                      )
                      }
                    })
                    :
                    <p>No files attached</p>
                  }
                  </div>
                  <div className={styles.colDiv}>
                    <span>Edit history</span>
                    <div className={styles.editDetails}>
                      {ticket.edit_history && ticket.edit_history.length>0 ? ticket.edit_history.reverse().map((edit_details: {    user_name: string,
                        field: string,
                        old_value: string,
                        new_value: string,
                        time: Date}, index: number) => {
                        return (
                          <p key={index} className={styles.editDetail}><span>{edit_details.user_name}</span> changed field <span>{edit_details.field}</span> from <span>{edit_details.old_value}</span> to <span>{edit_details.new_value}</span> on <span>{new Date(edit_details.time).toLocaleString("en-GB")}</span></p>
                        )
                      }):
                      <p>No edits made yet</p>
                      }
                    </div>
                  </div>
                </div>

                <div className={styles.commentsDiv}>
                  <span className={styles.heading}>Comments</span>
                  <div className={styles.commentSectionWithForm}>
                    <form onSubmit={handleCommentSubmit} action="">
                      <input placeholder="Add new comment" onChange={(e)=>{setCommentInput(e.target.value)}} value={commentInput} type="text" />
                      <button onClick={handleCommentSubmit}>Add</button>
                    </form>
                    <div className={styles.commentSection}>
                      {
                        comments && comments.map((comment: any) => {
                          return (
                            <div  onMouseEnter={()=>setShowActions(comment._id)} onMouseLeave={()=>setShowActions("")} className={styles.comment} key={comment._id}>
                              <div className={styles.commentContent}>
                                <span className={styles.user}>{comment.user_name}</span>
                                <span className={styles.content}>{comment.content}</span>
                              </div>
                              <div>
                                {comment.user_id === user.id && comment._id==showActions && <button onClick={handleCommentDelete}>Delete</button>}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    </div>
  )
}
