import { Tabs, Button } from '../ui';
import { Todo, TodoActions, TodosFilterEnum } from '../../types';

interface TodoFilterActionsProps {
    todos: Todo[];
    actions: TodoActions;
    setType: (filter: TodosFilterEnum) => void;
}

const TodoFilterActions: React.FC<TodoFilterActionsProps> = ({
    todos,
    actions,
    setType,
}) => {
    const hasCompletedTodos = todos.some((todo) => todo.completed);
    const hasPomodoroCount = todos.some((todo) => todo.completedPomodoro > 0);

    return (
        <section className="grid gap-2 mt-4" aria-label="Todos filter controls">
            {/* Filter tabs */}
            <div className="flex">
                <span className="min-w-[3.125rem] translate-y-[3.5px] mr-1  text-sm text-white">
                    Filters:
                </span>

                <Tabs
                    tabListClassName="flex flex-wrap gap-1"
                    defaultValue={TodosFilterEnum.ALL}
                    tabs={[
                        {
                            name: TodosFilterEnum.ALL,
                            label: 'Show All',
                            value: TodosFilterEnum.ALL,
                            ariaLabel: 'Show all tasks button',
                            handleClick: () => setType(TodosFilterEnum.ALL),
                        },
                        {
                            name: TodosFilterEnum.ACTIVE,
                            label: 'Show Active',
                            value: TodosFilterEnum.ACTIVE,
                            ariaLabel: 'Show all active tasks button',
                            handleClick: () => setType(TodosFilterEnum.ACTIVE),
                        },
                        {
                            name: TodosFilterEnum.COMPLETED,
                            label: 'Show Completed',
                            value: TodosFilterEnum.COMPLETED,
                            ariaLabel: 'Show all completed tasks button',
                            handleClick: () =>
                                setType(TodosFilterEnum.COMPLETED),
                        },
                    ]}
                />
            </div>

            {/* Actions */}
            <div className="flex">
                <span className="mr-2 max-w-[3.125rem] translate-y-[3.5px] text-sm text-white">
                    Actions:
                </span>

                <div className="flex flex-wrap gap-1">
                    <Button
                        intent="secondary"
                        size="small"
                        type="button"
                        aria-label="Clear all tasks button"
                        onClick={actions.clearAll}
                    >
                        Clear All
                    </Button>

                    {(hasPomodoroCount || hasCompletedTodos) && (
                        <Button
                            intent="secondary"
                            size="small"
                            type="button"
                            aria-label="Reset all tasks button"
                            onClick={actions.restart}
                        >
                            Reset All
                        </Button>
                    )}

                    {hasCompletedTodos && (
                        <Button
                            intent="secondary"
                            size="small"
                            type="button"
                            aria-label="Clear completed tasks button"
                            onClick={actions.clearCompleted}
                        >
                            Clear Completed
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export { TodoFilterActions };
