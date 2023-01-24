export type Login = {
  username: string
  password: string
}

export type AuthorizationToken = {
  accessToken: string
  refreshToken: string
}

export type AuthorizationResponse = {
  access: string
  refresh: string | undefined
}
