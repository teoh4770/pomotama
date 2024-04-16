import { atom } from 'jotai';
import { fetchSelectedTodoId, fetchUserTodos } from '../utils';

// timer global variables
const timerSettingsAtom = atom({
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});
const longBreakIntervalAtom = atom(2);

// todos global variables
const todos = JSON.parse(fetchUserTodos() ?? '[]');
const todosAtom = atom(todos);
const selectedTodoIdAtom = atom(fetchSelectedTodoId() ?? '');

export {
    timerSettingsAtom,
    longBreakIntervalAtom,
    todosAtom,
    selectedTodoIdAtom,
};
