import { useState } from 'react';
import { useTodos } from '../../hooks';

import { Todo } from '../../types';

import { TodoForm, TodoList } from '.';

const Todos = () => {
    const { todos, selectedTodoId, todoActions } = useTodos();
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);

    const selectedTodo = todos.find(
        (todo) => todo.id === selectedTodoId
    ) as Todo;

    function showAddTaskForm() {
        setOpenAddTaskForm(true);
    }

    function hideAddTaskForm() {
        setOpenAddTaskForm(false);
    }

    function handleClearAll() {
        todoActions.clearAll();
    }

    function handleClearCompleted() {
        todoActions.clearCompleted();
    }

    return (
        <section className="tasks-section mx-auto max-w-[30rem]">
            <div className="mt-4">
                <div className="current-todo-message py-4 text-center text-white">
                    {selectedTodo ? (
                        <>
                            <p className="text-slate-300">
                                Current focusing on
                            </p>
                            <p className="text-lg">{selectedTodo.title}</p>
                        </>
                    ) : (
                        <p className="text-lg text-slate-300">
                            You currently have no tasks 🥱
                        </p>
                    )}
                </div>
            </div>

            <header className="flex justify-between border-b-2 py-4">
                <h2 className="text-lg font-bold text-white">Tasks</h2>
            </header>

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
                    className="add-task-button w-full border-2 border-dashed bg-slate-700/50 p-4 font-bold text-white/80 hover:text-white"
                    onClick={showAddTaskForm}
                >
                    ⭐ Add Task
                </button>
            )}

            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    className="button"
                    data-type="primary"
                    onClick={handleClearAll}
                >
                    Clear All Tasks
                </button>
                <button
                    type="button"
                    className="button"
                    data-type="primary"
                    onClick={handleClearCompleted}
                >
                    Clear Finished Tasks
                </button>
            </div>
        </section>
    );
};

export { Todos };
