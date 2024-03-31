import { atom } from 'jotai';

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

interface Todo {
    title: string;
    completed: boolean;
    id: string;
}

// initiate a global todo variable
const initialTodos: string = localStorage['todos'] ?? '[]';
const Todos = atom<Todo[]>(JSON.parse(initialTodos));

export { timerSettingsAtom, activeTabAtom, activeTimeMode, Todos };
