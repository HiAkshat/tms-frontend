interface SystemUser {
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date|string,
}

interface VerifyOtpBody {
  email_id: string,
  otp: string
}

export type {SystemUser as SystemUserType, VerifyOtpBody as VerifyOtpBodyType}
