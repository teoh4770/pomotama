import { useEffect, useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';
import { longBreakIntervalAtom, timerSettingsAtom } from '../lib';

import { useInterval } from './useInterval';
import { minutesToSeconds } from '../utils';
import { useTodos } from './useTodos';

type Status = 'idle' | 'running';

enum StatusEnum {
    Idle = 'idle',
    Running = 'running',
}

type TimerMode =
    | 'pomodoroDuration'
    | 'shortBreakDuration'
    | 'longBreakDuration';

interface TimerActions {
    toggleTimer: () => void;
    resetTimer: () => void;
    changeTimerMode: (name: TimerMode) => void;
}

interface UseTimer {
    status: Status;
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
    const [status, setStatus] = useState<Status>(StatusEnum.Idle);
    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoroDuration');
    const [longBreakInterval, setLongBreakInterval] = useState(
        LONG_BREAK_INTERVAL_START_INDEX
    );

    const { todos, selectedTodoId, todoActions } = useTodos();

    // calculated variables
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
        status === StatusEnum.Running ? 1000 : null
    );

    //  Reset timer if todo changes and timer is running
    useEffect(() => {
        const isTimerRunningDuringPomodoro =
            status === StatusEnum.Running && timerMode === 'pomodoroDuration';

        if (isTimerRunningDuringPomodoro) {
            resetTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTodoId]);

    function toggleTimer() {
        setStatus((status) => {
            if (status === StatusEnum.Running) {
                return StatusEnum.Idle;
            }
            return StatusEnum.Running;
        });
    }

    function resetTimer() {
        setStatus(StatusEnum.Running);
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
