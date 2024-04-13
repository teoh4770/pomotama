import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { Todo, TodoFormData, TodoActions } from '../types';
import { updateSelectedTodoId, updateUserTodos } from '../utils';
import { selectedTodoIdAtom, todosAtom } from '../lib';

interface UseTodos {
    todos: Todo[];
    selectedTodoId: string;
    setSelectedTodoId: (id: string) => void;
    todoActions: TodoActions;
}

const useTodos = (): UseTodos => {
    const [todos, setTodos] = useAtom<Todo[]>(todosAtom);
    const [selectedTodoId, setSelectedTodoId] = useAtom(selectedTodoIdAtom);

    // update the todos in localstorage
    useEffect(() => {
        updateUserTodos(todos);
    }, [todos]);

    // update the selected todoId in localstorage
    useEffect(() => {
        // localstorage update
        updateSelectedTodoId(selectedTodoId);
    }, [selectedTodoId]);

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
    }

    function edit(id: string, formData: TodoFormData) {
        const todo = todos.find((todo) => todo.id === id) as Todo;
        const updatedTodo = { ...todo, ...formData };
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function remove(id: string) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    }

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

    function clearAll() {
        setTodos([]);
        updateUserTodos([]);
    }

    function clearCompleted() {
        const updatedTodos = todos.filter((todo) => !todo.completed);

        setTodos(updatedTodos);
    }

    function incrementPomodoro(id: string) {
        const key = 'completedPomodoro';

        const todo = todos.find((todo) => todo.id === id) as Todo;
        const updatedTodo = {
            ...todo,
            [key]: todo[key] + 1,
        };
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function find(id: string) {
        return todos.find((todo) => todo.id === id);
    }

    const todoActions: TodoActions = {
        add,
        edit,
        remove,
        toggleState,
        clearAll,
        clearCompleted,
        incrementPomodoro,
        find,
    };

    return { todos, selectedTodoId, setSelectedTodoId, todoActions };
};

export { useTodos };
