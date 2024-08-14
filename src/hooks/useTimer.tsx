import { useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
    longBreakIntervalAtom,
    themeSettingsAtom,
    timerModeAtom,
    timerSettingsAtom,
} from '../lib';
import ringSound from '../assets/ring.mp3';
import {
    formatTime,
    getTimes,
    minutesToSeconds,
    playSound,
    updateLongBreakIntervalFromStorage,
    updateTimerSettingsFromStorage,
    workerTimer,
} from '../utils';
import { useTodos } from './useTodos';
import { TimerModeEnum, TimerStatusEnum } from '../types';
import { useThemeMode } from './useThemeMode';

interface TimerActions {
    toggleTimer: () => void;
    resetTimer: () => void;
    changeTimerMode: (mode: TimerModeEnum) => void;
}

export interface UseTimer {
    status: TimerStatusEnum;
    remainingTime: number;
    percentageToCompletion: number;
    currentTimerMode: TimerModeEnum;
    actions: TimerActions;
}

// constant...
const NEXT_TIMER_MODE = {
    [TimerModeEnum.POMODORO]: TimerModeEnum.SHORT_BREAK,
    [TimerModeEnum.SHORT_BREAK]: TimerModeEnum.POMODORO,
    [TimerModeEnum.LONG_BREAK]: TimerModeEnum.POMODORO,
};

// Encapsulates logic for managing long break interval count
const useLongBreakIntervalCount = (initialValue: number = 0) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        increment: () => setValue((prev) => prev + 1),
        reset: () => setValue(initialValue),
    };
};

const useTimer = (): UseTimer => {
    // Jotai states
    const isDarkMode = useAtomValue(themeSettingsAtom).darkModeWhenRunning;

    const timerSettings = useAtomValue(timerSettingsAtom);
    const [currentTimerMode, setTimerMode] =
        useAtom<TimerModeEnum>(timerModeAtom);

    // useLongBreakIntervalCount states
    const longBreakInterval = useAtomValue(longBreakIntervalAtom);
    const longBreakIntervalCount = useLongBreakIntervalCount();

    // useTimer states
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState<TimerStatusEnum>(TimerStatusEnum.IDLE);

    // useTodos state
    const { selectedTodoId, actions: todoActions } = useTodos();
    const currentTodo = todoActions.find(selectedTodoId);

    // Derived variables
    const isRunning = status === TimerStatusEnum.RUNNING;

    const initialTime = useMemo(() => {
        const timeInMinutes = timerSettings[currentTimerMode];
        return minutesToSeconds(timeInMinutes);
    }, [timerSettings, currentTimerMode]);

    const remainingTime = useMemo(
        () => initialTime - timeElapsed,
        [initialTime, timeElapsed]
    );

    const percentageToCompletion = useMemo(
        () => Math.max(0, Math.min(1, timeElapsed / initialTime)), // [0,1]: inclusively between 0 and 1
        [timeElapsed, initialTime]
    );

    // Update Local Storage
    // Timer settings
    useEffect(() => {
        updateTimerSettingsFromStorage(timerSettings);
    }, [timerSettings]);

    // Long Break interval
    useEffect(() => {
        updateLongBreakIntervalFromStorage(longBreakInterval);
    }, [longBreakInterval]);

    // Update the timer if the status is running and remaining time changes
    useEffect(() => {
        if (status !== TimerStatusEnum.RUNNING) return;

        // !update worker timer
        const intervalId = workerTimer.setInterval(() => {
            if (remainingTime <= 1) {
                playSound(ringSound);
                handleTimerCompletion();
                resetTimer();
            } else {
                setTimeElapsed((timeElapsed) => timeElapsed + 1);
            }
        }, 1000);

        return () => workerTimer.clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, remainingTime]);

    // Update the document title
    useEffect(() => {
        const time = getTimes(remainingTime);
        const timeString = `${formatTime(time.minutes)}:${formatTime(time.seconds)}`;

        document.title = `${timeString} - ${currentTodo?.title ?? 'Time to focus!'}`;
    }, [currentTodo, remainingTime]);

    // Update theme mode
    useThemeMode(isRunning, isDarkMode);

    // Helper functions
    // handle timer when complete
    function handleTimerCompletion() {
        if (currentTimerMode === TimerModeEnum.POMODORO) {
            todoActions.incrementPomodoro(selectedTodoId);
            longBreakIntervalCount.increment();
        }

        toggleTimerMode();
    }

    // toggle timer mode
    function toggleTimerMode() {
        if (
            currentTimerMode === TimerModeEnum.POMODORO &&
            longBreakIntervalCount.value >= longBreakInterval - 1 // targetInterval
        ) {
            setTimerMode(TimerModeEnum.LONG_BREAK);
            longBreakIntervalCount.reset();
        } else {
            setTimerMode(NEXT_TIMER_MODE[currentTimerMode]);
        }
    }

    // Timer actions
    // Toggle
    function toggleTimer() {
        setStatus((status) => {
            return status === TimerStatusEnum.RUNNING
                ? TimerStatusEnum.IDLE
                : TimerStatusEnum.RUNNING;
        });
    }

    // Change timer mode
    function changeTimerMode(mode: TimerModeEnum) {
        setTimerMode(mode);
        resetTimer();
    }

    // Reset
    function resetTimer() {
        setStatus(TimerStatusEnum.IDLE);
        setTimeElapsed(0);
    }

    const actions: TimerActions = {
        toggleTimer,
        changeTimerMode,
        resetTimer,
    };

    return {
        remainingTime,
        percentageToCompletion,
        status,
        currentTimerMode,
        actions,
    };
};

export { useTimer };
