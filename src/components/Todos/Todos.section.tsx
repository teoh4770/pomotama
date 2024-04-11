import { useState } from 'react';
import { useTodos } from '../../hooks';

import { TodoForm, TodoList } from '.';
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
            <div className="mt-4">
                <div className="display-current-todo py-4 text-center text-white">
                    <p>#2</p>
                    <p className="text-lg">
                        Prepare for Microprocessor Midterm
                    </p>
                </div>
            </div>

            <Header
                headingLevel={2}
                title="Tasks"
                className="border-b-2 py-4"
            ></Header>

            <TodoList todos={todos} todoActions={todoActions} />

            {openAddTaskForm ? (
                <TodoForm
                    mode="addTodo"
                    onSave={todoActions.add}
                    onCancel={hideAddTaskForm}
                    onClose={hideAddTaskForm}
                />
            ) : (
                <button
                    className="w-full border-2 border-dashed bg-slate-700/50 p-4 font-bold text-white/80 hover:text-white"
                    onClick={showAddTaskForm}
                >
                    (icon)Add Task
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
