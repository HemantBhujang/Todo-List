import React, { useState } from "react";
import { useTodo } from "../Context"; // Import the custom hook to access the TodoContext

function TodoItem({ todo }) {
    // Local state to toggle edit mode for a specific todo
    const [isTodoEditable, setIsTodoEditable] = useState(false);

    // Local state to manage the updated todo message
    const [todoMsg, setTodoMsg] = useState(todo.todo);

    // Destructure functions from the context for updating, removing, and toggling todos
    const { updateTodo, removeTodo, toggleComplete } = useTodo();

    // Function to handle saving the edited todo
    const editTodo = () => {
        // Call `updateTodo` from the context with the updated message
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false); // Exit edit mode after saving
    };

    // Function to toggle the completed status of the todo
    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]" // Change background color based on completion status
            }`}
        >
            {/* Checkbox to toggle completion status */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed} // Reflect the current completed status
                onChange={toggleCompleted} // Call toggle function on change
            />
            {/* Input field to display and edit the todo message */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`} // Add strikethrough if completed
                value={todoMsg} // Controlled input bound to `todoMsg`
                onChange={(e) => setTodoMsg(e.target.value)} // Update local state on input change
                readOnly={!isTodoEditable} // Make input readonly if not in edit mode
            />
            {/* Edit/Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; // Disable editing if the todo is completed
                    if (isTodoEditable) {
                        editTodo(); // Save changes if in edit mode
                    } else {
                        setIsTodoEditable((prev) => !prev); // Toggle edit mode
                    }
                }}
                disabled={todo.completed} // Disable button if todo is completed
            >
                {isTodoEditable ? "📁" : "✏️"} {/* Icon changes based on edit mode */}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => removeTodo(todo.id)} // Call remove function on click
            >
                ❌ {/* Icon for delete button */}
            </button>
        </div>
    );
}

export default TodoItem; // Export the component to be used in other parts of the application
