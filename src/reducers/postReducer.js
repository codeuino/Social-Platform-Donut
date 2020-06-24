import { GET_ALL_POSTS } from '../actions/types'
const initialState = {
  allPosts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_POSTS: {
      return {
        ...state,
        allPosts: action.payload
      }
    }
    default:{
      return state
    }
  }
}