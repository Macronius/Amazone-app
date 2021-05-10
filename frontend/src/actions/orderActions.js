import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from "../constants/orderConstants";

//accept order as a parameter, save order in database, and return an async functiont htat accepts dispatch and getState and returns the function, where dispatch and getState will be filled? by redux-thunk
export const createOrder = (order) => async (dispatch, getState) => {
  //create a constant to use first

  //dispatch order create request because sending an AJAX request
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    //send an ajax request
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: { Authorization: `Bearer ${userInfo.token}` }, //token comes from signin process of user
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY }); //apparently a dispatch does not require a payload
    localStorage.removeItem("cartItems"); //clean the local storage
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();

  //send ajax request
  try {
    const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }); // .put() because calling the pay api and that type of api is 'put'
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};
