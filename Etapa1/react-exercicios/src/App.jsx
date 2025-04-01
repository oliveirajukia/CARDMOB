import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ListaContatos from './components/ListaContatos';
import Contato from './components/Contato';

function App() {


  return (
    
      <div>
       <h1>Contatos</h1>
       <ListaContatos/>
    </div>
  )

}
export default App
