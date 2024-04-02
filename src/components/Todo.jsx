import { useEffect, useRef, useState } from "react";
import TodoItems from "./TodoItems";
let count = 0;
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    if (inputRef.current.value !== "") return;
    inputRef.current.value = "";
    localStorage.setItem("count", count);
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);
  return (
    <div className="px-2">
      <div className="max-w-screen-sm mx-auto mt-16 px-4 bg-gray-500 rounded-2xl py-12">
        <div className="text-3xl font-medium text-center mb-8">To-Do List</div>
        <form onSubmit={add} className="mb-8">
          <div className="flex items-center">
            <input
              ref={inputRef}
              placeholder="Add your task"
              className="rounded-full bg-gray-200 flex-grow py-3 px-4 text-lg"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 text-white px-6 py-3 ml-4"
            >
              Add
            </button>
          </div>
        </form>
        <div>
          {todos.map((item, index) => (
            <TodoItems
              key={index}
              text={item.text}
              no={item.no}
              display={item.display}
              setTodos={setTodos}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
