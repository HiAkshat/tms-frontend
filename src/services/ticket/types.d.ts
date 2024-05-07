// const ticketSchema = new Schema({
//   type: { type: String, enum: ['Story', 'Task', 'Bug'], required: true },
//   key: { type: String, unique: true, required: true },
//   summary: { type: String, required: true },
//   description: { type: String },
//   assignee: { type: Schema.Types.ObjectId, ref: 'OrganisationUser', required: true },
//   reporter: { type: Schema.Types.ObjectId, ref: 'OrganisationUser', required: true },
//   organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true},
//   status: { type: String, enum: ['To be picked', 'In progress', 'In testing', 'Completed'], default: 'To be picked', required: true },
//   due_date: { type: Date },
//   files: [{ type: String }],
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
// }, {timestamps: true});

interface Ticket {
  type: "Story" | "Task" | "Bug",
  key: string | undefined,
  summary: string,
  description: string,
  assignee: string,
  reporter: string,
  organisation: string,
  status: "To be picked" | "In progress" | "In testing" | "Completed" | undefined,
  due_date: Date,
  files: []|undefined,
  comments: []|undefined,
  createdAt: string,
  updatedAt: string
}

export type {Ticket as TicketType}
