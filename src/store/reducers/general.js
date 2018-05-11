import {SESSION_SET, CODE_SET, TRIPS_SET} from '../constants'
import Cookies from '../../utils/cookies'

let initialState = {
  sessionID: '',
  code: '',
  trips: [],
  tripsCancelled: false
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

    case TRIPS_SET: {
      let hasCancelled = false
      for (let trip of action.trips) {
        if (trip.active === false) {
          hasCancelled = true
        }
      }
      return {
        ...state,
        tripsCancelled: hasCancelled,
        trips: action.trips
      }
    }

    default:
      return state
  }
}
