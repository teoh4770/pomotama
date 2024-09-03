/* eslint-disable @typescript-eslint/no-unused-vars */
// reference: https://react.dev/learn/sharing-state-between-components

import { useState } from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { Todo, TodoActions, TodoFormMode } from '../../types';
import { Button, Checkbox } from '../ui';
import { TodoForm } from './Form';

interface TodoProps {
    todo: Todo;
    index: number;
    actions: TodoActions;
    isEditing: boolean;
    isSelected: boolean;
    onEditTodo: () => void;
    onClickTodo: () => void;
}

const TodoItem: React.FC<TodoProps> = ({
    todo,
    index,
    actions: { edit, remove, toggleState },
    isEditing,
    isSelected,
    onEditTodo,
    onClickTodo,
}) => {
    const [isEditorVisible, setEditorVisible] = useState(false);

    function handleEditClick(e: React.MouseEvent) {
        e.stopPropagation();

        setEditorVisible(true);
        onEditTodo();
    }

    const renderTodoForm = () => (
        <li>
            <TodoForm
                mode={TodoFormMode.EDIT_TODO}
                todo={todo}
                onAddTodo={(todoFormData) => {
                    edit(todo.id, todoFormData);
                    setEditorVisible(false);
                }}
                onDelete={() => remove(todo.id)}
                onClose={() => setEditorVisible(false)}
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
                        className={`todo ${isSelected ? 'focus' : ''} | space-y-2 bg-white px-5 py-4 cursor-pointer rounded-lg`}
                        onClick={onClickTodo}
                        title="Click to focus on this task"
                        tabIndex={0} // Make it focusable
                    >
                        {/* upper section */}
                        <div className="flex items-center w-full">
                            {/* contain checkbox and title */}
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

                            {/* contain pomodoro rounds and button */}
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

                        {/* if todo description is not empty  */}
                        {todo.description && (
                            <div className="px-4">
                                <label
                                    className="hidden"
                                    htmlFor={'description-' + todo.id}
                                >
                                    description
                                </label>
                                <textarea
                                    name="description"
                                    id={'description-' + todo.id}
                                    className="w-full p-3 text-sm bg-[#feff9c]/80 rounded-lg pointer-events-none resize-none cursor-none shadow-md"
                                    value={todo.description}
                                    readOnly
                                ></textarea>
                            </div>
                        )}
                    </div>
                </li>
            )}
        </Draggable>
    );

    return isEditing && isEditorVisible ? renderTodoForm() : renderTodoItem();
};

export { TodoItem };
