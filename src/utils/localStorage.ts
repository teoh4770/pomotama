import { Todo } from '../types';

const TodosKey = 'todos';
const SelectedTodoIdKey = 'selectedTodoId';

const fetchUserTodos = () => {
    return localStorage.getItem(TodosKey);
};
const updateUserTodos = (value: Todo[]) => {
    localStorage.setItem(TodosKey, JSON.stringify(value));
};

const fetchSelectedTodoId = () => {
    return localStorage.getItem(SelectedTodoIdKey);
};

const updateSelectedTodoId = (selectedTodoId: string) => {
    localStorage.setItem(SelectedTodoIdKey, selectedTodoId);
};

export {
    fetchUserTodos,
    updateUserTodos,
    fetchSelectedTodoId,
    updateSelectedTodoId,
};
