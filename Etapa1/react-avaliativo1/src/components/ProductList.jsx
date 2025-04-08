import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const addProduct = () => {
        if (newName.trim() === "" || newPrice.trim() === "") return;
        setProducts([...products, { id: Date.now(), name: newName, price: parseFloat(newPrice) }]);
        setNewName("");
        setNewPrice("");
    };

    const removeProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div style={{ textAlign: "left", marginTop: "0px", padding: "20px", color: "white", background: "black" }}>
            <h2>Gerenciar Produtos</h2>
            <input
                type="text"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Nome do Produto"
            />
            <input
                type="number"
                value={newPrice}
                onChange={(event) => setNewPrice(event.target.value)}
                placeholder="Preço"
            />
            <button onClick={addProduct}>Adicionar Produto</button>
            {products.length === 0 ? (
                <p>Nenhum produto na lista.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {products.map((product) => (
                        <li key={product.id} style={{ margin: "10px 0" }}>
                            <ProductCard name={product.name} price={product.price} />
                            <button onClick={() => removeProduct(product.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
