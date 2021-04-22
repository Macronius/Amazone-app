import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
// import data from './data';
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") //NOTE: initial value of cart based on local storage
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
}; //2nd store argument: preloadedState... i.e., initialState

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
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
