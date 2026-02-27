import { useState } from "react";

function Message() {
  const [inputText, setInputText] = useState<string>("");
  type Task = {
    id: number;
    text: string;
    completed: boolean;
  }
  const [items, setItems] = useState<Task[]>([]);

  const handleAdd = () => {
    if (inputText.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      text: inputText,
      completed: false
    };

    setItems([newTask, ...items]);
    setInputText("");
  };

  return (
    <div>
      <h1> TASKS </h1>
      <input type="text"
        className="form-control"
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <button onClick={handleAdd}>ADD</button>

      <br />

      {items.map((item) => (
        <div key={item.id}>
          <label>
            <input type="checkbox"
              checked={item.completed}
              onChange={(e) =>
                setItems(prevItems =>
                  prevItems.map((task) =>
                    task.id === item.id
                      ? { ...task, completed: e.target.checked }
                      : task
                  )
                )
              }
            />
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>
          </label>
        </div>
      ))}
    </div>
  );

}

export { Message };

