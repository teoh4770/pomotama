import { useEffect, useState } from 'react';

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

    useEffect(() => {
        if (todos.length == 1) {
            setSelectedTodoId(todos[0].id);
        }
    }, [todos, setSelectedTodoId]);

    function handleShowTodo(id: string) {
        return () => setActiveIndex(id);
    }

    function handleFocusTodo(id: string) {
        return () => setSelectedTodoId(id);
    }

    return (
        <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
            {todos?.length ? (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        todoActions={todoActions}
                        isActive={activeIndex === todo.id}
                        isFocus={selectedTodoId === todo.id}
                        showTodo={handleShowTodo(todo.id)}
                        focusTodo={handleFocusTodo(todo.id)}
                    />
                ))
            ) : (
                <p className="mb-5 text-center text-lg text-slate-300">
                    No tasks added yet 🥱
                </p>
            )}
        </ol>
    );
};

export { TodoList };
