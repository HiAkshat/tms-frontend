export type TicketType = {
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
  updatedAt: string,
  edit_history?: {
    user_name: string,
    field: string,
    old_value: string,
    new_value: string,
    time: Date
  }[]
}

export type SendTicketType = {
  organisation: string,
  type: string,
  summary: string,
  description: string,
  assignee_id: string,
  reporter_id: string,
  status?: string,
  due_date: Date,
  files?: string[],
  edit_history?: {
    user_name: string,
    field: string,
    old_value: string,
    new_value: string,
    time: Date
  }[]
}

export type TicketFilterType = {
  type?: string,
  status?: string,
  start_due_date?: string,
  end_due_date?: string,
  assignee_id?: string,
  reporter_id?: string,
}
