import { useState } from 'react';

import { Todo, TodoActions, TodoFormData } from '../../types';

import { TodoForm } from './Form';
import { Checkbox } from '../Checkbox';

interface TodoProps {
    todo: Todo;
    todoActions: TodoActions;
    isActive: boolean;
    isFocus: boolean;
    showTodo: () => void;
    focusTodo: () => void;
}

const TodoItem = ({
    todo,
    todoActions,
    isActive,
    isFocus,
    showTodo,
    focusTodo,
}: TodoProps) => {
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
                <TodoForm
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
                className={`todo ${isFocus && 'focus'} flex cursor-pointer items-center rounded-lg bg-white px-5 py-4`}
                onClick={focusTodo}
            >
                <div className="todo__input mr-auto flex">
                    <label
                        className="form-control"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Checkbox
                            id={todo.id}
                            name={'todo-' + todo.id}
                            checked={todo.completed}
                            onChange={toggleTodo}
                        />

                        {todo.title}
                    </label>
                </div>

                <div className="flex items-center gap-4">
                    <div className="todo-pomodoro-amount grid text-sm">
                        <span className="amount -translate-x-[1px] text-right">
                            <span className="completed-pomodoro-amount text-lg font-bold">
                                {todo.completedPomodoro}
                            </span>
                            /
                            <span className="expected-pomodoro-amount">
                                {todo.targetPomodoro}
                            </span>
                        </span>
                        <span className="">
                            round{todo.targetPomodoro > 1 && 's'}
                        </span>
                    </div>

                    <button
                        className="button border border-slate-300 !text-black/60 hover:bg-black/10"
                        data-type="secondary"
                        data-size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            showTodo();
                            openForm();
                        }}
                    >
                        Options
                    </button>
                </div>
            </div>
        </li>
    );
};

export { TodoItem };
