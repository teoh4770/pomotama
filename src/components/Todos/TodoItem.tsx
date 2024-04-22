import { useState } from 'react';

import { Todo, TodoActions, TodoFormData } from '../../types';

import { TodoForm } from './Form';
import { Button, Checkbox } from '../ui';

interface TodoProps {
    todo: Todo;
    todoActions: TodoActions;
    isTodoActive: boolean;
    isFocus: boolean;
    showTodo: () => void;
    focusTodo: () => void;
}

const TodoItem = ({
    todo,
    todoActions,
    isTodoActive,
    isFocus,
    showTodo,
    focusTodo,
}: TodoProps) => {
    const [isEditingTodo, setIsEditingTodo] = useState(false);

    function openForm() {
        setIsEditingTodo(true);
    }

    function closeForm() {
        setIsEditingTodo(false);
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
    if (isTodoActive && isEditingTodo) {
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
                title="Click to focus on this task"
                tabIndex={0}
                role="button"
                id={todo.id}
                className={`todo ${isFocus && 'focus'} flex w-full cursor-pointer items-center rounded-lg bg-white px-5 py-4`}
                onClick={focusTodo}
            >
                <div className="todo__input mr-auto flex">
                    <span className="form-control">
                        <Checkbox
                            type="checkbox"
                            name={'todo-' + todo.id}
                            id={todo.id}
                            checked={todo.completed}
                            onChange={toggleTodo}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </span>
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
            </div>
        </li>
    );
};

export { TodoItem };
