import { SESSION_SET, CODE_SET, TRIPS_SET, LOCATIONS_SET, LOCATION_SEARCH, LOCATION_SET, CLEAR_CREATE_DATE, PICKUP_ADDRESS, TRIP_ESTIMATE } from './constants'
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

export const locationSet = location => {
  return dispatch => {
    dispatch({
      type: LOCATION_SET,
      location
    })
  }
}

export const pickupAddress = pickupAddress => {
  return dispatch => {
    dispatch({
      type: PICKUP_ADDRESS,
      pickupAddress
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
      dispatch(push('/'))
    } catch (e) {
      console.log('error', e.message)
    }
  }
}

export const estimateTrip = (session, address, location) => {
  return async dispatch => {
    try {
      const addr = await GoogleService.geocode(address)
      const duration = await ApiService.getDuration(addr.lng, addr.lat, location.location.coordinates[0], location.location.coordinates[1])
      const result = await ApiService.estimateTrip(session, addr.lng, addr.lat, location._id)
      result.totalTime = duration.value + result.pickupTime + 250 // trip time + uber pick up time + 5 min padding
      dispatch({
        type: TRIP_ESTIMATE,
        estimatedTrip: result,
        addressLocation: addr
      })
    } catch (e) {
      console.log('error', e)
    }
  }
}

export const clearCreateDate = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_CREATE_DATE
    })
  }
}

export const saveDate = (session, locID, pickupAddress, dateTime, people) => {
  return async dispatch => {
    try {
      console.log('address', pickupAddress)
      await ApiService.saveTrip(session, locID, pickupAddress.lng, pickupAddress.lat, dateTime, people)
    } catch (e) {
      console.log('error', e)
    }
  }
}
