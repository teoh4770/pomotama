import { atom } from 'jotai';
import {
    fetchSelectedTodoIdFromStorage,
    fetchUserTodosFromStorage,
} from '../utils';
import { TimerModeEnum } from '../types';

// timer global variables
const timerSettingsAtom = atom({
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});
const longBreakIntervalAtom = atom(2);
const timerModeAtom = atom(TimerModeEnum.POMODORO);

// todos global variables
const todosAtom = atom(JSON.parse(fetchUserTodosFromStorage() ?? '[]'));
const selectedTodoIdAtom = atom(fetchSelectedTodoIdFromStorage() ?? '');

export {
    timerSettingsAtom,
    longBreakIntervalAtom,
    timerModeAtom,
    todosAtom,
    selectedTodoIdAtom,
};
