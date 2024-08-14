import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { selectedTodoIdAtom, todosAtom } from '../lib';
import { Todo, TodoActions, TodoFormData } from '../types';
import {
    updateSelectedTodoIdFromStorage,
    updateUserTodosFromStorage,
} from '../utils';

interface UseTodos {
    todos: Todo[];
    selectedTodo: Todo;
    selectedTodoId: string;
    setSelectedTodoId: (id: string) => void;
    actions: TodoActions;
}

const useTodos = (): UseTodos => {
    const [todos, setTodos] = useAtom<Todo[]>(todosAtom);
    const [selectedTodoId, setSelectedTodoId] = useAtom(selectedTodoIdAtom);

    const selectedTodo = find(selectedTodoId) || todos[0] || null;

    // Update todos in localstorage
    useEffect(() => {
        updateUserTodosFromStorage(todos);
    }, [todos]);

    // Update selectedTodoId in localstorage
    useEffect(() => {
        updateSelectedTodoIdFromStorage(selectedTodoId);
    }, [selectedTodoId]);

    // Add
    function add(formData: TodoFormData) {
        const updatedTodos = [
            ...todos,
            {
                title: formData.title,
                completed: false,
                id: self.crypto.randomUUID(),
                targetPomodoro: formData.targetPomodoro,
                completedPomodoro: 0,
            },
        ];
        setTodos(updatedTodos);

        handleSingleTodoSelection(updatedTodos);
    }

    // Edit
    function edit(id: string, formData: TodoFormData) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, ...formData };
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    // Remove
    function remove(id: string) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // Toggle
    function toggleState(id: string) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    // Clear
    function clearAll() {
        const isConfirm = confirm(
            "Hey, are you absolutely positively sure about wiping out all those todos? No turning back once they're gone! 🌪️"
        );

        if (isConfirm) {
            reset();
        }
    }

    // Clear completed
    function clearCompleted() {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);

        handleSingleTodoSelection(updatedTodos);
    }

    // increment pomodoro
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

    // Find
    function find(id: string): Todo | undefined {
        return todos.find((todo) => todo.id === id);
    }

    // ?reorder
    function reorder(fromIndex: number, toIndex: number) {
        const updatedTodos = [...todos];
        const [removed] = updatedTodos.splice(fromIndex, 1);
        updatedTodos.splice(toIndex, 0, removed);

        setTodos(updatedTodos);
    }

    // Utils
    function handleSingleTodoSelection(todos: Todo[]) {
        if (todos.length === 1) {
            setSelectedTodoId(todos[0].id);
        }
    }

    function reset() {
        setTodos([]);
        setSelectedTodoId('');
    }

    // actions
    const actions: TodoActions = {
        add,
        edit,
        remove,
        toggleState,
        clearAll,
        clearCompleted,
        incrementPomodoro,
        find,
        reorder,
    };

    return {
        todos,
        selectedTodo,
        selectedTodoId,
        setSelectedTodoId,
        actions,
    };
};

export { useTodos };
