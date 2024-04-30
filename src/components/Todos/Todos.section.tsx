import { useMemo, useState } from 'react';
import { useTodos } from '../../hooks';

import { TodoForm, TodoList } from '.';
import { Button, Tabs } from '../ui';
import { TodosFilterEnum } from '../../types';

interface TodosProps {
    timerCallback: () => void;
}

const Todos = ({ timerCallback }: TodosProps) => {
    const { todos, selectedTodoId, todoActions } = useTodos();
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);
    const [filterType, setFilterType] = useState<TodosFilterEnum>(
        TodosFilterEnum.ALL
    );

    const hasCompletedTodo = todos.find((todo) => todo.completed) !== undefined;
    const selectedTodo = todoActions.find(selectedTodoId);
    const filteredTodos = useMemo(() => {
        return {
            [TodosFilterEnum.ALL]: todos,
            [TodosFilterEnum.ACTIVE]: todos.filter((todo) => !todo.completed),
            [TodosFilterEnum.COMPLETED]: todos.filter((todo) => todo.completed),
        };
    }, [todos]);

    function showAddTaskForm() {
        setOpenAddTaskForm(true);
    }

    function hideAddTaskForm() {
        setOpenAddTaskForm(false);
    }

    return (
        <section id="tasks" className="tasks-section mx-auto max-w-[30rem]">
            <div className="mt-4">
                <div className="current-todo-message visible py-4 text-center">
                    {selectedTodo ? (
                        <>
                            <p className="text-slate-300">
                                Currently focusing on:
                                <br />
                                <b className="text-lg text-white">
                                    {selectedTodo.title}
                                </b>
                            </p>
                        </>
                    ) : (
                        <p className="text-lg text-slate-300">
                            {todos.length > 0
                                ? "You didn't select any tasks 🥱"
                                : "You don't have any todos 🥱"}
                        </p>
                    )}
                </div>
            </div>

            {/* header of todo list */}
            <header className="flex justify-between border-b-2 py-4">
                <h2 className="text-lg font-bold text-white">Tasks</h2>
            </header>

            {/* action buttons for todo list */}
            {todos.length > 0 && (
                <section
                    role="region"
                    aria-label="Todos controls"
                    className="mt-4 grid gap-2"
                >
                    <div className="filters flex">
                        <span className="mr-2 min-w-[3.125rem] translate-y-[3.5px] text-sm text-white">
                            Filters:
                        </span>

                        <Tabs
                            tabListClassName="flex flex-wrap gap-1"
                            defaultValue={TodosFilterEnum.ALL}
                            items={[
                                {
                                    name: TodosFilterEnum.ALL,
                                    label: 'Show All',
                                    value: TodosFilterEnum.ALL,
                                    ariaLabel: 'Show all tasks button',
                                    handleClick: () =>
                                        setFilterType(TodosFilterEnum.ALL),
                                },
                                {
                                    name: TodosFilterEnum.ACTIVE,
                                    label: 'Show Active',
                                    value: TodosFilterEnum.ACTIVE,
                                    ariaLabel: 'Show all active tasks button',
                                    handleClick: () =>
                                        setFilterType(TodosFilterEnum.ACTIVE),
                                },
                                {
                                    name: TodosFilterEnum.COMPLETED,
                                    label: 'Show Completed',
                                    value: TodosFilterEnum.COMPLETED,
                                    ariaLabel:
                                        'Show all completed tasks button',
                                    handleClick: () =>
                                        setFilterType(
                                            TodosFilterEnum.COMPLETED
                                        ),
                                },
                            ]}
                        />
                    </div>

                    <div className="actions flex">
                        <span className="mr-2 max-w-[3.125rem] translate-y-[3.5px] text-sm text-white">
                            Actions:
                        </span>

                        <div className="flex flex-wrap gap-1">
                            <Button
                                className=""
                                intent="secondary"
                                size="small"
                                type="button"
                                aria-label="Clear all tasks button"
                                onClick={() => todoActions.clearAll()}
                            >
                                Clear All
                            </Button>

                            {hasCompletedTodo && (
                                <Button
                                    className=""
                                    intent="secondary"
                                    size="small"
                                    type="button"
                                    aria-label="Clear all completed tasks button"
                                    onClick={() => todoActions.clearCompleted()}
                                >
                                    Clear Completed
                                </Button>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <TodoList
                todos={filteredTodos[filterType]}
                todoActions={todoActions}
                timerCallback={timerCallback}
            />

            {/* Add task button */}
            {openAddTaskForm ? (
                <TodoForm
                    mode="addTodo"
                    onSave={todoActions.add}
                    onCancel={hideAddTaskForm}
                    onClose={hideAddTaskForm}
                />
            ) : (
                <Button
                    intent="secondary"
                    size="medium"
                    type="button"
                    className="w-full border-2 border-dashed bg-black/10 py-4 font-bold text-white/80 hover:text-white"
                    aria-label="Add task button"
                    onClick={showAddTaskForm}
                >
                    <span className="mx-auto">⭐ Add Task</span>
                </Button>
            )}
        </section>
    );
};

export { Todos };
