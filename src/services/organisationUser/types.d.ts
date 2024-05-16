type SendOrganisationUserType = {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: string,
  joining_date: Date,
}

type OrganisationUser = {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: OrganisationType,
  joining_date: Date,
  is_active?: boolean
}

type VerifyOtpBody = {
  email_id: string,
  otp: string
}

export type {OrganisationUser as OrganisationUserType, VerifyOtpBody as VerifyOtpBodyType, SendOrganisationUserType}
