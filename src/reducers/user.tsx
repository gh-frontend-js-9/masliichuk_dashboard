import { SET_USER } from "../constants"

const user = (state = {}, action: any) => {
    switch (action.type) {
      case SET_USER:
        return action.user
      default:
        return state
    }
  }
  export default user