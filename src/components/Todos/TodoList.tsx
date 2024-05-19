import { useAtomValue } from 'jotai';
import { useState } from 'react';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useTodos } from '../../hooks';
import { timerModeAtom } from '../../lib';

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

    function onDragEnd(result: any) {
        if (!result.destination) return;
        todoActions.reorder(result.source.index, result.destination.index);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, _) => (
                    <ol
                        id="todo-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="todo-list mb-3 mt-5 grid gap-2"
                    >
                        {todos.map((todo, index) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                index={index}
                                todoActions={todoActions}
                                isTodoActive={activeTodoId === todo.id}
                                onShow={() => setActiveTodoId(todo.id)}
                                isTodoSelected={selectedTodoId === todo.id}
                                onSelect={() => selectTodo(todo.id)}
                            />
                        ))}
                        {provided.placeholder}
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export { TodoList };
