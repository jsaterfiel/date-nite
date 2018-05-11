const Axios = require("axios");
const Config = require("../../config");
const locationSet = require("../actions").locationsSet;

// need to implement error handling here
export const getLocations = locDetails => {
  return dispatch => {
    const locationSearchUrl = `${Config.PROXY_SERVER}/api/locations/search/${
      locDetails.lng
    }/${locDetails.lat}/${locDetails.radius}/${locDetails.pricenum}`;
    Axios.get(locationSearchUrl).then(response => {
      const locations = response.data.locs;
      console.log(locations);
      dispatch(locationSet(locations));
    });
  };
};
