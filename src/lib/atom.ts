import { atom } from 'jotai';
import {
    fetchLongBreakIntervalFromStorage,
    fetchSelectedTodoIdFromStorage,
    fetchTimerSettingsFromStorage,
    fetchUserTodosFromStorage,
    updatedTime,
} from '../utils';
import { TimerModeEnum, Todo } from '../types';

// Timer global variables
const defaultTimerSettings = {
    [TimerModeEnum.POMODORO]: 25,
    [TimerModeEnum.SHORT_BREAK]: 5,
    [TimerModeEnum.LONG_BREAK]: 20,
};
const timerSettingsAtom = atom(
    JSON.parse(
        fetchTimerSettingsFromStorage() ?? JSON.stringify(defaultTimerSettings)
    )
);

const defaultLongBreakInterval = '2';
const longBreakIntervalAtom = atom(
    Number.parseInt(
        fetchLongBreakIntervalFromStorage() ?? defaultLongBreakInterval
    )
);

const timerModeAtom = atom(TimerModeEnum.POMODORO);

// Todo global variables
const todosAtom = atom(JSON.parse(fetchUserTodosFromStorage() ?? '[]'));

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
        if (todo.completed) {
            return accumulator;
        }

        return accumulator + todo.targetPomodoro;
    }, 0);

    return totalSessions;
});

const unfininishedTodoSessionsAmountAtom = atom((get) => {
    const todos = get(todosAtom);
    const unfinishedTodoSessionsTotal = todos.reduce(
        (accumulator: number, todo: Todo) => {
            if (todo.completed) {
                return accumulator;
            }

            const unfinishedTodoSessions = Math.max(
                todo.targetPomodoro - todo.completedPomodoro,
                0
            );
            return accumulator + unfinishedTodoSessions;
        },
        0
    );

    return unfinishedTodoSessionsTotal;
});

const getUnfinishedSessionsForEachTimerModeAtom = atom((get) => {
    const unfinishedTodoTotal = get(unfininishedTodoSessionsAmountAtom);
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
    const unfinishedSessions = get(getUnfinishedSessionsForEachTimerModeAtom);
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
    unfininishedTodoSessionsAmountAtom,
    finishedSessionsAtom,
    getTotalSessionsAtom,
    getUnfinishedSessionsForEachTimerModeAtom,
    getTotalTimeInMinutesAtom,
    getUpdatedTimeAtom,
    selectedTodoIdAtom,
    themeSettingsAtom,
};
