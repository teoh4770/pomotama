import { useState } from 'react';

import { Todo, TodoActions, TodoFormData } from '../../types';

import { TodoForm } from './Form';
import { Button, Checkbox } from '../ui';

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

    function openForm() {
        setIsEditing(true);
    }

    function closeForm() {
        setIsEditing(false);
    }

    function saveTodo(todoFormData: TodoFormData) {
        todoActions.edit(todo.id, todoFormData);
        closeForm();
    }

    function deleteTodo() {
        todoActions.remove(todo.id);
    }

    function toggleTodo() {
        todoActions.toggleState(todo.id);
    }

    // !the logic is a bit confusing
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
            <button
                title="Click to focus on this task"
                type="button"
                id={todo.id}
                className={`todo ${isFocus && 'focus'} flex w-full cursor-pointer items-center rounded-lg bg-white px-5 py-4`}
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

                    <Button
                        intent="secondary"
                        size="small"
                        type="button"
                        className="border border-slate-300 !text-black/60 hover:bg-black/10"
                        title="Click to edit this task"
                        aria-label="Edit button"
                        onClick={(e) => {
                            e.stopPropagation();
                            showTodo();
                            openForm();
                        }}
                    >
                        Edit
                    </Button>
                </div>
            </button>
        </li>
    );
};

export { TodoItem };
