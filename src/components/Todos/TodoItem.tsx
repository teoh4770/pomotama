// reference: https://react.dev/learn/sharing-state-between-components

import { useState } from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { Todo, TodoActions } from '../../types';
import { Button, Checkbox } from '../ui';
import { TodoForm } from './Form';

interface TodoProps {
    todo: Todo;
    index: number;
    todoActions: TodoActions;
    isActiveTodo: boolean;
    isTodoSelected: boolean;
    onShow: () => void;
    onSelect: () => void;
}

// ? onShow, onSelect, isTodoEditorVisible are weird
// but i like the conditional rendering logic
const TodoItem: React.FC<TodoProps> = ({
    todo,
    index,
    todoActions: { edit, remove, toggleState },
    isActiveTodo,
    isTodoSelected,
    onShow,
    onSelect,
}) => {
    const [isTodoEditorVisible, setTodoEditorVisible] = useState(false);

    function handleEditClick(e: React.MouseEvent) {
        e.stopPropagation();

        setTodoEditorVisible(true);
        onShow();
    }

    const renderTodoForm = () => (
        <li>
            <TodoForm
                mode="editTodo"
                todo={todo}
                onSave={(todoFormData) => {
                    edit(todo.id, todoFormData);
                    setTodoEditorVisible(false);
                }}
                onDelete={() => remove(todo.id)}
                onCancel={() => setTodoEditorVisible(false)}
            />
        </li>
    );

    const renderTodoItem = () => (
        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
            {(provided, _) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div
                        role="button"
                        id={todo.id}
                        className={`todo ${isTodoSelected ? 'focus' : ''} | flex items-center w-full bg-white px-5 py-4 cursor-pointer rounded-lg`}
                        onClick={onSelect}
                        title="Click to focus on this task"
                        tabIndex={0} // Make it focusable
                    >
                        <div className="flex mr-auto">
                            <span className="form-control">
                                <Checkbox
                                    type="checkbox"
                                    name={'todo-' + todo.id}
                                    id={todo.id}
                                    className="peer"
                                    checked={todo.completed}
                                    onChange={() => toggleState(todo.id)}
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
                            <div className="grid text-sm">
                                <span className="text-right -translate-x-[1px]">
                                    <span className="completed-pomodoro-amount text-lg font-bold">
                                        {todo.completedPomodoro}
                                    </span>
                                    /
                                    <span className="expected-pomodoro-amount">
                                        {todo.targetPomodoro}
                                    </span>
                                </span>
                                <span>
                                    round{todo.targetPomodoro > 1 && 's'}
                                </span>
                            </div>

                            <Button
                                intent="secondary"
                                size="small"
                                type="button"
                                className="!text-black/60 hover:bg-black/10 border border-slate-300"
                                title="Click to edit this task"
                                aria-label="Edit todo button"
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </li>
            )}
        </Draggable>
    );

    return isActiveTodo && isTodoEditorVisible
        ? renderTodoForm()
        : renderTodoItem();
};

export { TodoItem };
