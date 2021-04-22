import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1]) //if this value exists, then split on the = sign and take second value
    : 1; //if props.location.search does not exist, then default value is 1
  //note: from product screen, this is the qty={qty} in addToCartHandler function
  //note: the variable 'props.location.search' returns the value after ? in props.history.push(`/cart/${productId}?qty={qty}`); from ProductScreen.js

  //todo: check if productId exists, call addToCart action to add this product to the cart; because do only once, use useEffect
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  //NOTE: it is customary, when use a variable in the useEffect, to then add that variable to its dependency array

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART: ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
