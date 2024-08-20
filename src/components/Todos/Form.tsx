import { FormEvent, useEffect, useRef, useState } from 'react';

import { Todo, TodoFormData, TodoFormMode } from '../../types';
import { moveCursorToTheEnd } from '../../utils';
import { NumberInput } from './NumberInput';
import { Button } from '../ui';

interface FormProps {
    mode: TodoFormMode;
    todo?: Todo;
    onAddTodo: (formData: TodoFormData) => void;
    onClose: () => void;
    onDelete?: () => void;
}

const TodoForm: React.FC<FormProps> = ({
    mode,
    todo,
    onAddTodo,
    onClose,
    onDelete,
}) => {
    const [textAreaVisible, setTextAreaVisible] = useState(
        todo != null && todo.description != null && todo.description.length > 0
    );

    const titleInputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const $input = titleInputRef.current;

        if ($input) {
            $input.focus();
            moveCursorToTheEnd($input);
        }
    }, []);

    function showTextArea() {
        setTextAreaVisible(true);
    }

    function clearTextArea() {
        const $input = textAreaRef.current;

        if ($input) {
            $input.value = '';
        }
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = new FormData($form);

        const todoFormData: TodoFormData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            targetPomodoro: parseInt(formData.get('targetPomodoro') as string),
        };

        onAddTodo(todoFormData);

        $form.reset();
        onClose();
    }

    return (
        <form
            onSubmit={handleSubmit}
            id="task-adder"
            className="grid bg-white !font-bold text-slate-700 overflow-hidden rounded-lg"
        >
            <div className="grid gap-4 px-5 py-7" aria-label="Todo form inputs">
                <label>
                    <span className="sr-only">New Todo</span>
                    <input
                        ref={titleInputRef}
                        type="text"
                        name="title"
                        className="w-full bg-transparent text-xl placeholder:italic"
                        defaultValue={todo?.title ?? ''}
                        placeholder="What are you working on?"
                        required
                    />
                </label>

                <NumberInput
                    name="targetPomodoro"
                    defaultValue={todo?.targetPomodoro}
                    completedPomodoro={todo?.completedPomodoro}
                />

                <div>
                    {textAreaVisible && (
                        <textarea
                            ref={textAreaRef}
                            name="description"
                            className="w-full p-3 bg-[#efefef] text-sm font-light rounded-lg resize-none"
                            defaultValue={todo?.description ?? ''}
                            placeholder="Some notes..."
                            onFocus={(e) => moveCursorToTheEnd(e.currentTarget)}
                            autoFocus
                        ></textarea>
                    )}

                    <div>
                        {!textAreaVisible && (
                            <button
                                type="button"
                                className="text-sm font-light underline tracking-wider text-slate-400 hover:text-slate-500"
                                onClick={showTextArea}
                            >
                                + Add Note
                            </button>
                        )}

                        {textAreaVisible && (
                            <button
                                type="button"
                                className="text-sm font-light underline tracking-wider text-slate-400 hover:text-slate-500"
                                onClick={clearTextArea}
                            >
                                Clear Note
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* footer section */}
            <div
                className="flex px-5 py-3 bg-slate-300"
                aria-label="Todo form action buttons"
            >
                {mode === TodoFormMode.EDIT_TODO && (
                    <Button
                        intent="naked"
                        size="small"
                        type="button"
                        className="uppercase tracking-wide"
                        aria-label="Delete button"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                )}

                <div className="flex ml-auto">
                    <Button
                        intent="naked"
                        size="small"
                        type="button"
                        className="uppercase tracking-wide"
                        aria-label="Cancel button"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        intent="confirm"
                        size="small"
                        type="submit"
                        className="uppercase tracking-wide"
                        aria-label="Confirm button"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
};

export { TodoForm };
