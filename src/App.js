import React ,{useState} from 'react'
import './App.css'

function App() {
    const [ToDos, setToDos] = useState([]);
    const [todo , setTodo] = useState('');

    function inputHandler(event){
        setTodo(event.target.value);
    }
    function addListHandler(){
        setToDos([...ToDos ,{id:Date.now(), text:todo, status: false}]);
    }
    function enterHandler(event){
        if(event.code ==='Enter')
        {
          setToDos([...ToDos ,{id:Date.now(), text:todo, status: false}]);
        }
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
          <input onChange={inputHandler} onKeyDown={enterHandler} type="text" placeholder='🖊 Add items...' />
            <i onClick={addListHandler}  className="fas fa-plus"></i>
        </div>
                 
          <div className='todos' >
          {
            ToDos.map((data)=>{
              return(
              <div className='todo todoAnimationSelected'>
                <div className="left">
                  <input onChange={(event)=>{
                    console.log(event.target.checked);
                    console.log(data);
                    setToDos(ToDos.filter(newObj=>{
                      if(newObj.id === data.id){
                        newObj.status = event.target.checked
                      }
                      return newObj
                    }))
                  }} data={data.status} type="checkbox" />
                  <p>{data.text}</p>
                </div>
                <div className="right">
                  <i className='fas fa-time'></i>
                </div>
              </div>
              )
             
            })
          }
        </div>
    </div>
  )
}

export default App