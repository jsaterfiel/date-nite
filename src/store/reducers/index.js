import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import general from './general'
import YelpInfo from './reducer_yelp'
import DateAndCount from './reducer_date'

export default combineReducers({
  router: routerReducer,
  restaurantDetails: YelpInfo,
  dateAndCount: DateAndCount,
  general
})
