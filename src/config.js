/**
 * all urls must end in a slash if they need to be concatenated and no question marks should be on these urls.
 * This will ensure consistency in how we are using urls from the configs.
 * Ensure that only sandbox urls are used when payment or alerting of user content occurs like in uber's case.
 */
const Config = {
  UberClientID: 'cYflhnlrqm26Jtq9qVadHRjaYBSASSIO',
  ApiURL: 'http://localhost:3000/'
}

const YelpConfig = {
  API_KEY: '3XbLY2tE_c1P2NUxopNYIasa3UJH_ovhNltfZS-jMZRClLHldvhNguZ5ZNq91Nff7CG9mocg_g3crecD7AB2ZSR1Ma5RKb_BV5mo8j3G1ukW1oLfKjyyud-lAenoWnYx',
  API_URL: 'https://api.yelp.com/v3/'
}

const PORT = 3000

const PROXY_SERVER = `http://localhost:${PORT}/`

module.exports = {
  Config: Config,
  YelpConfig: YelpConfig,
  PORT: PORT,
  PROXY_SERVER: PROXY_SERVER
}
