import { useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
    longBreakIntervalAtom,
    timerModeAtom,
    timerSettingsAtom,
} from '../lib';

import ringSound from '../assets/ring.mp3';

import {
    formattedTimes,
    getTimes,
    minutesToSeconds,
    workerTimer,
} from '../utils';
import { useTodos } from './useTodos';
import { TimerModeEnum, TimerStatusEnum } from '../types';

interface TimerActions {
    toggleTimer: () => void;
    resetTimer: () => void;
    changeTimerMode: (mode: TimerModeEnum) => void;
}

interface UseTimer {
    status: TimerStatusEnum;
    remainingTime: number;
    percentageToCompletion: number;
    timerMode: TimerModeEnum;
    actions: TimerActions;
}

const LONG_BREAK_INTERVAL_START_INDEX = 0;

const useTimer = (): UseTimer => {
    // global
    const timerSettings = useAtomValue(timerSettingsAtom);
    const userLongBreakInterval = useAtomValue(longBreakIntervalAtom);

    // useTimer states
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState(TimerStatusEnum.IDLE);
    const [timerMode, setTimerMode] = useAtom(timerModeAtom);
    const [longBreakInterval, setLongBreakInterval] = useState(
        LONG_BREAK_INTERVAL_START_INDEX
    );

    // Todo variables
    const { todos, selectedTodoId, todoActions } = useTodos();
    const currentTodo = useMemo(() => {
        return todoActions.find(selectedTodoId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTodoId]);

    // derived variables
    const initialTime = useMemo(() => {
        return minutesToSeconds(timerSettings[timerMode]);
    }, [timerSettings, timerMode]);
    const remainingTime = initialTime - timeElapsed;
    const percentageToCompletion = timeElapsed / initialTime;
    const targetInterval = userLongBreakInterval - 1;

    // Time variables
    const { minutes, seconds } = getTimes(remainingTime);
    const timeString = `${formattedTimes(minutes)}:${formattedTimes(seconds)}`;

    // update the document title
    useEffect(() => {
        const todoTitle = currentTodo ? currentTodo.title : 'Time to focus!';
        document.title = `${timeString} - ${todoTitle}`;
    }, [timeString, currentTodo]);

    // update the timer based on status and remaining
    useEffect(() => {
        const intervalId = workerTimer.setInterval(
            () => {
                if (remainingTime <= 1) {
                    // timesup play ding
                    playSound();
                    handleTimerEnd();
                    resetTimer();
                    return;
                }

                setTimeElapsed((timeElapsed) => timeElapsed + 1);
            },
            status === TimerStatusEnum.RUNNING ? 1000 : null
        );

        return () => workerTimer.clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, remainingTime]);

    function toggleTimer() {
        setStatus((status) => {
            if (status === TimerStatusEnum.RUNNING) {
                return TimerStatusEnum.IDLE;
            }
            return TimerStatusEnum.RUNNING;
        });
    }

    function resetTimer() {
        setStatus(TimerStatusEnum.IDLE);
        setTimeElapsed(0);
    }

    function changeTimerMode(mode: TimerModeEnum) {
        setTimerMode(mode);
        resetTimer();
    }

    function handleTimerEnd() {
        incrementTodoPomodoro();
        updateLongBreakInterval();
        toggleTimerMode();

        function incrementTodoPomodoro() {
            const todo = todos.find(
                (todoItem) => todoItem.id === selectedTodoId
            );

            if (todo) {
                if (timerMode === TimerModeEnum.POMODORO) {
                    todoActions.incrementPomodoro(selectedTodoId);
                }
            } else {
                throw new Error('Todo does not exist');
            }
        }

        function updateLongBreakInterval() {
            if (timerMode === TimerModeEnum.POMODORO) {
                setLongBreakInterval((prev) => prev + 1);
                return;
            }
        }

        function toggleTimerMode() {
            if (
                timerMode === TimerModeEnum.POMODORO &&
                longBreakInterval >= targetInterval
            ) {
                setTimerMode(TimerModeEnum.LONG_BREAK);
                resetLongBreakInterval();
                return;
            }

            if (
                timerMode === TimerModeEnum.SHORT_BREAK ||
                timerMode === TimerModeEnum.LONG_BREAK
            ) {
                setTimerMode(TimerModeEnum.POMODORO);
            } else {
                setTimerMode(TimerModeEnum.SHORT_BREAK);
            }

            function resetLongBreakInterval() {
                setLongBreakInterval(LONG_BREAK_INTERVAL_START_INDEX);
            }
        }
    }

    function playSound() {
        const ding = new Audio(ringSound);
        ding.play();
    }

    const actions: TimerActions = {
        toggleTimer,
        resetTimer,
        changeTimerMode,
    };

    return {
        remainingTime,
        percentageToCompletion,
        status,
        timerMode,
        actions,
    };
};

export { useTimer };
