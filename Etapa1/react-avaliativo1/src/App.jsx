import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductList from "./components/ProductList";


function App() {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ProductList />
    </div>
  );
}


export default App;