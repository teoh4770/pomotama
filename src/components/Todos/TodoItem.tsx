import { useState } from 'react';

import { Todo, TodoActions, TodoFormData } from '../../types';
import { Form } from './Form';

interface TodoProps {
    todo: Todo;
    todoActions: TodoActions;
}

const TodoItem = ({ todo, todoActions }: TodoProps) => {
    const [editingTodo, setEditingTodo] = useState(false);

    const openForm = () => {
        setEditingTodo(true);
    };

    const closeForm = () => {
        setEditingTodo(false);
    };

    const saveTodo = (todoFormData: TodoFormData) => {
        console.log(todoFormData);
        todoActions.edit(todo.id, todoFormData);
        closeForm();
    };

    const deleteTodo = () => {
        todoActions.remove(todo.id);
    };

    const toggleTodo = () => {
        todoActions.toggleState(todo.id);
    };

    if (editingTodo) {
        return (
            <li>
                <Form
                    mode="editTodo"
                    todo={todo}
                    onSave={saveTodo}
                    onCancel={closeForm}
                    onDelete={deleteTodo}
                />
            </li>
        );
    }

    return (
        <li>
            <div
                id={todo.id}
                className="todo flex items-center rounded-lg bg-white px-5 py-4"
            >
                <div className="todo__input mr-auto flex">
                    <label className="form-control">
                        <input
                            id={todo.id}
                            type="checkbox"
                            name="todo1"
                            checked={todo.completed}
                            onChange={toggleTodo}
                        />
                        {todo.title}
                    </label>
                </div>
                <button
                    className="button border border-slate-300 !text-black/60"
                    data-type="secondary"
                    data-size="small"
                    onClick={openForm}
                >
                    Options
                </button>
            </div>
        </li>
    );
};

export { TodoItem };
