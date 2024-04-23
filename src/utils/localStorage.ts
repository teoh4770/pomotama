import { Todo } from '../types';

const TodosKey = 'todos';
const SelectedTodoIdKey = 'selectedTodoId';

const fetchUserTodosFromStorage = () => {
    return localStorage.getItem(TodosKey);
};
const updateUserTodosFromStorage = (value: Todo[]) => {
    localStorage.setItem(TodosKey, JSON.stringify(value));
};

const fetchSelectedTodoIdFromStorage = () => {
    return localStorage.getItem(SelectedTodoIdKey);
};

const updateSelectedTodoIdFromStorage = (selectedTodoId: string) => {
    localStorage.setItem(SelectedTodoIdKey, selectedTodoId);
};

export {
    fetchUserTodosFromStorage,
    updateUserTodosFromStorage,
    fetchSelectedTodoIdFromStorage,
    updateSelectedTodoIdFromStorage,
};
