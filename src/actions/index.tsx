import { SET_USER } from '../constants'

export const setUser = (user: any) => {
  return { type: SET_USER, user }
}