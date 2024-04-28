import { atom } from 'jotai';
import {
    fetchSelectedTodoIdFromStorage,
    fetchUserTodosFromStorage,
    updatedTime,
} from '../utils';
import { TimerModeEnum, Todo } from '../types';

// timer global variables
const timerSettingsAtom = atom({
    [TimerModeEnum.POMODORO]: 25,
    [TimerModeEnum.SHORT_BREAK]: 5,
    [TimerModeEnum.LONG_BREAK]: 20,
});
const longBreakIntervalAtom = atom(2);
const timerModeAtom = atom(TimerModeEnum.POMODORO);

// todos global variables
const todosAtom = atom(JSON.parse(fetchUserTodosFromStorage() ?? '[]'));

const unfininishedTodoTotalAmountAtom = atom((get) => {
    const todos = get(todosAtom);
    const unfinishedTodoTotal = todos.reduce(
        (accumulator: number, todo: Todo) => {
            const unfinishedTodoOfTodo = Math.max(
                todo.targetPomodoro - todo.completedPomodoro,
                0
            );
            return accumulator + unfinishedTodoOfTodo;
        },
        0
    );

    return unfinishedTodoTotal;
});

const finishedSessionsAtom = atom((get) => {
    const todos = get(todosAtom);
    const finishedSessions = todos.reduce((accumulator: number, todo: Todo) => {
        return accumulator + todo.completedPomodoro;
    }, 0);

    return finishedSessions;
});

const getTotalSessionsAtom = atom((get) => {
    const todos = get(todosAtom);
    const totalSessions = todos.reduce((accumulator: number, todo: Todo) => {
        return accumulator + todo.targetPomodoro;
    }, 0);

    return totalSessions;
});

const getUnfinishedSessionsAtom = atom((get) => {
    const unfinishedTodoTotal = get(unfininishedTodoTotalAmountAtom);
    const longbreakInterval = get(longBreakIntervalAtom);

    const pomodoroSessions = unfinishedTodoTotal;
    const longBreakSessions = Math.floor(
        unfinishedTodoTotal / longbreakInterval
    );
    const shortBreakSessions = pomodoroSessions - longBreakSessions;

    return {
        [TimerModeEnum.POMODORO]: pomodoroSessions,
        [TimerModeEnum.SHORT_BREAK]: shortBreakSessions,
        [TimerModeEnum.LONG_BREAK]: longBreakSessions,
    };
});

const getTotalTimeInMinutesAtom = atom((get) => {
    const timerSettings = get(timerSettingsAtom);
    const unfinishedSessions = get(getUnfinishedSessionsAtom);
    const timerModeKeys = Object.keys(timerSettings) as TimerModeEnum[];
    let totalTime = 0;

    timerModeKeys.forEach((timerMode) => {
        totalTime += timerSettings[timerMode] * unfinishedSessions[timerMode];
    });

    return totalTime;
});

const getUpdatedTimeAtom = atom((get) => {
    const totalTimeInMinutes = get(getTotalTimeInMinutesAtom);
    const date = new Date();
    const time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
    };

    return updatedTime(time, totalTimeInMinutes);
});

const selectedTodoIdAtom = atom(fetchSelectedTodoIdFromStorage() ?? '');

// Theme settings
const themeSettingsAtom = atom({
    darkModeWhenRunning: true,
});

export {
    timerSettingsAtom,
    longBreakIntervalAtom,
    timerModeAtom,
    todosAtom,
    unfininishedTodoTotalAmountAtom,
    finishedSessionsAtom,
    getTotalSessionsAtom,
    getUnfinishedSessionsAtom,
    getTotalTimeInMinutesAtom,
    getUpdatedTimeAtom,
    selectedTodoIdAtom,
    themeSettingsAtom
};
