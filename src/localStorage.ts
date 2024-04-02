import { Todo } from './lib/atom';

// const initialTodos: string = localStorage['todos'] ?? '[]';
const LocalStorageKey = 'todos';

const getItemsFromLocalStorage = () => {
    return localStorage.getItem(LocalStorageKey);
};
const updateItemsInLocalStorage = (value: Todo[]) => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(value));
};

export { getItemsFromLocalStorage, updateItemsInLocalStorage };
