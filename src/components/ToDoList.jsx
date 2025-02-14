import { useState ,  useContext , useEffect } from "react";
import ToDoCard from "./ToDoCard";
import { v4 as uuidv4} from 'uuid';
import { TodoContext } from "../TodoContext";
const ToDoList = () => {

  //                <============== STATES ===============>

  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [deleteId , setDeleteId] = useState(null);
  const [InputTodo , setInputTodo] = useState("");
  const [showPopupEdit , setShowPopupEdit] = useState(false)
  const [EditId , setEditId] = useState(null)
  const [editValue , setEditValue] = useState({title:'' ,  details:''})
  const [displayButns , setDisplayButns] = useState("all");
  const {todo , setTodo} = useContext(TodoContext);  //حالة جاءت عن طريق الcontext 

  //                 <============== STATES ===============>

    // <============ Logic Complete & Non Complete Buttons ===============> 

  const completedTodos = todo.filter((t)=>{return t.isCompleted})
  const nonCompletedTodos = todo.filter((t)=>{return !t.isCompleted})
  let todosRender =todo
  if(displayButns == 'complete'){
todosRender = completedTodos
  }
  else if(displayButns == 'non-complete'){
    todosRender = nonCompletedTodos
  }else {todosRender == todo}

      // <============ Logic Complete & Non Complete Buttons ===============> 


        //             <======= Event Handler =========> 

    const handleEditPopupOpen = (id) => {
      const todoToEdit = todo.find((t) => t.id === id); // البحث عن المهمة المحددة
      if (todoToEdit) {
        setEditValue({ title: todoToEdit.title, details: todoToEdit.details }); // تعيين القيم الحالية
        setEditId(id); // تعيين معرف المهمة
        setShowPopupEdit(true); // فتح نافذة التعديل
      }}
  const handleAdd = ()=>{
    const newTodo = {
      id:uuidv4(),
      title:InputTodo,
      details:"",
      isCompleted:false
    }
    const addedTodos = [...todo , newTodo];
setTodo(addedTodos)
localStorage.setItem("todos" , JSON.stringify(addedTodos))
setInputTodo("")
  }
  const handleEditClick = () => {
    const updateEdit = todo.map((t) =>
      t.id === EditId ? { ...t, title: editValue.title, details: editValue.details } : t
    );
    setTodo(updateEdit);
    localStorage.setItem("todos" , JSON.stringify(updateEdit))
    setShowPopupEdit(false);
  };
  const handleDeleteClick = () => {
    const updateDelete = todo.filter((t) => t.id !== deleteId);
    setTodo(updateDelete);
    localStorage.setItem("todos" , JSON.stringify(updateDelete))
    setShowPopupDelete(false)
    setDeleteId(null)
  };

       //                 <======= Event Handler =========> 

  //          <=========== Side Effects (Storage Todos ) =============>

  useEffect(()=>{
    const storageTodos = localStorage.getItem("todos");
    if(storageTodos){
      try{
        const paresdTodo = JSON.parse(storageTodos);
        setTodo(paresdTodo);
      }
      catch(error){
        console.error('Failed' , error)
      }
    }
  } , []) 

  //             <=========== Side Effects (Storage Todos ) =============>

    //            <========== Card Component & Passing Props ============>
    const nextTodo = todosRender.map((t)=>(
      <ToDoCard key={t.id} Todo={t} setShowPopupDelete={setShowPopupDelete} setDeleteId = {setDeleteId} 
      setEditId = {setEditId}  handleEditPopupOpen={handleEditPopupOpen} 
      />
    ))
 //                 <========== Card Component & Passing Props ============>

  const addedExeptvalue = InputTodo == '';          // Logic for disable button add new card todo
  return (

    <div className="max-w-[400px] min-h-[450px] bg-white m-auto mt-12 rounded-xl border-2 border-blue-800">
        
                             {/**  Title  */}

<h1 className="text-5xl text-center font-bold  ">مهامي</h1>

<hr className="mt-5" />
                              
                                {/** Buttons  */}

<div className="flex justify-center items-center mt-5">
<button className={`border-1 border-gray-400 py-1 px-2  font-semibold text-gray-500 hover:bg-red-100 hover:text-red-500 duration-300 ${displayButns ==='non-complete' ? `bg-gray-300 text-gray-600`:`text-gray-500` }`}
value="non-complete" onClick={(e)=>setDisplayButns(e.target.value)}
>غير منجز </button>
<button className={`border-1 border-gray-400 py-1 px-2  font-semibold text-gray-500 hover:bg-red-100 hover:text-red-500 duration-300 ${displayButns === 'complete' ? `bg-gray-300 text-gray-600`:`text-gray-500`}`}
value="complete" onClick={(e)=>setDisplayButns(e.target.value)}
>منجز</button>
<button className={`border-1 border-gray-400 py-1 px-2  font-semibold  hover:bg-red-100 hover:text-red-500 duration-300 ${displayButns === 'all' ? `bg-gray-300 text-gray-600`:`text-gray-500`}`}
value="all" onClick={(e)=>setDisplayButns(e.target.value)}
>الكل</button>
</div>
                          {/**To Do Card Component */}
                          
                        
{nextTodo}

                            {/**Input & Button */}

<div className="flex justify-center  ">
<button className="mr-3 bg-pink-900 text-white px-10 rounded-lg hover:bg-pink-950 hover:scale-105 duration-150 mb-2 disabled:scale-100  disabled:bg-pink-700"
onClick={handleAdd}
disabled={addedExeptvalue}
>اضافة</button>   
<input
      type="text" 
      placeholder="عنوان المهمة" 
      value={InputTodo}
      onChange={(e)=>setInputTodo(e.target.value)}
      className="border-solid border-1 border-gray-500 rounded-lg px-4 py-2 font-semibold mr-2 hover:scale-105 duration-150 mb-2"
      />
</div>

                                        {/**Delete Popup */}

{showPopupDelete && (
  <div 
    className="fixed inset-0 flex justify-center items-center backdrop-blur-sm"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(5px)"
    }}
    onClick={() => setShowPopupDelete(false)} // إغلاق النافذة عند الضغط في أي مكان خارجها
  >
    <div 
      className="w-84 h-36 bg-white rounded-xl"
      onClick={(e) => e.stopPropagation()} // منع انتشار الحدث داخل النافذة
    >
      <h1 className="font-semibold text-red-500 text-center m-4">
        هل انت متأكد من حذف المهمة ؟
      </h1>
      <div className="flex justify-around mt-8"> 
        <button 
          className="bg-red-500 text-white font-semibold px-3 py-1 rounded-lg hover:bg-red-600 hover:scale-105 duration-150"
          onClick={handleDeleteClick}
        >
          نعم
        </button>
        <button 
          className="bg-green-500 text-white font-semibold px-5 py-1 rounded-lg hover:bg-green-600 hover:scale-105 duration-150"
          onClick={() => setShowPopupDelete(false)}
        >
          لا
        </button>
      </div>
    </div>
  </div>
)}

                                      
                                      {/**  Edit Popup  */}

{showPopupEdit && (
  <div 
    className="fixed inset-0 flex justify-center items-center backdrop-blur-sm"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(5px)"
    }}
    onClick={() => setShowPopupEdit(false)} // إغلاق النافذة عند الضغط في أي مكان خارجها
  >
    <div 
      className="w-84 min-h-54 bg-white rounded-xl"
      onClick={(e) => e.stopPropagation()} // منع انتشار الحدث داخل النافذة
    >
      <h1 className="font-semibold text-black text-center m-4">
        تعديل المهمة 
      </h1>
      <div>
        <input 
        value={editValue.title}
        onChange={(e)=>{setEditValue({...editValue , title:e.target.value})}}
        className="border-1 border-gray-500 px-2 ml-13 pt-1 rounded-xl "
        placeholder="العنوان"
        />
            <input 
        value={editValue.details}
        onChange={(e)=>{setEditValue({...editValue , details:e.target.value})}}
        className="border-1 border-gray-500 px-2 ml-13 pt-1 rounded-xl mt-5 "
        placeholder="التفاصيل"
        />
      </div>
      <div className="flex justify-around mt-8"> 
        <button 
          className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg hover:bg-blue-700 hover:scale-105 duration-150"
          onClick={handleEditClick}
        >
          تعديل
        </button>
        <button 
          className="bg-gray-700 text-white font-semibold px-5 py-1 rounded-lg hover:bg-gray-800 hover:scale-105 duration-150"
          onClick={() => setShowPopupEdit(false)}
        >
          الغاء
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default ToDoList