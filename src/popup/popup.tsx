import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Popup() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(["todos"], (result) => {
      setTodos(result.todos || []);
    });
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };

    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    chrome.storage.sync.set({ todos: updatedTodos });
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    chrome.storage.sync.set({ todos: updatedTodos });
  };

  const deleteTodo = (id: number) => {
    console.log(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    chrome.storage.sync.set({ todos: updatedTodos });
  };

  return (
    <div className="w-full p-4 bg-white  rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Yeni görev ekle..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ekle
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
