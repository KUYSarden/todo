import { useEffect, useState } from 'react'
import './App.css'

function App() {
 
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) 
    return []

    return JSON.parse(localValue)
  })


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])


  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title: newItem, completed: false },
        
      ]
    })
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos (currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return{
            ...todo, completed
          }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  console.log(todos)

  
  return (
    <>
    <h1>TO DO</h1>
    <form onSubmit={handleSubmit}>
   
      <input placeholder='Add an Item ...' type="text" value={newItem} onChange={e => setNewItem(e.target.value)} id='todo' />
      <button onClick={() => setNewItem}>ADD</button>
      </form>


      <h2>List</h2>

      <ul>
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo( todo.id, e.target.checked)} />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          )        
        })}
       
       
        </ul> 
        
    </>
  )
}

export default App
