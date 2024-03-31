import { useAtom } from 'jotai';
import { Todo, todosAtom } from '../../lib/atom';
import { FormEvent, useEffect, useState } from 'react';
import { updateItemsInLocalStorage } from '../../localStorage';

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

            <form
                onSubmit={handleSubmit}
                id="task-adder"
                className="task-adder [&>*]:border [&>*]:p-2"
                style={{
                    display: hideTaskAdder ? 'none' : 'grid',
                }}
            >
                <label>
                    <span className="sr-only">New Todo</span>
                    <input
                        type="text"
                        name="title"
                        className="w-full border bg-transparent pl-1"
                        required
                    />
                </label>
                <div className="todo-options flex justify-end gap-2 ">
                    <button
                        className="button"
                        data-type="naked"
                        onClick={() => {
                            setHideAddTaskBtn(false);
                            setHideTaskAdder(true);
                        }}
                    >
                        Cancel
                    </button>
                    <button className="button" data-type="confirm">
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
};

export { Todos };
