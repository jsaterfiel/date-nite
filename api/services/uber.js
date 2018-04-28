import Axios from 'axios'
import Validator from 'validator'

const spotifyInstance = Axios.create()

const clientId = 'e7b5f9a1562643349f56c08e079027f1'

spotifyInstance.interceptors.request.use((config) => {
  console.log(config)
  // somehow an auth header was set here? 'Authorization: Bearer oijsdfoisdofiusodifus'
  config.url = `https://api.spotify.com/v1/${config.url}`
  let token = null
  if (window.localStorage['token']) {
    token = window.localStorage['token']
  }
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

const API = {
  searchForSongs: async queryString => {
    const term = Validator.escape(queryString)
    const url = `search?q=${term}&type=track&market=US&limit=20`
    let result = null
    try {
      result = await spotifyInstance.get(url)
    } catch (e) {
      API.auth(queryString)
    }
    return result.data.tracks.items
  },

  hasAuth: () => {
    if (window.location.hash.indexOf('access_token') > -1) {
      window.location.hash.substring(1).split('&').map(tmp => {
        if (tmp.indexOf('access_token') > -1) {
          window.localStorage['token'] = tmp.split('=')[1]
          console.log(window.localStorage['token'])
        }
      })
    } else {
      API.auth('')
    }
  },

  auth: (queryString) => {
    window.localStorage['query'] = queryString
    window.location = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + clientId + '&redirect_uri=' + encodeURIComponent('http://localhost:3000/callback')
  }
}

export default API
