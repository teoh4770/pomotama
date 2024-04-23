import { useEffect, useState } from 'react';

import { Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';
import { useTodos } from '../../hooks';

interface TodoListProps {
    todos: Todo[];
    todoActions: TodoActions;
}

const TodoList = ({ todos, todoActions }: TodoListProps) => {
    const [activeTodoId, setActiveTodoId] = useState('');
    const { selectedTodoId, setSelectedTodoId } = useTodos();

    // todo: include this logic here after fixing the useEffect in timer
    // since setSelectedTodoId is coupled with the timer component right now(due to useEffect dependency array), any change on the selectedTodoId would update the timer as well, which I don't want, so fixing the useEffect first before implementing this
    // if (todos.length === 1) {
    //     setSelectedTodoId(todos[0].id);
    // }

    return (
        <ol id="todo-list" className="todo-list mb-3 mt-5 grid gap-2">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    todoActions={todoActions}
                    isTodoActive={activeTodoId === todo.id}
                    onShow={() => setActiveTodoId(todo.id)}
                    isTodoSelected={selectedTodoId === todo.id}
                    onSelect={() => setSelectedTodoId(todo.id)}
                />
            ))}
        </ol>
    );
};

export { TodoList };
