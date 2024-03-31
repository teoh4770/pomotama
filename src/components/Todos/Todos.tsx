import { useAtom } from 'jotai';
import { Todo, todosAtom } from '../../lib/atom';
import { useEffect } from 'react';
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

    const toggleTodoCompletedState = (id: string) => {
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
            {/* tasks header */}
            <Header />
            {/* tasks todo list */}
            <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodoState={toggleTodoCompletedState}
                    />
                ))}
            </ol>

            {/* form component, 2 states
              -> expanded form when add button is clicked
              -> expanded form when editing the todo
            */}
            <Form mode={'editTodo'} onSubmit={addTodo} />
        </section>
    );
};

export { Todos };
