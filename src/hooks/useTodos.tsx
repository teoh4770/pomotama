import { useEffect, useState } from 'react';

import { Todo, TodoFormData, TodoActions } from '../types';
import { fetchUserTodos, updateUserTodos } from '../utils';

interface UseTodos {
    todos: Todo[];
    todoActions: TodoActions;
}

const useTodos = (): UseTodos => {
    const [todos, setTodos] = useState<Todo[]>(
        JSON.parse(fetchUserTodos() ?? '[]')
    );

    useEffect(() => {
        updateUserTodos(todos);
    }, [todos]);

    function add(formData: TodoFormData) {
        setTodos((prevTodos: Todo[]) => {
            return [
                ...prevTodos,
                {
                    title: formData.title,
                    completed: false,
                    id: self.crypto.randomUUID(),
                },
            ];
        });
    }

    function edit(id: string, formData: TodoFormData) {
        setTodos((prevTodos: Todo[]) => {
            const todo = prevTodos.find((todo) => todo.id === id) as Todo;
            const updatedTodo = { ...todo, ...formData };
            const updatedTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return updatedTodo;
                }
                return todo;
            });

            return updatedTodos;
        });
    }

    function remove(id: string) {
        setTodos((prevTodos: Todo[]) => {
            return prevTodos.filter((todo) => todo.id !== id);
        });
    }

    function toggleState(id: string) {
        setTodos((prevTodos: Todo[]) => {
            const updatedTodos = prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            });
            return updatedTodos;
        });
    }

    function clearAll() {
        setTodos([]);
    }

    function clearCompleted() {
        setTodos((prevTodos: Todo[]) => {
            return prevTodos.filter((todo) => !todo.completed);
        });
    }

    const todoActions: TodoActions = {
        add,
        edit,
        remove,
        toggleState,
        clearAll,
        clearCompleted,
    };

    return { todos, todoActions };
};

export { useTodos };
