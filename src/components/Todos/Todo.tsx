import { Todo } from '../../lib/atom';
import { FormEvent, useState } from 'react';

export interface TodoFormData {
    title: string;
}

interface TodoProps {
    todo: Todo;
    toggleTodoState: (id: string) => void;
    editTodo: (id: string, formData: TodoFormData) => void;
    removeTodo: (id: string) => void;
}

const TodoItem = ({
    todo,
    toggleTodoState,
    editTodo,
    removeTodo,
}: TodoProps) => {
    const [editing, setEditing] = useState(false);
    // handle delete
    // handle save/edit
    // handle cancel editing
    // can handle it outside (pass a callback in)
    // can pass an object in
    const saveTodo = (e: FormEvent) => {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        const todoFormData: TodoFormData = {
            title: formData.title as string,
        };
        editTodo(todo.id, todoFormData);

        setEditing(false);
    };

    return (
        <li className="border p-2">
            {editing ? (
                <form
                    onSubmit={saveTodo}
                    id="task-adder"
                    className="task-editor grid [&>*]:border [&>*]:p-2"
                >
                    <label>
                        <span className="sr-only">New Todo</span>
                        <input
                            type="text"
                            name="title"
                            className="w-full border bg-transparent pl-1"
                            required
                            defaultValue={todo.title}
                        />
                    </label>

                    <div className="todo-options flex justify-between">
                        <button
                            type="button"
                            className="button"
                            data-type="naked"
                            onClick={() => removeTodo(todo.id)}
                        >
                            delete
                        </button>
                        <div className="flex">
                            <button
                                type="button"
                                className="button"
                                data-type="naked"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" data-type="confirm">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div id={todo.id} className="todo-item flex items-center">
                    <label className="mr-auto">
                        <input
                            id={todo.id}
                            type="checkbox"
                            name="todo1"
                            checked={todo.completed}
                            onChange={() => toggleTodoState(todo.id)}
                        />
                        {todo.title}
                    </label>
                    <button
                        className="button"
                        data-type="secondary"
                        data-size="small"
                        onClick={() => setEditing(true)}
                    >
                        Options
                    </button>
                </div>
            )}
        </li>
    );
};

export { TodoItem };
