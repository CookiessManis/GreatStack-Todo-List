import cross from "./Assets/cross.png";
import tick from "./Assets/tick.png";
import not_tick from "./Assets/not_tick.png";

export default function TodoItems({ no, text, display, setTodos }) {
  const deleteTodo = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    data = data.filter((todo) => todo.no !== no);
    setTodos(data);
  };
  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === display) {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
  };

  return (
    <div className="flex justify-between items-center pt-6 px-2">
      <div
        className={`flex p-2 ${display} cursor-pointer`}
        onClick={() => toggle(no)}
      >
        {display === "" ? (
          <img src={not_tick} alt={not_tick} />
        ) : (
          <img src={tick} />
        )}
        <div className="ps-[16px] text-[#404040] text-[22px]">{text}</div>
      </div>
      <img
        className="cursor-pointer pe-[25px]"
        src={cross}
        onClick={() => deleteTodo(no)}
      />
    </div>
  );
}
