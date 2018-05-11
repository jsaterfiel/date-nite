import { SESSION_SET, CODE_SET, TRIPS_SET } from './constants'
import Cookies from '../utils/cookies'
import ApiService from '../services/api'

export const sessionSet = data => {
  return dispatch => {
    Cookies.setCookie('session', data.sessionID, data.expiresIn)
    dispatch({
      type: SESSION_SET,
      sessionID: data.sessionID
    })
  }
}

export const codeSet = code => {
  return dispatch => {
    dispatch({
      type: CODE_SET,
      code
    })
  }
}

export const getTrips = (session) => {
  return dispatch => {
    ApiService.getTrips(session).then((trips) => {
      dispatch({
        type: TRIPS_SET,
        trips
      })
    }).catch(error => {
      console.log('error', error)
    })
  }
}

export const cancelTrip = (session, id) => {
  return async dispatch => {
    try {
      await ApiService.cancelTrip(session, id)
      const trips = await ApiService.getTrips(session)
      dispatch({
        type: TRIPS_SET,
        trips
      })
    } catch (e) {
      console.log('error', e.message)
    }
  }
}
