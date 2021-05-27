import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_EMPTY,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  //why say cartItems: [] here, what if next time the array is not empty?
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload; //this is the new item to be added to the cart
      const existItem = state.cartItems.find((x) => x.product === item.product); //check if item already exists in the cart
      if (existItem) {
        return {
          ...state,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, error: "", cartItems: [...state.cartItems, item] }; //notice, the array with everything already there, then adds one more item
      }

    case CART_REMOVE_ITEM:
      //remove item = action.payload, which contains productId, will be filtered out
      return {
        ...state,
        error: "", //NOTE: this resets the error in the CartScreen page, where this action effects the CartScreen view
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }; //REMEMBER, removing an item is actually returning everything except that item

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_EMPTY:
      return { ...state, error: "", cartItems: [] }; //NOTE: this resets the error, which effects the cart screen view

    case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

//QUESTION: what is the difference between return state, and return {...state} ?
