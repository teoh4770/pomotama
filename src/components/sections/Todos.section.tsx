import { useState } from 'react';
import { useTodos } from '../../hooks';

import { Form, TodoList } from '../Todos';
import { Header } from '../Header';

const Todos = () => {
    const { todos, todoActions } = useTodos();
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);

    function showAddTaskForm() {
        setOpenAddTaskForm(true);
    }

    function hideAddTaskForm() {
        setOpenAddTaskForm(false);
    }

    return (
        <section className="tasks-section mx-auto max-w-[30rem]">
            <Header headingLevel={2} title="Tasks" className="border-b-2 py-4">
                <button
                    className="button"
                    data-type="secondary"
                    data-size="small"
                >
                    Options
                </button>
            </Header>

            <TodoList todos={todos} todoActions={todoActions} />

            {openAddTaskForm ? (
                <Form
                    mode="addTodo"
                    onSave={todoActions.add}
                    onCancel={hideAddTaskForm}
                    onClose={hideAddTaskForm}
                />
            ) : (
                <button
                    className="w-full border-2 border-dashed bg-transparent p-4"
                    onClick={showAddTaskForm}
                >
                    Add Task
                </button>
            )}

            <button
                type="button"
                className="button"
                data-type="primary"
                onClick={todoActions.clearAll}
            >
                Clear All Tasks
            </button>
            <button
                type="button"
                className="button"
                data-type="primary"
                onClick={todoActions.clearCompleted}
            >
                Clear Finished Tasks
            </button>
        </section>
    );
};

export { Todos };
