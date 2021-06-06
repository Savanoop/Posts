import { LoginTypes } from "../const/ActionTypes";
import { login } from '../helper/data'

export const getLoginCredential = () => {
  return dispatch => {
    dispatch({
      type: LoginTypes.GET_LOGIN_LOADING
    });
    dispatch({
      type: LoginTypes.GET_LOGIN_SUCCESS,
      payload: login
    });
  };
};