import { Todo } from '../../lib/atom';

interface TodoProps {
    todo: Todo;
    toggleTodoState: (id: string) => void;
}

const TodoItem = ({ todo, toggleTodoState }: TodoProps) => {
    return (
        <li key={todo.id} className="flex items-center border p-2">
            <label className="mr-auto">
                <input
                    id={todo.id}
                    type="checkbox"
                    name="todo1"
                    checked={todo.completed}
                    onChange={() => toggleTodoState(todo.id)}
                />
                {todo.title}
            </label>
            <button className="button" data-type="secondary" data-size="small">
                Options
            </button>
        </li>
    );
};

export { TodoItem }
