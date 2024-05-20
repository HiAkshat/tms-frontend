type Comment = {
  _id?: string,
  organisation_name: string,
  display_name: string
}

type AddCommentType = {
  ticket: string|undefined,
  user_id: string,
  user_name: string,
  content: string
}

export type {Comment as CommentType, AddCommentType}
