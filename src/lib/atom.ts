import { atom } from 'jotai';
import { fetchUserTodos } from '../utils';

// timer global variables
const timerSettingsAtom = atom({
    pomodoroDuration: 60,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});

// todos global variables
const todosAtom = atom(JSON.parse(fetchUserTodos() ?? '[]'));
const selectedTodoIdAtom = atom('');

export { timerSettingsAtom, todosAtom, selectedTodoIdAtom };
