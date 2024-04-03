// Data access layer
// retrieve the todos from localstorage
import { Todo } from '../types';

const LocalStorageKey = 'todos';

const fetchUserTodos = () => {
    return localStorage.getItem(LocalStorageKey);
};
const updateUserTodos = (value: Todo[]) => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(value));
};

export { fetchUserTodos, updateUserTodos };
