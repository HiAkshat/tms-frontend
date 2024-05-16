type OtpDataType= {
  accessToken: string,
  valid: boolean,
  message: string
}

type VerifyUserDataType = {
  decoded: {
    exp: number,
    iat: number
    user: UserType,
  },
  valid: boolean
}
