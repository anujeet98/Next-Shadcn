import React from "react";
import AddToCart from "./AddToCart";

function ProductCart() {
  return (
    <div className="p-5 bg-blue-400 hover:bg-blue-700 text-white m-3 rounded text-lg">
      <AddToCart />
    </div>
  );
}

export default ProductCart;
