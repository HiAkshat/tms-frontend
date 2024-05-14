type Comment = {
  _id?: string,
  organisation_name: string,
  display_name: string
}

type AddCommentType = {
  ticket: string|undefined,
  user: string,
  content: string
}

export type {Comment as CommentType, AddCommentType}
