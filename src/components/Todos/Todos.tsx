import { useAtom } from 'jotai';
import { Todo, todosAtom } from '../../lib/atom';
import { useEffect } from 'react';
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
            <TodoList
                todos={todos}
                todoFunctions={{
                    editTodo,
                    removeTodo,
                    toggleTodoState,
                }}
            />
            <Form mode={'addTodo'} onSubmit={addTodo} />
        </section>
    );
};

export { Todos };
