import { useAtom } from 'jotai';
import { Todo, todosAtom } from '../../lib/atom';
import { FormEvent, useEffect, useState } from 'react';
import { updateItemsInLocalStorage } from '../../localStorage';
import { Form } from './Form';

const Todos = () => {
    const [todos, setTodos] = useAtom(todosAtom);
    const [hideAddTaskBtn, setHideAddTaskBtn] = useState(false);
    const [hideTaskAdder, setHideTaskAdder] = useState(true);

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        addTodo(formData);

        $form.reset();
    };

    return (
        <section className="tasks-section">
            {/* tasks header */}
            <header className="tasks-section__header flex items-center justify-between border py-4">
                <h2 className="font-semibold text-white">Tasks</h2>
                <button
                    className="button"
                    data-type="secondary"
                    data-size="small"
                >
                    Options
                </button>
            </header>
            {/* tasks todo list */}
            <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center border p-2">
                        <label className="mr-auto">
                            <input
                                id={todo.id}
                                type="checkbox"
                                name="todo1"
                                checked={todo.completed}
                                onChange={() =>
                                    toggleTodoCompletedState(todo.id)
                                }
                            />
                            {todo.title}
                        </label>
                        <button
                            className="button"
                            data-type="secondary"
                            data-size="small"
                        >
                            Options
                        </button>
                    </li>
                ))}
            </ol>
            <button
                id="add-task-button"
                className="w-full border p-4 text-center"
                style={{
                    display: hideAddTaskBtn ? 'none' : 'block',
                }}
                onClick={() => {
                    setHideAddTaskBtn(true);
                    setHideTaskAdder(false);
                }}
            >
                Add Task
            </button>

            {/* form component, 2 states
              -> expanded form when add button is clicked
              -> expanded form when editing the todo
            */}
            <Form mode={'editTodo'} onSubmit={addTodo}/>
        </section>
    );
};

export { Todos };
