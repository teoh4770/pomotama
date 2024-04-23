import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { isTimerRunningDuringPomodoroAtom } from '../../lib';

import { useTodos } from '../../hooks';
import { Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    todoActions: TodoActions;
    timerCallback: () => void;
}

const TodoList = ({ todos, todoActions, timerCallback }: TodoListProps) => {
    const isTimerRunningDuringPomodoro = useAtomValue(
        isTimerRunningDuringPomodoroAtom
    );

    const [activeTodoId, setActiveTodoId] = useState('');

    const { selectedTodoId, setSelectedTodoId } = useTodos();

    function selectCallback(id: string) {
        if (isTimerRunningDuringPomodoro) {
            // stop the timer
            // check with user to see if they wanna reset the timer
            // if confirm then reset and go to the selectedTodo
            // otherwise, stay at the
            timerCallback();
        }

        setSelectedTodoId(id);
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
                    onSelect={() => selectCallback(todo.id)}
                />
            ))}
        </ol>
    );
};

export { TodoList };
