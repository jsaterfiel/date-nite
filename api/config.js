/**
 * all urls must end in a slash if they need to be concatenated and no question marks should be on these urls.
 * This will ensure consistency in how we are using urls from the configs.
 * Ensure that only sandbox urls are used when payment or alerting of user content occurs like in uber's case.
 */
const Config = {
  UberEndPoint: 'https://sandbox-api.uber.com/v1.2/',
  UberAuthEndPoint: 'https://login.uber.com/oauth/v2/token',
  UberClientID: 'cYflhnlrqm26Jtq9qVadHRjaYBSASSIO',
  UberClientSecret: 'HKY3kxR_THYwEdYIdPnHqlK4rPPxrMy29JF0qVsQ',
  UberServerToken: 'c5ftRpqmpjOTJ-J-wTTClfIC1urkGomfwTqg0xNL',
  GoogleMapsApiKey: 'AIzaSyAfXk1SUFJoDSe6I2edIAYku1RG1nHaDDQ',
  YelpEndPointBusiness: 'https://api.yelp.com/v3/businesses/',
  YelpClientID: 'g_HgTD0WnjJLMtoeKsYnQA',
  YelpAPIKey: 'UjSQOTjPfi5olmGtIOrp4u97R_MuPgc--R_rKeZahyxgvtJ4Xb8nGIUpzXOByuMgG5A2vboYz83M8MXEamZ3h3Y5Cod_SPiOnYjtPPaijOmUWj96vhGjNF-NJ0bXWnYx',
  YelpConfig: {
    API_KEY: '3XbLY2tE_c1P2NUxopNYIasa3UJH_ovhNltfZS-jMZRClLHldvhNguZ5ZNq91Nff7CG9mocg_g3crecD7AB2ZSR1Ma5RKb_BV5mo8j3G1ukW1oLfKjyyud-lAenoWnYx',
    API_URL: 'https://api.yelp.com/v3/'
  }
}

module.exports = Config
