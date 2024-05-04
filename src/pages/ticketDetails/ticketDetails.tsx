import { useParams } from "react-router-dom"
import { getData } from "../../services/getData"
import Navbar from "../../organisms/navbar/navbar"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import showToast from "../../atoms/toast"

export default function TicketDetails() {
  const {id} = useParams()
  const ticket_details = getData(`http://localhost:8000/api/ticket/${id}`)
  const comments = getData(`http://localhost:8000/api/comment/${id}`)
  const [commentInput, setCommentInput] = useState("")
  // const [commentActionsVisible, setComment]


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

  return (
    <div className={styles.page}>
      <Navbar />
      {!ticket_details.isLoading &&
        <div className={styles.main}>
          <div className={styles.ticketDiv}>
            <span className={styles.title}>Ticket {ticket_details.data.key}</span>
            
            <div className={styles.divider}>

              <div className={styles.ticketInfo}>
                <div className={styles.rowDiv}>
                  <span>Created <span>{formattedDate(ticket_details.data.createdAt)}</span></span>
                  <span>Last updated <span>{formattedDate(ticket_details.data.updatedAt)}</span></span>
                  <span>Type <span>Story</span></span>
                </div>
                <div className={styles.colDiv}>
                  { <span>Assignee <span>{ticket_details.data.assignee ? `${ticket_details.data.assignee.first_name} ${ticket_details.data.assignee.last_name}` : "Deleted User"}</span></span>}
                  { <span>Reporter <span>{ticket_details.data.reporter ? `${ticket_details.data.reporter.first_name} ${ticket_details.data.reporter.last_name}` : "Deleted User"}</span></span>}
                </div>
                <div className={styles.colDiv}>
                  <span>Current Status <span>{ticket_details.data.status}</span></span>
                  <span>Due Date <span>{formattedDate(ticket_details.data.due_date)}</span></span>
                </div>
                <div className={styles.colDiv}>
                  <span>Description</span>
                  <p className={styles.desc}>{ticket_details.data.description}</p>
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
                      // !comments.isLoading && comments.data.length>0 ?
                      !comments.isLoading && comments.data.map((comment: any) => {
                        return (
                          <div className={styles.comment} key={comment._id}>
                            <span className={styles.user}>{comment.user.first_name}</span>
                            <span className={styles.content}>{comment.content}</span>
                            {comment.user._id === user.id && <button>Delete</button>}
                          </div>
                        )
                      })
                      // :
                      // <span>No comments yet...</span>
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
    </div>
  )
}
