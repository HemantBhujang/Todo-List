import React, { useState } from "react";
import { useTodo } from "../Context"; // Import the custom hook to access the TodoContext

function TodoForm() {
    // Local state to hold the current value of the input field
    const [todo, setTodo] = useState("");

    // Destructure the `addTodo` function from the context
    const { addTodo } = useTodo();

    // Function to handle form submission
    const add = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (e.g., page reload)

        // Check if the input field is empty; if so, do nothing
        if (!todo) return;

        // Call the `addTodo` function from the context and pass the new todo object
        addTodo({ todo, completed: false });

        // Clear the input field after adding the todo
        setTodo("");
    };

    return (
        <form onSubmit={add} className="flex">
            {/* Input field for writing a new todo */}
            <input
                type="text"
                placeholder="Write Todo..." // Placeholder text for the input field
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5" // Styling for the input
                value={todo} // Bind the value of the input to the `todo` state
                onChange={(e) => setTodo(e.target.value)} // Update the `todo` state on user input
            />
            {/* Button to submit the form and add a new todo */}
            <button
                type="submit" // Indicates that this button submits the form
                className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0" // Styling for the button
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm; // Export the component to be used in other parts of the application
