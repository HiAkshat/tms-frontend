interface NavUser{
  id: string,
  name: string,
  email: string,
  userType: string,
  organisation_id: string,
  isAuthenticated: boolean
}

type StateType = {
  user: NavUser
}

export type {NavUser as NavUserType, StateType}
