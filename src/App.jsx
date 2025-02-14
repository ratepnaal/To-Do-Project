import ToDoList from "./components/ToDoList"
import { TodoContext } from "./TodoContext"
import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
const Todos = 
[
{
  id:uuidv4(),
  title:'قراءة الكتب',
  details:'انجاز قبل نهاية الشهر',
  isCompleted:false
},
{
  id:uuidv4(),
  title:'مشاهدة الافلام',
  details:'في يوم العطلة ',
  isCompleted:false
},
{
  id:uuidv4(),
  title:'الدراسة',
  details:'من السادسة صباحا حتى الثانية عشر ظهرا ',
  isCompleted:false
},

]
function App() {
  const [todo , setTodo] = useState(Todos);
  return (
    <div>
      <TodoContext.Provider value={{todo , setTodo}}>
    <ToDoList/>
    </TodoContext.Provider>
    <p className="flex justify-center mt-10 text-white font-light">© 2024  All Rights Reserved by Eng Rateb Al Naal</p>
    </div>
  )
}

export default App
