interface OrganisationUser {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: string,
  joining_date: Date
}

export type {OrganisationUser as OrganisationUserType}
