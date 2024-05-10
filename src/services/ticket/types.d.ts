type Ticket = {
  type: string,
  key?: string | undefined,
  summary: string,
  description: string,
  assignee: string,
  reporter: string,
  organisation?: string,
  status: string | "To be picked" | "In progress" | "In testing" | "Completed" | undefined,
  due_date: Date|string,
  files?: []|undefined,
  comments?: []|undefined,
  createdAt?: string,
  updatedAt?: string
}

export type {Ticket as TicketType}
