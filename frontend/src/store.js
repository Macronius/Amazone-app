import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";

import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems") //NOTE: initial value of cart based on local storage
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress") //NOTE: initial state of shippingAddress instead of ''
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal", // <--default value
  },
}; //2nd store argument: preloadedState... i.e., initialState

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});
//1st store argument: static reducer from the frontend
// const reducer = (state, action)=> {
//     return {products: data.products};
// };

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//now create the store that will hold the complete state tree of the app
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

//simply returns a list of products in the data.js
//    QUESTION: what does this mean?

//QUESTION:
//QUESTION: composeEnhancer..???
//QUESTION: is 'thunk' a blanket statement or package?
//QUESTION: middleware that is not thunk considered custom, and not custom middleware considered thunk?
