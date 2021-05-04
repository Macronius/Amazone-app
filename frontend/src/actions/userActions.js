import Axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,

  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,

  USER_SIGNOUT,
} from "../constants/userConstants";




export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });  //question: why is 'name' excluded?

  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data }); //NOTE: app.js uses USER_SIGNIN_SUCCESS to authenticate user
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





//define signin action-function to be used by the submitHandler function on the SigninScreen.js
export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





//define signout action-function to be used by the signoutHandler function on the App.js 
export const signout = ()=> (dispatch)=> {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_SIGNOUT });
}

//NOTE: try{}
//Axios.post() not .get() because for security
//by the second line, user and password should be correct and 'data' should contain user information and token
//payload is important because will be used in signin screen
//user payload saved in local storage to keep user data incase close browser and reopen.
//QUESTION: why does data need to be JSON.stringify(data)?

//NOTE: catch(error){}
//check if response exists and message exists, then return specific message, otherwise return general error message
