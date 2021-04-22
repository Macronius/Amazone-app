//create add-to-cart action

import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

//NOTE: dispatch and getState are functions in redux thunk that make it possible to dispatch an action and get access to the state of redux-store
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  //send ajax request to server to get information about this project
  const { data } = await Axios.get(`/api/products/${productId}`);

  //request the redux store to add this product to the cart
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
