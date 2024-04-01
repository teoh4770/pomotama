import { Todo } from '../../lib/atom';
import { useState } from 'react';
import { Form } from './Form';

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

    const saveTodo = (todoFormData: TodoFormData) => {
        editTodo(todo.id, todoFormData);
        setEditing(false);
    };

    return (
        <li className="border p-2">
            {editing ? (
                <Form
                    mode="editTodo"
                    todo={todo}
                    onSubmitHandler={saveTodo}
                    handleCancel={() => setEditing(false)}
                    handleDelete={() => removeTodo(todo.id)}
                />
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
