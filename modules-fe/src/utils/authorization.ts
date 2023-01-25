import jwtDecode, {JwtPayload} from 'jwt-decode'

export const getTokenValidity = (token: string) => {
  if (token) {
    const {exp} = jwtDecode<JwtPayload>(token)
    const now = new Date().getTime() / 1000
    return !!exp && exp > now
  }
  return false
}
