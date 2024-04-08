import { atom } from 'jotai';
import { fetchSelectedTodoId, fetchUserTodos } from '../utils';

// timer global variables
const timerSettingsAtom = atom({
    pomodoroDuration: 60,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});

// todos global variables
const todos = JSON.parse(fetchUserTodos() ?? '[]');
const todosAtom = atom(todos);
const selectedTodoIdAtom = atom(fetchSelectedTodoId() ?? '');

export { timerSettingsAtom, todosAtom, selectedTodoIdAtom };
