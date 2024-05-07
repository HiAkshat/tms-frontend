interface NavUser{
  id: string,
  name: string,
  email: string,
  userType: string,
  organisation_id: string,
  isAuthenticated: boolean
}

export type {NavUser as NavUserType}
