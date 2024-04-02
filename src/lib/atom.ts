import { atom } from 'jotai';
import { getItemsFromLocalStorage } from '../localStorage';

interface TimerSettingOptions {
    [index: string]: number;
}

const timerSettingsAtom = atom<TimerSettingOptions>({
    pomodoroDuration: 60,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});

const activeTabAtom = atom('pomodoroDuration');
const activeTimeMode = activeTabAtom;

export interface Todo {
    title: string;
    completed: boolean;
    id: string;
}

const initialTodos: string = getItemsFromLocalStorage() ?? '[]';
const todosAtom = atom(JSON.parse(initialTodos));

export { timerSettingsAtom, activeTabAtom, activeTimeMode, todosAtom };
