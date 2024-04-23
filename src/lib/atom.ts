import { atom } from 'jotai';
import {
    fetchSelectedTodoIdFromStorage,
    fetchUserTodosFromStorage,
} from '../utils';
import { TimerModeEnum, TimerStatusEnum } from '../types';

// timer global variables
const timerSettingsAtom = atom({
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});
const longBreakIntervalAtom = atom(2);
const elapsedTimeAtom = atom(0);
const timerStatusAtom = atom(TimerStatusEnum.IDLE);
const timerModeAtom = atom(TimerModeEnum.POMODORO);
const isTimerRunningDuringPomodoroAtom = atom((get) => {
    const timerStatus = get(timerStatusAtom);
    const timerMode = get(timerModeAtom);

    return (
        timerStatus === TimerStatusEnum.RUNNING &&
        timerMode === TimerModeEnum.POMODORO
    );
});

// todos global variables
const todos = JSON.parse(fetchUserTodosFromStorage() ?? '[]');
const todosAtom = atom(todos);
const selectedTodoIdAtom = atom(fetchSelectedTodoIdFromStorage() ?? '');

export {
    timerSettingsAtom,
    longBreakIntervalAtom,
    elapsedTimeAtom,
    timerStatusAtom,
    timerModeAtom,
    isTimerRunningDuringPomodoroAtom,
    todosAtom,
    selectedTodoIdAtom,
};
