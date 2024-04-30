// reference: https://react.dev/learn/sharing-state-between-components

import { useState } from 'react';

import { Todo, TodoActions, TodoFormData } from '../../types';

import { TodoForm } from './Form';
import { Button, Checkbox } from '../ui';

interface TodoProps {
    todo: Todo;
    todoActions: TodoActions;
    isTodoActive: boolean;
    isTodoSelected: boolean;
    onShow: () => void;
    onSelect: () => void;
}

const TodoItem = ({
    todo,
    todoActions,
    isTodoActive,
    isTodoSelected,
    onShow,
    onSelect,
}: TodoProps) => {
    const [isEditingTodo, setIsEditingTodo] = useState(false);

    function openTodoEditor() {
        onShow();
        setIsEditingTodo(true);
    }

    function closeTodoEditor() {
        setIsEditingTodo(false);
    }

    function saveTodo(todoFormData: TodoFormData) {
        todoActions.edit(todo.id, todoFormData);
        closeTodoEditor();
    }

    function deleteTodo() {
        todoActions.remove(todo.id);
    }

    function toggleTodo() {
        todoActions.toggleState(todo.id);
    }

    if (isEditingTodo && isTodoActive) {
        return (
            <li>
                <TodoForm
                    mode="editTodo"
                    todo={todo}
                    onSave={saveTodo}
                    onDelete={deleteTodo}
                    onCancel={closeTodoEditor}
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
                className={`todo ${isTodoSelected && 'focus'} flex w-full cursor-pointer items-center rounded-lg bg-white px-5 py-4`}
                onClick={onSelect}
            >
                <div className="todo__input mr-auto flex">
                    <span className="form-control">
                        <Checkbox
                            type="checkbox"
                            name={'todo-' + todo.id}
                            id={todo.id}
                            className="peer"
                            checked={todo.completed}
                            onChange={toggleTodo}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <label
                            className="peer-checked:line-through"
                            htmlFor={todo.id}
                        >
                            {todo.title}
                        </label>
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
                            openTodoEditor();
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
