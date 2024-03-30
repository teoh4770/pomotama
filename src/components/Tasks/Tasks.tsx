const Tasks = () => {
    return (
        <section className="tasks-section">
            <header className="tasks-section__header flex items-center justify-between border py-4">
                <h2 className="font-semibold text-white">Tasks</h2>
                <button
                    className="button"
                    data-type="secondary"
                    data-size="small"
                >
                    Options
                </button>
            </header>
            <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
                <li
                    id="something-unique"
                    className="flex items-center border p-2"
                >
                    <label className="mr-auto">
                        <input type="checkbox" name="todo1" />
                        Prepare for Microprocessor
                    </label>
                    <button
                        className="button"
                        data-type="secondary"
                        data-size="small"
                    >
                        Options
                    </button>
                </li>
                <li
                    id="something-unique"
                    className="flex items-center border p-2"
                >
                    <label className="mr-auto">
                        <input type="checkbox" name="todo1" />
                        Prepare for Microprocessor
                    </label>
                    <button
                        className="button"
                        data-type="secondary"
                        data-size="small"
                    >
                        Options
                    </button>
                </li>
                <li
                    id="something-unique"
                    className="flex items-center border p-2"
                >
                    <label className="mr-auto">
                        <input type="checkbox" name="todo1" />
                        Prepare for Microprocessor
                    </label>
                    <button
                        className="button"
                        data-type="secondary"
                        data-size="small"
                    >
                        Options
                    </button>
                </li>
            </ol>
            <button
                className="w-full border p-4 text-center"
                id="add-task-button"
            >
                Add Task
            </button>
        </section>
    );
};

export { Tasks };
