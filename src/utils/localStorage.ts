import { TimerSettings, Todo } from '../types';
import { TimerModeEnum } from '../types';

const TODOS_KEY = 'todos';
const SELECTED_TODO_ID_KEY = 'selectedTodoId';
const TIMER_SETTINGS_KEY = 'timerSettings';
const LONG_BREAK_INTERVAL_KEY = 'longBreakInterval';

const DEFAULT_TIMER_SETTINGS = {
    [TimerModeEnum.POMODORO]: 25,
    [TimerModeEnum.SHORT_BREAK]: 5,
    [TimerModeEnum.LONG_BREAK]: 20,
};
const DEFAULT_LONG_BREAK_INTERVAL = 2;

const storage = {
    todos: {
        // fetch todos
        all() {
            const todos = localStorage.getItem(TODOS_KEY);

            return todos ? JSON.parse(todos) : [];
        },
        // update todos
        populate(value: Todo[]) {
            localStorage.setItem(TODOS_KEY, JSON.stringify(value));
        },
    },
    selectedTodoId: {
        // fetch selected todo id
        get() {
            return localStorage.getItem(SELECTED_TODO_ID_KEY) ?? '';
        },
        // update selected todo id
        set(value: string) {
            localStorage.setItem(SELECTED_TODO_ID_KEY, value);
        },
    },
    timerSettings: {
        // fetch settings
        all() {
            const timerSettings = localStorage.getItem(TIMER_SETTINGS_KEY);

            return timerSettings
                ? (JSON.parse(timerSettings) as TimerSettings)
                : DEFAULT_TIMER_SETTINGS;
        },
        // update settings
        populate(value: TimerSettings) {
            localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(value));
        },
    },
    longBreakInterval: {
        // get long break interval
        get(): number {
            const longBreakInterval = localStorage.getItem(
                LONG_BREAK_INTERVAL_KEY
            );

            return longBreakInterval
                ? Number.parseInt(longBreakInterval)
                : DEFAULT_LONG_BREAK_INTERVAL;
        },
        // set long break interval
        set(value: number) {
            localStorage.setItem(
                LONG_BREAK_INTERVAL_KEY,
                JSON.stringify(value)
            );
        },
    },
};

export { storage };
