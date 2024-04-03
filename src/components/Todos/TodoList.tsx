import { Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    todoActions: TodoActions;
}

const TodoList = ({ todos, todoActions }: TodoListProps) => {
    return (
        <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} todoActions={todoActions} />
            ))}
        </ol>
    );
};

export { TodoList };
