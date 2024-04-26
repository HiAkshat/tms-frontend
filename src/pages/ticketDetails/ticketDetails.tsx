import { useParams } from "react-router-dom"

export default function TicketDetails() {
  const {id} = useParams()

  return (
    <div>
      <div>Ticket ORG001</div>
      <span>Type: Story</span>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, voluptatum perspiciatis deleniti ea accusantium corrupti hic nulla corporis tenetur eveniet impedit nobis dicta autem, non molestias ut odit aliquam mollitia.</span>
      <span>Assigned to: Akshat Gupta</span>
      <span>Reporter: Hataks Tagup</span>
      <span>Created on: 24/03/24</span>
      <span>Last updated: 26/04/24</span>
      <span>Due date: 1/05/24</span>
      <div>
        <span>Comments</span>
      </div>
    </div>
  )
}
