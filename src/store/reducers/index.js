import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import general from './general'
import YelpInfo from './reducer_yelp'

export default combineReducers({
  router: routerReducer,
  restaurantDetails: YelpInfo,
  general
})
