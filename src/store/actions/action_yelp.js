const Axios = require('axios')
const Config = require('../../config')

export const getBusinessInfo = async (info) => {
  const businessMatchUrl = `${Config.PROXY_SERVER}api/yelp/businesses/match`
  const response = await Axios.get(businessMatchUrl, {
    params: info
  })

  const businessId = response.data.businesses[0].id
  const businessByIdUrl = `${Config.PROXY_SERVER}api/yelp/businesses/${businessId}`
  const business = await Axios.get(businessByIdUrl)

  console.log(business.data)
  return business.data
}

export const getRestaurantDetails = (searchInfo) => {
  return {
    type: 'MARKER_SELECTED',
    payload: getBusinessInfo(searchInfo)
  }
}
