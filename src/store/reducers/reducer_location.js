import { LOCATIONS_SET } from "../constants";

const initialState = {
  locations: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCATIONS_SET:
      return {
        ...state,
        user: action.payload
      };
    default:
      state;
  }
}
