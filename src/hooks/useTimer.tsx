import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { longBreakIntervalAtom, timerSettingsAtom } from '../lib';

import { useInterval } from './useInterval';
import { minutesToSeconds } from '../utils';
import { useTodos } from './useTodos';

type Status = 'idle' | 'running';

type TimerMode =
    | 'pomodoroDuration'
    | 'shortBreakDuration'
    | 'longBreakDuration';

interface TimerActions {
    toggle: () => void;
    reset: () => void;
    changeTimerMode: (name: TimerMode) => void;
}

interface UseTimer {
    status: Status;
    remainingTime: number;
    percentageToCompletion: number;
    timerMode: TimerMode;
    actions: TimerActions;
}

// global variable
const LONG_BREAK_INTERVAL_START_INDEX = 0;

const useTimer = (): UseTimer => {
    const timerSettings = useAtomValue(timerSettingsAtom);
    const userLongBreakInterval = useAtomValue(longBreakIntervalAtom);

    // timer
    const [initialTime, setInitialTime] = useState(
        minutesToSeconds(timerSettings['pomodoroDuration'])
    );
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState<Status>('idle');

    // timerMode
    const [longBreakInterval, setLongBreakInterval] = useState(
        LONG_BREAK_INTERVAL_START_INDEX
    );
    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoroDuration');

    // external
    const { todos, selectedTodoId, todoActions } = useTodos();

    // calculated variables
    const remainingTime = initialTime - timeElapsed;
    const percentageToCompletion = timeElapsed / initialTime;
    const targetInterval = userLongBreakInterval - 1;

    // runs the timer once status is set to "running"
    useInterval(
        () => {
            if (remainingTime <= 0) {
                timerEndHandler();
                reset();
                return;
            }

            setTimeElapsed((timeElapsed) => timeElapsed + 1);
        },
        status === 'running' ? 1000 : null
    );

    // reset the initial value whenever timer setting or timer mode change
    useEffect(() => {
        setTimer();

        function setTimer() {
            const time = minutesToSeconds(timerSettings[timerMode]);
            setInitialTime(time);
        }
    }, [timerMode, timerSettings]);

    function timerEndHandler() {
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
            if (timerMode === 'pomodoroDuration') {
                setLongBreakInterval((prev) => prev + 1);
                return;
            }
        }

        function toggleTimerMode() {
            if (
                timerMode === 'pomodoroDuration' &&
                longBreakInterval >= targetInterval
            ) {
                setTimerMode('longBreakDuration');
                resetLongBreakInterval();
                return;
            }

            if (
                timerMode === 'shortBreakDuration' ||
                timerMode === 'longBreakDuration'
            ) {
                setTimerMode('pomodoroDuration');
            } else {
                setTimerMode('shortBreakDuration');
            }

            function resetLongBreakInterval() {
                setLongBreakInterval(LONG_BREAK_INTERVAL_START_INDEX);
            }
        }
    }

    function toggle() {
        setStatus((status) => {
            if (status === 'running') {
                return 'idle';
            }
            return 'running';
        });
    }

    function reset() {
        setStatus('idle');
        setTimeElapsed(0);
    }

    function changeTimerMode(mode: TimerMode) {
        setTimerMode(mode);
        reset();
    }

    const actions: TimerActions = {
        toggle,
        reset,
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
