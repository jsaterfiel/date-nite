import { SESSION_SET, CODE_SET, TRIPS_SET, LOCATIONS_SET, LOCATION_SEARCH } from './constants'
import Cookies from '../utils/cookies'
import ApiService from '../services/api'
import GoogleService from '../services/google'
import { push } from 'react-router-redux'

export const sessionSet = data => {
  return dispatch => {
    if (data.sessionID === '') {
      Cookies.setCookie('session', data.sessionID, -1)
    } else {
      Cookies.setCookie('session', data.sessionID, data.expiresIn)
    }
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

export const locationSearch = term => {
  return dispatch => {
    GoogleService.geocode(term).then(result => {
      console.log(result)
      if (result) {
        ApiService.searchLocations(result.lng, result.lat, 10000, 3).then(locations => {
          dispatch({
            type: LOCATION_SEARCH,
            mapCenter: result,
            locations: locations
          })
        })
      }
    })
  }
}

export const searchLocations = (lng, lat, radius, price) => {
  return dispatch => {
    console.log('called')
    ApiService.searchLocations(lng, lat, radius, price).then(results => {
      console.log('results')
      dispatch({
        type: LOCATIONS_SET,
        locations: results
      })
    }).catch(error => {
      console.log('error', error)
    })
  }
}

export const getTrips = session => {
  return dispatch => {
    ApiService.getTrips(session)
      .then(trips => {
        dispatch({
          type: TRIPS_SET,
          trips
        })
      })
      .catch(error => {
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

export const logout = session => {
  return async dispatch => {
    try {
      await ApiService.logout(session)
      dispatch(sessionSet({ sessionID: '' }))
      console.log('hi')
      dispatch(push('/'))
    } catch (e) {
      console.log('error', e.message)
    }
  }
}
