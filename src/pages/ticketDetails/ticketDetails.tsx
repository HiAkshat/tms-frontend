import { useParams } from "react-router-dom"
import { getData } from "../../services/getData"
import Navbar from "../../organisms/Navbar/navbar"
import styles from "./TicketDetails.module.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import showToast from "../../atoms/Toast/Toast"
import ticketServices from "../../services/ticket/index"

export default function TicketDetails() {
  const {id} = useParams()
  const [ticket, setTicket] = useState<any>()

  useEffect(()=>{
    try {
      ticketServices.getTicket(id).then(data => setTicket(data))
      console.log(ticket)
    } catch (error) {
      return
    }
  }, [])

  const comments = getData(`http://localhost:8000/api/comment/${id}`)
  const [commentInput, setCommentInput] = useState("")

  const [showActions, setShowActions] = useState(false)

  const user = useSelector((state: any) => state.user)

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

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault()

    const body = {
      ticket: id,
      user: user.id,
      content: commentInput

    }

    const res = await fetch("http://127.0.0.1:8000/api/comment", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    console.log(res)
    if (!res.ok){
      showToast("Error adding comment!")
      return
    }

    showToast("Comment added successfully!")
    setCommentInput("")
  }

  const handleCommentDelete = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/comment/${showActions}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })

      showToast("Comment successfully deleted!")
    } catch (error) {
      showToast("Error deleting comment!")
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
                    { <span>Assignee <span>{ticket.assignee ? `${ticket.assignee.first_name} ${ticket.assignee.last_name}` : "Deleted User"}</span></span>}
                    { <span>Reporter <span>{ticket.reporter ? `${ticket.reporter.first_name} ${ticket.reporter.last_name}` : "Deleted User"}</span></span>}
                  </div>
                  <div className={styles.colDiv}>
                    <span>Current Status <span>{ticket.status}</span></span>
                    <span>Due Date <span>{formattedDate(ticket.due_date)}</span></span>
                  </div>
                  <div className={styles.colDiv}>
                    <span>Description</span>
                    <p className={styles.desc}>{ticket.description}</p>
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
                        !comments.isLoading && comments.data.map((comment: any) => {
                          return (
                            <div  onMouseEnter={()=>setShowActions(comment._id)} onMouseLeave={()=>setShowActions(false)} className={styles.comment} key={comment._id}>
                              <div className={styles.commentContent}>
                                <span className={styles.user}>{comment.user.first_name}</span>
                                <span className={styles.content}>{comment.content}</span>
                              </div>
                              <div>
                                {comment.user._id === user.id && comment._id==showActions && <button onClick={handleCommentDelete}>Delete</button>}
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
