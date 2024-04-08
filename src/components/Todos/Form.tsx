import { FormEvent, useEffect, useRef } from 'react';

import { Todo, TodoFormData } from '../../types';
import { moveCursorToTheEnd } from '../../utils';
import { NumberInput } from '../NumberInput';

interface FormProps {
    mode: 'addTodo' | 'editTodo';
    todo?: Todo;
    onSave: (formData: TodoFormData) => void;
    onCancel: () => void;
    onDelete?: () => void;
    onClose?: () => void;
}

const TodoForm = ({
    mode,
    todo,
    onSave,
    onCancel,
    onDelete,
    onClose,
}: FormProps) => {
    const titleInput = useRef<HTMLInputElement>(null);

    // focus on input once form is created
    useEffect(() => {
        const input = titleInput.current as HTMLInputElement;

        input.focus();
        moveCursorToTheEnd(input);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        const todoFormData: TodoFormData = {
            title: formData.title as string,
            targetPomodoro: +formData.targetPomodoro as number,
        };
        onSave(todoFormData);

        $form.reset();

        onClose?.();
    };

    return (
        <form
            onSubmit={handleSubmit}
            id="task-adder"
            className="task-adder grid overflow-hidden rounded-lg bg-white"
        >
            <div className="form-inputs grid gap-4 px-5 py-5">
                <label>
                    <span className="sr-only">New Todo</span>
                    <input
                        ref={titleInput}
                        type="text"
                        name="title"
                        className="w-full bg-transparent text-xl placeholder:italic"
                        required
                        defaultValue={todo?.title ?? ''}
                        placeholder="What are you working on?"
                    />
                </label>
                
                <NumberInput
                    name="targetPomodoro"
                    className=""
                    defaultValue={todo?.targetPomodoro}
                    completedPomodoro={todo?.completedPomodoro}
                />
            </div>

            <div className="todo-actions flex justify-between bg-slate-300 px-5 py-3">
                {mode === 'editTodo' ? (
                    <button
                        type="button"
                        className="button"
                        data-type="naked"
                        onClick={onDelete}
                        aria-label="Delete"
                    >
                        Delete
                    </button>
                ) : (
                    <div></div>
                )}

                <div className="flex">
                    <button
                        type="button"
                        className="button"
                        data-type="naked"
                        onClick={onCancel}
                        aria-label="Cancel"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button"
                        data-type="confirm"
                        aria-label="Save"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export { TodoForm };
