import { useState } from 'react';

import { Todo, TodoActions, TodoFormData } from '../../types';

import { Form } from './Form';
import { Checkbox } from '../Checkbox';

interface TodoProps {
    todo: Todo;
    todoActions: TodoActions;
    isActive: boolean;
    onShow: () => void;
}

const TodoItem = ({ todo, todoActions, isActive, onShow }: TodoProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const openForm = () => {
        setIsEditing(true);
    };

    const closeForm = () => {
        setIsEditing(false);
    };

    const saveTodo = (todoFormData: TodoFormData) => {
        todoActions.edit(todo.id, todoFormData);
        closeForm();
    };

    const deleteTodo = () => {
        todoActions.remove(todo.id);
    };

    const toggleTodo = () => {
        todoActions.toggleState(todo.id);
    };

    if (isActive && isEditing) {
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
                        <Checkbox
                            id={todo.id}
                            name={'todo-' + todo.id}
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
                    onClick={() => {
                        onShow();
                        openForm();
                    }}
                >
                    Options
                </button>
            </div>
        </li>
    );
};

export { TodoItem };
