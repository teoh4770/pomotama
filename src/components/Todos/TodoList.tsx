import { useState } from 'react';
import { useAtomValue } from 'jotai';

import { timerModeAtom } from '../../lib';
import { useTodos } from '../../hooks';

import { TimerModeEnum, Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    todoActions: TodoActions;
    timerCallback: () => void;
}

const TodoList = ({ todos, todoActions, timerCallback }: TodoListProps) => {
    const timerMode = useAtomValue(timerModeAtom);

    const [activeTodoId, setActiveTodoId] = useState('');
    const { selectedTodoId, setSelectedTodoId } = useTodos();

    function selectTodo(todoId: string) {
        if (todoId === selectedTodoId) {
            return;
        }

        if (timerMode === TimerModeEnum.POMODORO) {
            timerCallback();
        }

        setSelectedTodoId(todoId);
    }

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
                    onSelect={() => selectTodo(todo.id)}
                />
            ))}
        </ol>
    );
};

export { TodoList };
