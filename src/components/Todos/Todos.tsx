import { useAtom } from 'jotai';
import { Todo, todosAtom } from '../../lib/atom';
import { useEffect, useState } from 'react';
import { updateItemsInLocalStorage } from '../../localStorage';
import { Form } from './Form';
import { TodoItem } from './Todo';
import { Header } from './Header';

const Todos = () => {
    const [todos, setTodos] = useAtom(todosAtom);

    useEffect(() => {
        updateItemsInLocalStorage(todos);
    }, [todos]);

    const addTodo = (formData: { [k: string]: FormDataEntryValue }) => {
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

    // I don't want every todo have this function, i wanna pass it down instead
    // formData interface
    const editTodo = (id: string, formData: { title: string }) => {
        const todo = todos.find((todo) => todo.id === id) as Todo;
        const updatedTodo = { ...todo, ...formData };
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        });

        setTodos(updatedTodos);
    };

    const removeTodo = (id: string) => {
        setTodos((prevTodos: Todo[]) => {
            return prevTodos.filter((todo) => todo.id !== id);
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
        <section className="tasks-section">
            <Header />
            <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodoState={toggleTodoState}
                        editTodo={editTodo}
                        removeTodo={removeTodo}
                    />
                ))}
            </ol>

            <Form mode={'addTodo'} onSubmit={addTodo} />
        </section>
    );
};

export { Todos };
