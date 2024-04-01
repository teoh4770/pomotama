import { Todo } from '../../lib/atom';
import { TodoFormData, TodoItem } from './Todo';

interface TodoFunctions {
    editTodo: (id: string, formData: TodoFormData) => void;
    removeTodo: (id: string) => void;
    toggleTodoState: (id: string) => void;
}

interface TodoListProps {
    todos: Todo[];
    todoFunctions: TodoFunctions;
}

const TodoList = ({ todos, todoFunctions }: TodoListProps) => {
    return (
        <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodoState={todoFunctions.toggleTodoState}
                    editTodo={todoFunctions.editTodo}
                    removeTodo={todoFunctions.removeTodo}
                />
            ))}
        </ol>
    );
};

export { TodoList };
