import { useTodos } from '../../hooks';

import { Form } from '../Todos';
import { Header } from '../Todos';
import { TodoList } from '../Todos';

const Todos = () => {
    const { todos, todoActions } = useTodos();

    return (
        <section className="tasks-section mx-auto max-w-[30rem]">
            <Header />
            <TodoList todos={todos} todoActions={todoActions} />
            <Form
                mode="addTodo"
                onSave={todoActions.add}
                onCancel={() => console.log('cancel add todo')}
            />

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
