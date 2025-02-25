import { useState } from 'react'
import './App.css'

function Counter() {
  const [count, setCount] = useState(0)

function Counter({title, initial = 0}) {
  const [count, setCount] = useState(Number(ini))}

  return (
    <>
       <h1>{title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}


export default Counter
