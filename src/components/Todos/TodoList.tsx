import { useAtomValue } from 'jotai';
import { useState } from 'react';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useTodos } from '../../hooks';
import { timerModeAtom } from '../../lib';

import { TimerModeEnum, Todo, TodoActions } from '../../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    actions: TodoActions;
    timerCallback: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    actions,
    timerCallback,
}) => {
    const timerMode = useAtomValue(timerModeAtom);

    const { selectedTodoId, setSelectedTodoId } = useTodos();
    const [editingTodoId, setEditingTodoId] = useState('');

    // ? quite coupled
    function handleTodoClick(id: string) {
        if (id !== selectedTodoId) {
            if (timerMode === TimerModeEnum.POMODORO) {
                timerCallback();
            }
            setSelectedTodoId(id);
        }
    }

    // ? refactor
    function handleDragEnd(result: any) {
        if (result.destination) {
            actions.reorder(result.source.index, result.destination.index);
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, _) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid gap-2 mb-3 mt-5"
                        aria-label="Todo list"
                    >
                        {todos.map((todo, index) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                index={index}
                                actions={actions}
                                isEditing={editingTodoId === todo.id}
                                isSelected={selectedTodoId === todo.id}
                                onEditTodo={() => setEditingTodoId(todo.id)}
                                onClickTodo={() => handleTodoClick(todo.id)}
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
