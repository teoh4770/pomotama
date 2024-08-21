import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { selectedTodoIdAtom, todosAtom } from '../lib';
import { Todo, TodoActions, TodoFormData } from '../types';
import { storage } from '../utils';

interface UseTodos {
    todos: Todo[];
    selectedTodo: Todo;
    selectedTodoId: string;
    setSelectedTodoId: (id: string) => void;
    actions: TodoActions;
}

// Main hook for managing the todos functionality
const useTodos = (): UseTodos => {
    // =========================
    // ===    Atom values    ===
    // =========================
    const [todos, setTodos] = useAtom<Todo[]>(todosAtom);
    const [selectedTodoId, setSelectedTodoId] = useAtom(selectedTodoIdAtom);

    // =========================
    // === Derived Variables ===
    // =========================

    // Derived variable: Find the selected todo based on the ID or fallback to the first todo
    const selectedTodo = find(selectedTodoId) || todos[0] || null;

    // =========================
    // ===    Side Effect    ===
    // =========================

    // Side effect: Update todos in local storage whenever the todos array changes
    // ! need to fix, this render 3 times (might due to timer)
    useEffect(() => {
        storage.todos.populate(todos);
    }, [todos]);

    // Side effect: Update selectedTodoId in local storage whenever it changes
    useEffect(() => {
        storage.selectedTodoId.set(selectedTodoId);
    }, [selectedTodoId]);
    // =========================
    // ===  Todo Actions   ===
    // =========================

    // Todo action: Add a new todo item to the list
    function add(formData: TodoFormData) {
        const updatedTodos = [
            ...todos,
            {
                title: formData.title,
                description: formData.description,
                completed: false,
                id: self.crypto.randomUUID(),
                targetPomodoro: formData.targetPomodoro,
                completedPomodoro: 0,
            },
        ];

        setTodos(updatedTodos);

        handleSingleTodoSelection(updatedTodos);
    }

    // Todo action: Edit an existing todo item based on its ID
    function edit(id: string, formData: TodoFormData) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, ...formData };
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    // Todo action: Remove a todo item from the list based on its ID
    function remove(id: string) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    }

    // Todo action: Toggle the completed state of a todo item based on its ID
    function toggleState(id: string) {
        let updatedTodo: Todo | undefined;

        const updatedTodos = todos.map((todo) => {
            if (todo.id !== id) return todo;

            updatedTodo = {
                ...todo,
                completed: !todo.completed,
            };

            return updatedTodo;
        });

        // Extra todo list effect if state is toggled...
        // Find the todo and check if it is completed
        // const updatedTodo = updatedTodos.find((todo) => todo.id === id) as Todo;

        if (updatedTodo?.completed) {
            const nextTodoId = chooseNextTodo(updatedTodos, updatedTodo.id);

            setTodos(moveTodoToBack(updatedTodos, id));
            setSelectedTodoId(nextTodoId);

            return;
        }

        // If not completed, simply update the todos
        setTodos(updatedTodos);
    }

    // Todo action: Clear all todo items
    function clearAll() {
        const isConfirm = confirm(
            "Hey, are you absolutely positively sure about wiping out all those todos? No turning back once they're gone! 🌪️"
        );

        if (isConfirm) {
            reset();
        }
    }

    // Todo action: Clear only the completed todo items
    function clearCompleted() {
        const updatedTodos = todos.filter((todo) => !todo.completed);

        setTodos(updatedTodos);

        handleSingleTodoSelection(updatedTodos);
    }

    // Todo action: Reset all todo items
    function restart() {
        const isConfirm = confirm(
            'Hey, do you wanna reset all pomodoro count and unchecked the tasks! 🌪️'
        );

        const updatedTodos = todos.map((todo) => {
            return {
                ...todo,
                completed: false,
                completedPomodoro: 0,
            };
        });

        if (isConfirm) {
            setTodos(updatedTodos);
        }
    }

    // Todo action: Increment the pomodoro count for a specific todo item based on its ID
    function incrementPomodoro(id: string) {
        const KEY = 'completedPomodoro';

        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    [KEY]: todo[KEY] + 1,
                };
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    // Todo action: Find a todo item by its ID
    function find(id: string): Todo | undefined {
        return todos.find((todo) => todo.id === id);
    }

    // Todo action: Reorder the todo items by moving a todo from one index to another
    function reorder(fromIndex: number, toIndex: number) {
        const updatedTodos = [...todos];
        const [removed] = updatedTodos.splice(fromIndex, 1);
        updatedTodos.splice(toIndex, 0, removed);

        setTodos(updatedTodos);
    }

    // Helper function: Handle the selection of a single todo item when there is only one item in the list
    function handleSingleTodoSelection(todos: Todo[]) {
        if (todos.length === 1) {
            setSelectedTodoId(todos[0].id);
        }
    }

    // Helper function: Select the next todo, which is the first incomplete one.
    function chooseNextTodo(todos: Todo[], currentTodoId: string) {
        const nextTodoId = todos.find((todo) => !todo.completed)?.id;

        return nextTodoId || currentTodoId;
    }

    // Helper function: Put the todo at the back of the todo list
    function moveTodoToBack(todos: Todo[], id: string) {
        const todo = todos.find((todo) => todo.id === id) as Todo;
        const filteredTodos = todos.filter((todo) => todo.id !== id);

        return [...filteredTodos, todo];
    }

    // Helper function: Reset the todos list and selectedTodoId to their initial state
    function reset() {
        setTodos([]);
        setSelectedTodoId('');
    }

    return {
        todos,
        selectedTodo,
        selectedTodoId,
        setSelectedTodoId,
        actions: {
            add,
            edit,
            remove,
            toggleState,
            clearAll,
            clearCompleted,
            restart,
            incrementPomodoro,
            find,
            reorder,
        },
    };
};

export { useTodos };
