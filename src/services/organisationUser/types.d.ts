type OrganisationUser = {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date|string,
  organisation: string,
  joining_date: Date|string
}

type VerifyOtpBody = {
  email_id: string,
  otp: string
}

export type {OrganisationUser as OrganisationUserType, VerifyOtpBody as VerifyOtpBodyType}
