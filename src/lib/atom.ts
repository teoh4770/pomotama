import { atom } from 'jotai';
import { storage, addMinutesToTime } from '../utils';
import { TimerModeEnum, Todo } from '../types';

const { todos, selectedTodoId, timerSettings, longBreakInterval } = storage;

// Atoms
const todosAtom = atom(todos.all());
const selectedTodoIdAtom = atom(selectedTodoId.get());
const timerSettingsAtom = atom(timerSettings.all());
const timerModeAtom = atom(TimerModeEnum.POMODORO);
const longBreakIntervalAtom = atom(longBreakInterval.get());
const themeSettingsAtom = atom({
    darkMode: true,
});

// Derived Atoms

// Total number of target pomodoros for incomplete todos
const totalSessionsAtom = atom((get) => {
    const todos = get(todosAtom);
    const totalSessions = todos.reduce((accumulator: number, todo: Todo) => {
        return todo.completed ? accumulator : accumulator + todo.targetPomodoro;
    }, 0);

    return totalSessions;
});

// Total number of completed pomodoros
const completedSessionsAtom = atom((get) => {
    const todos = get(todosAtom);
    const completedSessions = todos.reduce(
        (accumulator: number, todo: Todo) => {
            return todo.completed
                ? accumulator
                : accumulator + todo.completedPomodoro;
        },
        0
    );

    return completedSessions;
});

// Total number of incomplete pomodoros
const incompleteSessionsAtom = atom((get) => {
    const todos = get(todosAtom);
    const incompleteSessionsTotal = todos.reduce(
        (accumulator: number, todo: Todo) => {
            const incompleteSessions = Math.max(
                todo.targetPomodoro - todo.completedPomodoro,
                0
            );

            return todo.completed
                ? accumulator
                : accumulator + incompleteSessions;
        },
        0
    );

    return incompleteSessionsTotal;
});

// Incomplete sessions for different timer modes
const incompleteSessionsDetailAtom = atom((get) => {
    const longbreakInterval = get(longBreakIntervalAtom);

    const incompleteSessions = get(incompleteSessionsAtom);
    const longBreakSessions = Math.floor(
        incompleteSessions / longbreakInterval
    );
    const shortBreakSessions = incompleteSessions - longBreakSessions;

    return {
        [TimerModeEnum.POMODORO]: incompleteSessions,
        [TimerModeEnum.SHORT_BREAK]: shortBreakSessions,
        [TimerModeEnum.LONG_BREAK]: longBreakSessions,
    };
});

// Calculate the total time (in minute and hour) based on incomplete sessions detail
const totalTimeRemainingAtom = atom((get) => {
    const timerSettings = get(timerSettingsAtom);
    const incompleteSessionsDetail = get(incompleteSessionsDetailAtom);

    // Calculate total time in minutes
    const totalMinutes = Object.keys(timerSettings).reduce((totalTime, key) => {
        const mode = key as unknown as TimerModeEnum;
        return totalTime + timerSettings[mode] * incompleteSessionsDetail[mode];
    }, 0);

    return {
        minutes: totalMinutes,
        hours: totalMinutes / 60,
    };
});

// Calculate finish time based on current time and total remaining minutes
const finishTimeAtom = atom((get) => {
    const date = new Date();
    const currentTime = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
    };

    const totalTimeInMinutes = get(totalTimeRemainingAtom).minutes;

    return addMinutesToTime(currentTime, totalTimeInMinutes);
});

export {
    timerSettingsAtom,
    longBreakIntervalAtom,
    timerModeAtom,
    todosAtom,
    incompleteSessionsAtom,
    completedSessionsAtom,
    totalSessionsAtom,
    incompleteSessionsDetailAtom,
    totalTimeRemainingAtom,
    finishTimeAtom,
    selectedTodoIdAtom,
    themeSettingsAtom,
};
