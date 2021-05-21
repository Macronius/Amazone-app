//create add-to-cart action

import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

//NOTE: dispatch and getState are functions in redux thunk that make it possible to dispatch an action and get access to the state of redux-store


//ADD TO CART
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`); //send ajax request to server to get information about this project
  dispatch({    //request the redux store to add this product to the cart
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      seller: data.seller,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


//REMOVE FROM CART
export const removeFromCart = (productId)=> async (dispatch, getState)=> {
  dispatch({type: CART_REMOVE_ITEM, payload: productId}); //NOTE: productId in this case is the product to be deleted
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //NOTE: use getState() function to access cart.cartItems in the redux store
};

//NOTE: this function returns another function that accepts dispatch from redux-thunk
export const saveShippingAddress = (data)=> (dispatch)=> {
  dispatch( {type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};


//NOTE: save payment method
export const savePaymentMethod = (data)=> (dispatch)=> {
  dispatch( {type: CART_SAVE_PAYMENT_METHOD, payload: data});
  // localStorage.setItem('paymentMethod', JSON.stringify(data));
}