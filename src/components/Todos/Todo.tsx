/*
Note on styling
- there's like a lot of repetitive styling here and there
- maybe create a few custom properties to simplify those?
- maybe not because we have tailwind? (for quick prototype?)
- how to use tailwind to make consistent styling more easily?

- separate of concern?
*/
import { Todo } from '../../lib/atom';
import { useState } from 'react';
import { Form } from './Form';

export interface TodoFormData {
    title: string;
}

interface TodoProps {
    todo: Todo;
    toggleTodoState: (id: string) => void;
    editTodo: (id: string, formData: TodoFormData) => void;
    removeTodo: (id: string) => void;
}

const TodoItem = ({
    todo,
    toggleTodoState,
    editTodo,
    removeTodo,
}: TodoProps) => {
    const [editing, setEditing] = useState(false);

    const saveTodo = (todoFormData: TodoFormData) => {
        editTodo(todo.id, todoFormData);
        setEditing(false);
    };

    return (
        <li>
            {editing ? (
                // form
                <Form
                    mode="editTodo"
                    todo={todo}
                    handleTodo={saveTodo}
                    handleCancel={() => setEditing(false)}
                    handleDelete={() => removeTodo(todo.id)}
                />
            ) : (
                // todo item
                <div
                    id={todo.id}
                    className="todo-item flex items-center rounded-lg bg-white px-5 py-4"
                >
                    <div className='flex mr-auto'>
                      <label className="form-control">
                          <input
                              id={todo.id}
                              type="checkbox"
                              name="todo1"
                              checked={todo.completed}
                              onChange={() => toggleTodoState(todo.id)}
                          />
                          {todo.title}
                      </label>
                    </div>
                    <button
                        className="button border border-slate-300 !text-black/60"
                        data-type="secondary"
                        data-size="small"
                        onClick={() => setEditing(true)}
                    >
                        Options
                    </button>
                </div>
            )}
        </li>
    );
};

export { TodoItem };
