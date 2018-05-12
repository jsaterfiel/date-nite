import {SESSION_SET, CODE_SET, TRIPS_SET, LOCATIONS_SET, LOCATION_SEARCH, LOCATION_SET, PICKUP_ADDRESS, RESERVATION_DATE} from '../constants'
import Cookies from '../../utils/cookies'

let initialState = {
  sessionID: '',
  code: '',
  trips: [],
  tripsCancelled: false,
  locations: [],
  mapCenter: {lng: -73.985428, lat: 40.748982},
  location: null, // location object from opentable api locations call to our api
  reservationDate: 0,
  pickupAddress: null // {lng:, lat:} when set
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

    case LOCATION_SET: {
      return {
        ...state,
        location: action.location
      }
    }

    case PICKUP_ADDRESS: {
      return {
        ...state,
        pickupAddress: action.pickupAddress
      }
    }

    case RESERVATION_DATE: {
      return {
        ...state,
        reservationDate: action.reservationDate
      }
    }

    case LOCATIONS_SET: {
      return {
        ...state,
        locations: action.locations
      }
    }

    case LOCATION_SEARCH: {
      return {
        ...state,
        mapCenter: action.mapCenter,
        locations: action.locations
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
