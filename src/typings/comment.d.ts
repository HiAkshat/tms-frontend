type CommentType = {
  _id: string,
  ticket: TicketType,
  user: UserType,
  content: string,
  createdAt?: Date,
  updatedAt?: Date
}
