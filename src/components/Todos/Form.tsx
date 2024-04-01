import { FormEvent, useEffect, useRef } from 'react';
import { Todo } from '../../lib/atom';
import { TodoFormData } from './Todo';

interface FormProps {
    mode: 'addTodo' | 'editTodo';
    todo?: Todo;
    handleTodo: (todoFormData: TodoFormData) => void;
    handleCancel: () => void;
    handleDelete?: () => void;
}

const Form = ({
    mode,
    todo,
    handleTodo,
    handleCancel,
    handleDelete,
}: FormProps) => {
    const titleInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = titleInput.current as HTMLInputElement;

        input.focus();
        moveCursorToTheEnd(input);

        function moveCursorToTheEnd(input: HTMLInputElement) {
            input.setSelectionRange(input.value.length, input.value.length);
        }
    }, []);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        const todoFormData: TodoFormData = {
            title: formData.title as string,
        };
        handleTodo(todoFormData);

        $form.reset();
    };

    return (
        <form
            onSubmit={(e) => handleFormSubmit(e)}
            id="task-adder"
            className="task-adder grid overflow-hidden rounded-lg bg-white"
        >
            <label className="px-5 py-4">
                <span className="sr-only">New Todo</span>
                <input
                    ref={titleInput}
                    type="text"
                    name="title"
                    className="w-full bg-transparent pl-1 text-xl placeholder:italic"
                    required
                    defaultValue={todo?.title ?? ''}
                    placeholder="What are you working on?"
                />
            </label>

            <div className="todo-options flex justify-between bg-slate-300 px-5 py-3">
                {mode === 'editTodo' ? (
                    <button
                        type="button"
                        className="button"
                        data-type="naked"
                        onClick={handleDelete}
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
                        onClick={handleCancel}
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

export { Form };
