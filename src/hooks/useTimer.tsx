import { useEffect, useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';
import { longBreakIntervalAtom, timerSettingsAtom } from '../lib';

import { useInterval } from './useInterval';
import { minutesToSeconds } from '../utils';
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
    const timerSettings = useAtomValue(timerSettingsAtom);
    const userLongBreakInterval = useAtomValue(longBreakIntervalAtom);

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState(TimerStatusEnum.IDLE);
    const [timerMode, setTimerMode] = useState(TimerModeEnum.POMODORO);
    const [longBreakInterval, setLongBreakInterval] = useState(
        LONG_BREAK_INTERVAL_START_INDEX
    );

    const { todos, selectedTodoId, todoActions } = useTodos();

    const initialTime = useMemo(() => {
        return minutesToSeconds(timerSettings[timerMode]);
    }, [timerSettings, timerMode]);
    const remainingTime = initialTime - timeElapsed;
    const percentageToCompletion = timeElapsed / initialTime;
    const targetInterval = userLongBreakInterval - 1;

    // runs the timer once status is set to "running"
    useInterval(
        () => {
            if (remainingTime <= 0) {
                handleTimerEnd();
                resetTimer();
                return;
            }

            setTimeElapsed((timeElapsed) => timeElapsed + 1);
        },
        status === TimerStatusEnum.RUNNING ? 1000 : null
    );

    //  Reset timer if todo changes and timer is running
    useEffect(() => {
        const isTimerRunningDuringPomodoro =
            status === TimerStatusEnum.RUNNING &&
            timerMode === TimerModeEnum.POMODORO;

        if (isTimerRunningDuringPomodoro) {
            resetTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTodoId]);

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
                todoActions.incrementPomodoro(selectedTodoId);
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
