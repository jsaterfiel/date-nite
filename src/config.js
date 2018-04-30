/**
 * all urls must end in a slash if they need to be concatenated and no question marks should be on these urls.
 * This will ensure consistency in how we are using urls from the configs.
 * Ensure that only sandbox urls are used when payment or alerting of user content occurs like in uber's case.
 */
const Config = {
  UberClientID: 'cYflhnlrqm26Jtq9qVadHRjaYBSASSIO',
  ApiURL: 'http://localhost:3000/'
}

export default Config
