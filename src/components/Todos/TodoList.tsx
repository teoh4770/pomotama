import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { isTimerRunningDuringPomodoroAtom } from '../../lib';

import { useTodos } from '../../hooks';
import { Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    todoActions: TodoActions;
}

const TodoList = ({ todos, todoActions }: TodoListProps) => {
    const [activeTodoId, setActiveTodoId] = useState('');
    const { selectedTodoId, setSelectedTodoId } = useTodos();

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
