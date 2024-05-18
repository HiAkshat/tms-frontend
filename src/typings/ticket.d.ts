type TicketType = {
  _id: string,
  type: string,
  key: string | undefined,
  summary: string,
  description: string,
  assignee_id: string,
  assignee_name: string,
  reporter_id: string,
  reporter_name: string,
  organisation?: OrganisationType|string,
  status: string | "To be picked" | "In progress" | "In testing" | "Completed" | undefined,
  due_date: Date,
  files?: []|undefined,
  comments: [],
  createdAt: string,
  updatedAt: string
}

type SendTicketType = {
  organisation: string,
  type: string,
  summary: string,
  description: string,
  assignee_id: string,
  assignee_name: string,
  reporter_id: string,
  reporter_name: string,
  status?: string,
  due_date: Date,
  files?: string[]
}
