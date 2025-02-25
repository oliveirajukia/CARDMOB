import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  function updateCount() {
    setCount(count+1);
  }

  const updateCount = (count) => {
    return count + 1;
  }

  const updateCount = (count) => count + 1;

  return (
    <>
    <Counter title="Contando..."/>
    <Counter title="100"/>
    </>
  )
}

export default App
