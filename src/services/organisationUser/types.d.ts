interface OrganisationUser {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date|string,
  organisation: string,
  joining_date: Date|string
}

export type {OrganisationUser as OrganisationUserType}
