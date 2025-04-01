import React, { useState } from "react";
import Contato from "./Contato";

const ListaContatos = () => {
    const [contatos, setContatos] = useState([]);
    const [novoNome, setNovoNome] = useState("");
    const [novoTelefone, setNovoTelefone] = useState("");

    const adicionarContato = () => {
        if (novoNome.trim() === "" || novoTelefone.trim() === "") return;
        setContatos([...contatos, { id: Date.now(), nome: novoNome, telefone: novoTelefone }]);
        setNovoNome("");
        setNovoTelefone("");
    };

    const removerContato = (id) => {
        setContatos(contatos.filter((contato) => contato.id !== id));
    };

    return (
        <div style={{ textAlign: "left", marginTop: "0px", background: "black" }}>
            <h2>Gerar Contatos</h2>
            <input
                type="text"
                value={novoNome}
                onChange={(event) => setNovoNome(event.target.value)}
                placeholder="Nome"
            />
            <input
                type="text"
                value={novoTelefone}
                onChange={(event) => setNovoTelefone(event.target.value)}
                placeholder="Telefone"
            />
            <button onClick={adicionarContato}>Adicionar contato</button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {contatos.map((contato) => (
                    <li key={contato.id} style={{ margin: "10px 0" }}>
                        <Contato nome={contato.nome} telefone={contato.telefone} />
                        <button onClick={() => removerContato(contato.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaContatos;
