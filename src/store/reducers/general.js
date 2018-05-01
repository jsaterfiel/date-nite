import {SESSION_SET, CODE_SET} from '../constants'
import Cookies from '../../utils/cookies'

let initialState = {
  sessionID: '',
  code: ''
}

const cookieSessionID = Cookies.getCookie('session')

if (cookieSessionID !== '') {
  console.log('cookie found and using for initial state:' + cookieSessionID)
  initialState.sessionID = cookieSessionID
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_SET: {
      return {
        ...state,
        sessionID: action.sessionID
      }
    }

    case CODE_SET: {
      return {
        ...state,
        code: action.code
      }
    }

    default:
      return state
  }
}
