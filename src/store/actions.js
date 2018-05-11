import { SESSION_SET, CODE_SET, LOCATIONS_SET } from "./constants";
import Cookies from "../utils/cookies";

export const sessionSet = data => {
  return dispatch => {
    Cookies.setCookie("session", data.sessionID, data.expiresIn);
    dispatch({
      type: SESSION_SET,
      sessionID: data.sessionID
    });
  };
};

export const codeSet = code => {
  return dispatch => {
    dispatch({
      type: CODE_SET,
      code
    });
  };
};

export const locationsSet = locations => {
  return dispatch => {
    dispatch({
      type: LOCATIONS_SET,
      payload: locations
    });
  };
};
