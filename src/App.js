import React ,{useState} from 'react'
import './App.css'


function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  function handleInputChange(event) {
    setTodoText(event.target.value);
  }

  function handleAddTodo() {
    setTodos([...todos, { id: Date.now(), text: todoText, completed: false }]);
    setTodoText('');
  }

  function handleKeyDown(event) {
    if (event.code === 'Enter') {
      handleAddTodo();
    }
  }

  function handleEdit(id) {
    const todo = todos.find(todo => todo.id === id);
    setEditTodoId(id);
    setEditTodoText(todo.text);
    setEditMode(true);
  }

  function handleEditInputChange(event) {
    setEditTodoText(event.target.value);
  }

  function handleSaveEdit() {
    setTodos(todos.map(todo => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editTodoText };
      } else {
        return todo;
      }
    }));
    setEditMode(false);
    setEditTodoId(null);
    setEditTodoText('');
  }

  function handleCancelEdit() {
    setEditMode(false);
    setEditTodoId(null);
    setEditTodoText('');
  }

  function handleToggleComplete(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    }));
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className='app'>
      <div className='mainHeading'>
        <h1>ToDo List</h1>
      </div>
      <div className='subHeading'>
        <h2>Create your ToDo List</h2>
      </div>
      <div className='input'>
        <input
          type='text'
          placeholder='🖊 Add items...'
          value={todoText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <i onClick={handleAddTodo} className='fas fa-plus'></i>
      </div>

      <div className='todos'>
        {todos.map(todo => (
          <div className={`todo ${todo.completed ? 'completed' : ''}`} key={todo.id}>
            {editMode && editTodoId === todo.id ?
              <>
                <input type='text' value={editTodoText} onChange={handleEditInputChange} />
                <i onClick={handleSaveEdit} className='fas fa-check'></i>
                <i onClick={handleCancelEdit} className='fas fa-times'></i>
              </>
               :
              <>
                <div className='left'>
                  <input type='checkbox' checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} />
                  <p>{todo.text}</p>
                </div>
                <div className='right'>
                  <i onClick={() => handleEdit(todo.id)} className='fas fa-pen'></i>
                   <i onClick={() => handleDelete(todo.id)} className='fas fa-trash'></i>
                </div>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
  }
export default App
  
  
 
