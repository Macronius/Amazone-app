import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

//action.payload comes from 'productActions.js' line 42 aka, the dispatch for type PRODUCT_DETAILS_SUCCESS, which is the data from the backend
//for FAIL, the error also comes from the backend
//for USER_SIGNOUT, by having an empty object, data in 'userInfo' should be removed
