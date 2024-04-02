import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { Todo, todosAtom } from '../../lib/atom';
import { updateItemsInLocalStorage } from '../../localStorage';

import { Form } from './Form';
import { TodoFormData } from './Todo';
import { Header } from './Header';
import { TodoList } from './TodoList';

const Todos = () => {
    const [todos, setTodos] = useAtom(todosAtom);

    useEffect(() => {
        updateItemsInLocalStorage(todos);
    }, [todos]);

    const addTodo = (formData: TodoFormData) => {
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
    };

    const editTodo = (id: string, formData: TodoFormData) => {
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
    };

    const removeTodo = (id: string) => {
        setTodos((prevTodos: Todo[]) => {
            return prevTodos.filter((todo) => todo.id !== id);
        });
    };

    const clearAllTodos = () => {
        if (!confirm('You really wanna clear all todos?!')) {
            return;
        }
        setTodos([]);
    };

    const clearCompletedTodos = () => {
        setTodos((prevTodos: Todo[]) => {
            const incompleteTodos = prevTodos.filter((todo) => !todo.completed);
            return incompleteTodos;
        });
    };

    const toggleTodoState = (id: string) => {
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
    };

    return (
        <section className="tasks-section mx-auto max-w-[30rem]">
            <Header />
            <TodoList
                todos={todos}
                todoFunctions={{
                    editTodo,
                    removeTodo,
                    toggleTodoState,
                }}
            />
            <Form
                mode={'addTodo'}
                handleTodo={addTodo}
                handleCancel={() => console.log('cancel add todo operation')}
            />
            <button
                type="button"
                className="button"
                data-type="primary"
                onClick={clearAllTodos}
            >
                Clear All Tasks
            </button>
            <button
                type="button"
                className="button"
                data-type="primary"
                onClick={clearCompletedTodos}
            >
                Clear Finished Tasks
            </button>
        </section>
    );
};

export { Todos };
