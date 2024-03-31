import { FormEvent } from 'react';

interface FormProps {
    mode: 'addTodo' | 'editTodo';
    onSubmit: (formData: { [k: string]: FormDataEntryValue }) => void;
}

const Form = ({ mode, onSubmit }: FormProps) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        onSubmit(formData);

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
                />
            </label>

            <div className="todo-options flex justify-between">
                {mode === 'editTodo' ? (
                    <button type="button" className="button" data-type="naked">
                        Delete
                    </button>
                ) : (
                    <div></div>
                )}

                <div className="flex">
                    <button type="button" className="button" data-type="naked">
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
