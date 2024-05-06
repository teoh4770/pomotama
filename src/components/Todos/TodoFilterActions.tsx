import { Tabs, Button } from '../ui';
import { Todo, TodoActions, TodosFilterEnum } from '../../types';

interface TodoFilterActionsProps {
    todos: Todo[];
    todoActions: TodoActions;
    setFilterType: (filter: TodosFilterEnum) => void;
}

const TodoFilterActions = ({
    todos,
    todoActions,
    setFilterType,
}: TodoFilterActionsProps) => {
    const hasCompletedTodo = todos.find((todo) => todo.completed) !== undefined;

    return (
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
                            ariaLabel: 'Show all completed tasks button',
                            handleClick: () =>
                                setFilterType(TodosFilterEnum.COMPLETED),
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
    );
};

export { TodoFilterActions };
