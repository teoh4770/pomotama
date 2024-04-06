import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { Todo, TodoFormData, TodoActions } from '../types';
import { updateUserTodos } from '../utils';
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

    // update user in localStorage
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
                    targetPomodoro: formData.targetPomodoro,
                    completedPomodoro: 0,
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

    function incrementPomodoro(id: string) {
        setTodos((prevTodos: Todo[]) => {
            const key = 'completedPomodoro';

            const todo = prevTodos.find((todo) => todo.id === id) as Todo;
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

            return updatedTodos;
        });
    }

    const todoActions: TodoActions = {
        add,
        edit,
        remove,
        toggleState,
        clearAll,
        clearCompleted,
        incrementPomodoro,
    };

    return { todos, selectedTodoId, setSelectedTodoId, todoActions };
};

export { useTodos };
