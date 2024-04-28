import { Todo } from '../types';
import { TimerModeEnum } from '../types';

interface TimerSettings {
    [TimerModeEnum.POMODORO]: number;
    [TimerModeEnum.SHORT_BREAK]: number;
    [TimerModeEnum.LONG_BREAK]: number;
}

const TODOS_KEY = 'todos';
const SELECTED_TODO_ID_KEY = 'selectedTodoId';
const TIMER_SETTINGS_KEY = 'timerSettings';
const LONG_BREAK_INTERVAL = 'longBreakInterval';

const fetchUserTodosFromStorage = () => {
    return localStorage.getItem(TODOS_KEY);
};
const updateUserTodosFromStorage = (value: Todo[]) => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(value));
};

const fetchSelectedTodoIdFromStorage = () => {
    return localStorage.getItem(SELECTED_TODO_ID_KEY);
};

const updateSelectedTodoIdFromStorage = (selectedTodoId: string) => {
    localStorage.setItem(SELECTED_TODO_ID_KEY, selectedTodoId);
};

const fetchTimerSettingsFromStorage = () => {
    return localStorage.getItem(TIMER_SETTINGS_KEY);
};

const updateTimerSettingsFromStorage = (value: TimerSettings) => {
    localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(value));
};

const fetchLongBreakIntervalFromStorage = () => {
    return localStorage.getItem(LONG_BREAK_INTERVAL);
};

const updateLongBreakIntervalFromStorage = (value: number) => {
    localStorage.setItem(LONG_BREAK_INTERVAL, String(value));
};

export {
    fetchUserTodosFromStorage,
    updateUserTodosFromStorage,
    fetchSelectedTodoIdFromStorage,
    updateSelectedTodoIdFromStorage,
    fetchTimerSettingsFromStorage,
    updateTimerSettingsFromStorage,
    fetchLongBreakIntervalFromStorage,
    updateLongBreakIntervalFromStorage,
};
