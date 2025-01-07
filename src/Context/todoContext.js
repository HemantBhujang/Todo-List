import { createContext, useContext } from "react";

// Create a context for managing todo-related data and operations
export const TodoContext = createContext({
    // Initial state of todos, an array of todo objects
    todos: [
        {
            id: 1,               // Unique identifier for the todo
            todo: "Todo Msg",    // Description or message of the todo
            completed: false,    // Boolean indicating if the todo is completed
        }
    ],
    // Placeholder function for adding a new todo
    addTodo: (todo) => {},

    // Placeholder function for updating an existing todo
    updateTodo: (id, todo) => {},

    // Placeholder function for removing a todo by its id
    removeTodo: (id) => {},

    // Placeholder function for toggling the completion status of a todo
    toggleComplete: (id) => {}
});

// Custom hook to provide access to the TodoContext
// This allows any component in the tree to consume the context easily
export const useTodo = () => {
    return useContext(TodoContext); // Returns the current value of TodoContext
}

// The provider component for TodoContext
// Components wrapped with TodoProvider will have access to the context's value
export const TodoProvider = TodoContext.Provider;
