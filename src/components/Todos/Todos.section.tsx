import { useMemo, useState } from 'react';
import { useTodos } from '../../hooks';

import { TodoForm, TodoList, TodoFilterActions } from '.';
import { Button } from '../ui';
import { TodoFormMode, TodosFilterEnum } from '../../types';

interface TodosProps {
    timerCallback: () => void;
}

const Todos: React.FC<TodosProps> = ({ timerCallback }) => {
    const { todos, selectedTodo, actions } = useTodos();

    const [isTodoFormVisible, setTodoFormVisible] = useState(false);
    const [type, setType] = useState<TodosFilterEnum>(TodosFilterEnum.ALL);

    const filteredTodos = useMemo(() => {
        return {
            [TodosFilterEnum.ALL]: todos,
            [TodosFilterEnum.ACTIVE]: todos.filter((todo) => !todo.completed),
            [TodosFilterEnum.COMPLETED]: todos.filter((todo) => todo.completed),
        };
    }, [todos]);

    const selectedTodoMessage = selectedTodo ? (
        <p className="text-slate-300">
            Currently focusing on:
            <br />
            <b className="text-lg text-white">{selectedTodo.title}</b>
        </p>
    ) : (
        <p className="text-lg text-slate-300">
            {todos.length > 0
                ? "You didn't select any tasks 🥱"
                : "You don't have any tasks 😭"}
        </p>
    );

    return (
        <section
            id="driver-1"
            className="max-w-[30rem] mx-auto"
            aria-label="Todos section"
        >
            <div className="py-4 mt-4 text-center visible">
                {selectedTodoMessage}
            </div>

            <header className="flex justify-between py-4 border-b-2">
                <h2 className="text-lg font-bold text-white">Tasks</h2>
            </header>

            {/* Action buttons for todo list */}
            {todos.length > 0 && (
                <TodoFilterActions
                    todos={todos}
                    actions={actions}
                    setType={setType}
                />
            )}

            {/* Todo list */}
            <TodoList
                todos={filteredTodos[type]}
                actions={actions}
                timerCallback={timerCallback}
            />

            {/* Todo form */}
            {isTodoFormVisible && (
                <TodoForm
                    mode={TodoFormMode.ADD_TODO}
                    onAddTodo={actions.add}
                    onClose={() => setTodoFormVisible(false)}
                />
            )}

            {/* Toggle button for todo form */}
            {!isTodoFormVisible && (
                <Button
                    intent="secondary"
                    size="medium"
                    type="button"
                    className="w-full py-4 bg-black/10 font-bold text-white/80 border-2 border-dashed hover:text-white"
                    aria-label="Show todo form button"
                    onClick={() => setTodoFormVisible(true)}
                >
                    <span className="mx-auto">⭐ Add Task</span>
                </Button>
            )}
        </section>
    );
};

export { Todos };
