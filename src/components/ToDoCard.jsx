import { BiSolidCheckCircle } from "react-icons/bi";
import { RiEditCircleFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { useContext } from "react";
import { TodoContext } from "../TodoContext";

const ToDoCard = ({ Todo , setShowPopupDelete , setDeleteId , setShowPopupEdit , setEditId ,  handleEditPopupOpen}) => {
  const { todo, setTodo } = useContext(TodoContext);

     //         <===== Is Complete Event Handler ======>

  const handleCheckClick = () => {
    const nextCheck = todo.map((t) => {
      if (t.id === Todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodo(nextCheck);
    localStorage.setItem("todos" , JSON.stringify(nextCheck))      //   تخزين الحدث في localstorage 

     //         <===== Is Complete Event Handler ======>
  };
  return (
    <div className="flex bg-blue-800 my-5 w-full hover:-translate-y-1 hover:-rotate-x-12 hover:duration-500 hover:py-4 hover:shadow-2xl relative">

                               {/* <======== Card Buttons ==========> */}

      <div className="flex justify-end text-right pt-2 min-h-24">

                               {/* <====== Delete Button =======>  */}

        <div className="flex justify-end items-center">
          <TiDelete
            className="mr-5 mt-5 text-[40px] text-white border-solid border-red-600 bg-red-600 rounded-full hover:scale-110 duration-300 hover:text-gray-300 shadow-2xl"
            onClick={() => {setShowPopupDelete(true)
              setDeleteId(Todo.id)
            }}
          />
        </div>
                               {/* <====== Delete Button =======>  */}

                                  {/* <======= Edit Button ======> */}
        <div className="flex justify-end items-center mt-5">
          <RiEditCircleFill className="text-[40px] mr-5 border-1 border-solid border-gray-600 rounded-full bg-gray-600 text-white hover:scale-110 duration-300 hover:text-gray-300 shadow-2xl"
          onClick={()=>handleEditPopupOpen(Todo.id)
          }
          />
        </div>
                                   {/* <======= Edit Button ======> */}

                                   {/* <====== Check Button ======> */}
        <div className="flex justify-end items-center">
          <BiSolidCheckCircle
            className={`mt-5 mr-12 text-[40px] ${
              Todo.isCompleted ? `text-green-600` : `text-white`
            } border-solid border-green-600 rounded-full ${
              Todo.isCompleted ? `bg-white` : `bg-green-600`
            } hover:scale-110 duration-300 hover:bg-green-400 shadow-2xl`}
            onClick={handleCheckClick}
          />
        </div>
                                   {/* <====== Check Button ======> */}

                     {/* <========= Card Buttons ==========> */}

                    {/* <============ Title & Details Card ==============> */}

        <div>
          <h1 className={`text-white font-bold text-2xl mr-2 mb-2 ${Todo.isCompleted ? `line-through`:``}`}>{Todo.title}</h1>
          <p className="text-white font-stretch-75% text-lg mr-2 mb-2">{Todo.details}</p>
        </div>
                     {/* <============ Title & Details Card ==============> */}
      </div>

  

    </div>
  );
};

export default ToDoCard;