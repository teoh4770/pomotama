import { FormEvent } from 'react';
import { Todo } from '../../lib/atom';
import { TodoFormData } from './Todo';

interface FormProps {
    mode: 'addTodo' | 'editTodo';
    todo?: Todo;
    onSubmitHandler: (todoFormData: TodoFormData) => void;
    handleCancel: () => void;
    handleDelete?: () => void;
}

const Form = ({
    mode,
    todo,
    onSubmitHandler,
    handleCancel,
    handleDelete,
}: FormProps) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        const todoFormData: TodoFormData = {
            title: formData.title as string,
        };
        onSubmitHandler(todoFormData);

        $form.reset();
    };

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            id="task-adder"
            className="task-adder grid [&>*]:border [&>*]:p-2"
        >
            <label>
                <span className="sr-only">New Todo</span>
                <input
                    type="text"
                    name="title"
                    className="w-full border bg-transparent pl-1"
                    required
                    defaultValue={todo?.title ?? ''}
                    placeholder="What are you working on?"
                />
            </label>

            <div className="todo-options flex justify-between">
                {mode === 'editTodo' ? (
                    <button
                        type="button"
                        className="button"
                        data-type="naked"
                        onClick={handleDelete}
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
                    >
                        Cancel
                    </button>
                    <button type="submit" data-type="confirm">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export { Form };
