import React from "react";
import ProductList from "./ProductList";

const ProductCard = ({ name, price, addToCart }) => {
  return (
    <div style={{ padding: "10px", margin: "10px" }}>
      <p><strong>Produto:</strong> {name}</p>
      <p><strong>Preço:</strong> R$ {price}</p>
      <button onClick={addToCart}>Adicionar ao Carrinho</button>
    </div>
  );
};


export default ProductCard;


