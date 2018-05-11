import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import general from "./general";
import YelpInfo from "./reducer_yelp";
import DateAndCount from "./reducer_date";
import reducer_location from "./reducer_location";

export default combineReducers({
  router: routerReducer,
  restaurantDetails: YelpInfo,
  dateAndCount: DateAndCount,
  general,
  getLoc: reducer_location
});
