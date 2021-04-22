import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  //why say cartItems: [] here, what if next time the array is not empty?
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload; //this is the new item to be added to the cart
      const existItem = state.cartItems.find((x) => x.product === item.product); //check if item already exists in the cart
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }; //notice, the array with everything already there, then adds one more item
      }
    default:
      return state;
  }
};
