//make this a 'react functional component
import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        {" "}
        {/*NOTE: Link replaced <a> anchor-tag because <a> refreshes page every time selected, not appropriate for a single-page application*/}
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
              {/* {product.seller.name} */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
