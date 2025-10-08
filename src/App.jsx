import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let loadedTodos = JSON.parse(localStorage.getItem("todos"));
      settodos(loadedTodos);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToLS();
    }
  }, [todos, isLoaded]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
  };

  const handleDelete = (e, uid) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == uid;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== uid;
    });
    settodos(newTodos);
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className=" Container bg-violet-300  rounded-lg  text-base  p-4 md:w-3/4 md:mx-auto mx-auto w-[95%] md:m-5 m-2 ">
      <div className="place-self-center mb-4 justify-center"><b className="text-2xl">workTodo : Your personal todo manager</b></div>
        <div className="addTodo">
          <span className="font-bold">Add a Todo</span>
          <br/>

          <input
            onChange={handleChange}
            value={todo}
            className=" my-2 outline-none rounded-lg w-2/4 text-sm px-2 py-1"
            type="text"
          />
          <button
          disabled={todo.length<3}
            onClick={handleAdd}
            className="bg-violet-600 rounded-lg text-sm px-2 py-1 ml-10 hover:bg-violet-700 hover:scale-110 font-semibold disabled:bg-violet-600 disabled:scale-100"
          >
            Save
          </button>
        </div>
        <hr className="mt-4" />

        <div className="mt-4 pb-4">
          <span className="font-bold">Your Todos</span>
          <div className="content">
            {todos.length == 0 && <div className="">Nothing to display...</div>}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="content flex justify-between my-4 w-1/2 "
                >
                  <div className="flex items-center gap-4 ">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      value={item.isCompleted}
                      name={item.id}
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "line-through flex w-40 wrap-anywhere"
                          : " flex w-40 wrap-anywhere"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className=" flex h-full ">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-600 rounded-lg text-sm px-5 py-1 ml-10 hover:bg-violet-700 hover:scale-110 font-semibold"
                    >
                      <MdModeEditOutline />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-600 rounded-lg text-sm px-2 py-1 ml-10 hover:bg-violet-700 hover:scale-110 font-semibold mr-6"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
