import { useEffect, useState } from 'react'; // Import React hooks
import './App.css'; // Import global styles
import { TodoProvider } from './Context'; // Import the TodoProvider to manage context
import TodoForm from './Component/TodoForm'; // Import TodoForm component
import TodoItem from './Component/TodoItem'; // Import TodoItem component

function App() {
    // State to manage the list of todos
    const [todos, setTodos] = useState([]);

    // Function to add a new todo
    const addTodo = (todo) => {
        // Add the new todo at the beginning of the array
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    // Function to update an existing todo
    const updateTodo = (id, todo) => {
        // Map through the todos and replace the matching todo
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    // Function to remove a todo
    const removeTodo = (id) => {
        // Filter out the todo with the matching id, it return only true values
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // Function to toggle the completed status of a todo
    const toggleComplete = (id) => {
        // Map through todos and toggle the `completed` status for the matching todo
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    // Load todos from localStorage on component mount
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos')); // Parse the JSON string

        if (todos && todos.length > 0) {
            setTodos(todos); // Set the todos if they exist
        }
    }, []); // Empty dependency array ensures this runs only once

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos)); // Convert todos to a JSON string
    }, [todos]); // Runs every time the `todos` state changes

    return (
        <TodoProvider
            value={{
                todos,
                addTodo,
                updateTodo,
                removeTodo,
                toggleComplete,
            }}
        >
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                        Manage Your Todos
                    </h1>
                    <div className="mb-4">
                        {/* Todo form to add new todos */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/* Loop through todos and render TodoItem for each */}
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full">
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
