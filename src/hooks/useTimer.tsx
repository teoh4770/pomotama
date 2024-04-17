import { useEffect, useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';
import { longBreakIntervalAtom, timerSettingsAtom } from '../lib';

import { useInterval } from './useInterval';
import { minutesToSeconds } from '../utils';
import { useTodos } from './useTodos';

enum TimerStatus {
    IDLE = 'idle',
    RUNNING = 'running',
}

enum TimerMode {
    POMODORO = 'pomodoroDuration',
    SHORT_BREAK = 'shortBreakDuration',
    LONG_BREAK = 'longBreakDuration',
}

interface TimerActions {
    toggleTimer: () => void;
    resetTimer: () => void;
    changeTimerMode: (mode: TimerMode) => void;
}

interface UseTimer {
    status: TimerStatus;
    remainingTime: number;
    percentageToCompletion: number;
    timerMode: TimerMode;
    actions: TimerActions;
}

const LONG_BREAK_INTERVAL_START_INDEX = 0;

const useTimer = (): UseTimer => {
    const timerSettings = useAtomValue(timerSettingsAtom);
    const userLongBreakInterval = useAtomValue(longBreakIntervalAtom);

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState(TimerStatus.IDLE);
    const [timerMode, setTimerMode] = useState(TimerMode.POMODORO);
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
        status === TimerStatus.RUNNING ? 1000 : null
    );

    //  Reset timer if todo changes and timer is running
    useEffect(() => {
        const isTimerRunningDuringPomodoro =
            status === TimerStatus.RUNNING && timerMode === TimerMode.POMODORO;

        if (isTimerRunningDuringPomodoro) {
            resetTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTodoId]);

    function toggleTimer() {
        setStatus((status) => {
            if (status === TimerStatus.RUNNING) {
                return TimerStatus.IDLE;
            }
            return TimerStatus.RUNNING;
        });
    }

    function resetTimer() {
        setStatus(TimerStatus.IDLE);
        setTimeElapsed(0);
    }

    function changeTimerMode(mode: TimerMode) {
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
            if (timerMode === TimerMode.POMODORO) {
                setLongBreakInterval((prev) => prev + 1);
                return;
            }
        }

        function toggleTimerMode() {
            if (
                timerMode === TimerMode.POMODORO &&
                longBreakInterval >= targetInterval
            ) {
                setTimerMode(TimerMode.LONG_BREAK);
                resetLongBreakInterval();
                return;
            }

            if (
                timerMode === TimerMode.SHORT_BREAK ||
                timerMode === TimerMode.LONG_BREAK
            ) {
                setTimerMode(TimerMode.POMODORO);
            } else {
                setTimerMode(TimerMode.SHORT_BREAK);
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
