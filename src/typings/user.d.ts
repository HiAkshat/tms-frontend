type UserType = {
  _id: string
  email_id: string,
  first_name: string,
  last_name: string,
  dob: Date,
  organisation: OrganisationType|string,
  joining_date: Date,
  otp?: number,
  otpExpiration?: Date
}

type SendUserType = {
  email_id: string;
  first_name: string;
  last_name: string;
  dob?: Date;
  organisation: string;
  joining_date?: Date;
}
