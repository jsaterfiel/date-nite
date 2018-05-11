import load from 'little-loader'
import qs from 'query-string'

const GOOGLE_MAP_PLACES_API = 'https://maps.googleapis.com/maps/api/js'
const NOT_LOADED = 0
const LOADING = 1
const LOADED = 2

const queue = []
let state = NOT_LOADED
let googleMaps = null
let error = null

function loadGoogleMapsSdk (params, callback) {
  if (window !== undefined) {
    window.gm_authFailure = () => {
      const response = {googleMaps, error: 'SDK Authentication Error'}
      callback(response)
    }
    window.google = undefined
    if (state === LOADED) {
      const response = {googleMaps, error: 'LOADED'}
      callback(response)
    } else if (state === LOADING) {
      queue.push(callback)
    } else {
      state = LOADING
      queue.push(callback)

      load(`${GOOGLE_MAP_PLACES_API}?${qs.stringify(params)}`, err => {
        state = LOADED
        error = err ? 'Network Error' : null
        googleMaps = window.google ? window.google.maps : null

        while (queue.length > 0) {
          queue.pop()({googleMaps, error})
        }
      })
    }
  }
}

export default loadGoogleMapsSdk
