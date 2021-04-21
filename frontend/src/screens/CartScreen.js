import React from 'react'

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1]) //if this value exists, then split on the = sign and take second value
    : 1;    //if props.location.search does not exist, then default value is 1
  //note: from product screen, this is the qty={qty} in addToCartHandler function
  //note: the variable 'props.location.search' returns the value after ? in props.history.push(`/cart/${productId}?qty={qty}`); from ProductScreen.js

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART: ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
