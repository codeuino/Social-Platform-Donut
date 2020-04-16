import { SET_CURRENT_USER, RESPONSE_MSG } from "../actions/types"

const initialState = {
  isAuthenticated: false,
  user: {},
  response_msg: ""
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: Boolean(typeof action.payload === 'object' && Object.keys(action.payload).length !== 0),
        user: action.payload
      }
    }
    case RESPONSE_MSG: {
      return {
        ...state,
        response_msg: action.payload
      }
    }
    default: {
      return state
    }
  }
}