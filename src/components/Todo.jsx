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
    <div className="w-[600px] min-h-[732px] rounded-[20px] bg-white m-auto mt-[174px] flex flex-col p-[30px] pb-[30px] mb-[100px]">
      <div className="mt-[84px] text-[#002765] text-[36px] font-medium leading-[34px]">
        To-Do List
      </div>
      <form onSubmit={add}>
        <div className="flex justify-center items-center mt-[45px]">
          <input
            ref={inputRef}
            placeholder="add ur task"
            className="rounded-[50px] bg-[#edeef0] border-none outline-none w-[576px] h-[80px] ps-[35px] text-[20px]"
          />
          <div
            // onClick={() => {
            //   add();
            // }}
            className="rounded-3xl bg-[#002765] text-white w-[187px] h-[80px] flex justify-center items-center px-6 cursor-pointer text-semibold"
          >
            Add
          </div>
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
  );
}
