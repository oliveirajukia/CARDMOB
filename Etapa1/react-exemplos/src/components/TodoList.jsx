import React, { use, useState } from "react";

const TodoList = ({ name }) => {
    const [todos, setTodo] = useState([]);
    const [task, setTask] = useState ("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

const addTodo = () => {
    if (task.trim() === "") return;
    setTodo([...todos, {id: Date.now, text: task}]);
    setTask("");
}

    const startEditing = (id, text) => {
        setEditingId (id);
        setEditingText(text);
    }

    // Update
    const saveEdit = () => {
        setTodo(
            todos.map((todo) => 
                todo.id == editingId ? {...todo, text: editingText} : todo
            )
        );

       const cancelEditing = () => {
        setEditingId(null);
        setEditingText("");
    }
    }
    
    // Delete
    const deleteTodo = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id));
    }
    return (
        <div style={{ textAlign: "center", margintTop: "50px" }}>
            <h2>A fazer: {name}</h2>
            <input
             type="text"
             value={task}
             onChange={(event) => setTask(event.target.value) }
             placeholder="Escreva sua tarefa..."
            />
            <button onClick={addTodo}>Incluir tarefa</button>
            <url style={{ listStyle: "none", padding:0 }}>
                {todos.map((todo) =>(
                
                    <li key={todo.id} style={{margin: "10px 0"}}>
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(event) => setEditingText(event.target.value)}
                                />
                                <button onClick={saveEdit}>Salvar</button>
                                <a href="#" onClick={cancelEditing}>Cancelar</a>
                            </>
                        ) : (
                            <>
                                {todo.text}
                                <button onClick={() => startEditing(todo.id, todo.text)}>Editar</button>
                                <button onClick={() => startEditing(todo.id, todo.text)}>Excluir</button>

                            </>


                        ) }
                    </li>
    ))
                }

            </url>
        </div>
    );

}

export default TodoList;

