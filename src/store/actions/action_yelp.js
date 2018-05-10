const Axios = require('axios')
const Config = require('../../config')

// need to implement error handling here
export const getBusinessInfo = (info) => {
  return dispatch => {
    const businessMatchUrl = `${Config.PROXY_SERVER}api/yelp/businesses/match`
    Axios.get(businessMatchUrl, {
      params: info
    })
      .then(
        response => {
          const businessId = response.data.businesses[0].id
          const businessByIdUrl = `${Config.PROXY_SERVER}api/yelp/businesses/${businessId}`
          Axios.get(businessByIdUrl)
            .then(
              business => {
                console.log(business.data)
                dispatch(setRestaurantDetails(business.data))
              }
            )
        }
      )
  }
}

export const setRestaurantDetails = (details) => {
  return {
    type: 'MARKER_SELECTED',
    payload: details
  }
}
