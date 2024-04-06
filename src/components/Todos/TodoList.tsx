import { useState } from 'react';

import { Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';
import { useTodos } from '../../hooks';

interface TodoListProps {
    todos: Todo[];
    todoActions: TodoActions;
}

const TodoList = ({ todos, todoActions }: TodoListProps) => {
    const [activeIndex, setActiveIndex] = useState('');
    const { selectedTodoId, setSelectedTodoId } = useTodos();

    return (
        <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    todoActions={todoActions}
                    isActive={activeIndex === todo.id}
                    isFocus={selectedTodoId === todo.id}
                    showTodo={() => setActiveIndex(todo.id)}
                    focusTodo={() => setSelectedTodoId(todo.id)}
                />
            ))}
        </ol>
    );
};

export { TodoList };
