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

// Mapping to determine the next timer mode based on the current mode
const NEXT_TIMER_MODE = {
    [TimerModeEnum.POMODORO]: TimerModeEnum.SHORT_BREAK,
    [TimerModeEnum.SHORT_BREAK]: TimerModeEnum.POMODORO,
    [TimerModeEnum.LONG_BREAK]: TimerModeEnum.POMODORO,
};

// Custom hook to manage long break interval count state
const useLongBreakIntervalCount = (initialValue: number) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        increment: () => setValue((prev) => prev + 1),
        reset: () => setValue(initialValue),
    };
};

// Main hook for managing the timer functionality
const useTimer = (): UseTimer => {
    // =========================
    // ===    Atom values    ===
    // =========================
    const isDarkMode = useAtomValue(themeSettingsAtom).darkModeWhenRunning;
    const timerSettings = useAtomValue(timerSettingsAtom);
    const longBreakInterval = useAtomValue(longBreakIntervalAtom);
    const [currentTimerMode, setTimerMode] =
        useAtom<TimerModeEnum>(timerModeAtom);


    // =========================
    // ===  States variable  ===
    // =========================
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState<TimerStatusEnum>(TimerStatusEnum.IDLE);


    // =========================
    // ===   Custom Hooks    ===
    // =========================
    const longBreakIntervalCount = useLongBreakIntervalCount(0);
    const { selectedTodoId, actions: todoActions } = useTodos();


    // =========================
    // === Derived Variables ===
    // =========================

    // Derive variable: Get the target todo based on the given id
    const currentTodo = todoActions.find(selectedTodoId);

    // Derived variable: Calculate the initial time in seconds based on the current timer mode
    const initialTime = useMemo(() => {
        const timeInMinutes = timerSettings[currentTimerMode];
        return minutesToSeconds(timeInMinutes);
    }, [timerSettings, currentTimerMode]);

    // Derived variable: Calculate the remaining time by subtracting the elapsed time from the initial time
    const remainingTime = useMemo(
        () => initialTime - timeElapsed,
        [initialTime, timeElapsed]
    );

    // Derived variable: Calculate the percentage of time elapsed for the progress bar
    const percentageToCompletion = useMemo(
        () => Math.max(0, Math.min(1, timeElapsed / initialTime)), // [0,1]: inclusively between 0 and 1
        [timeElapsed, initialTime]
    );

 
    
    // =========================
    // ===    Side Effect    ===
    // =========================

    // Side effect: Update the timer settings in local storage whenever they change
    useEffect(() => {
        updateTimerSettingsFromStorage(timerSettings);
    }, [timerSettings]);

    // Side effect: Update the long break interval in local storage whenever it changes
    useEffect(() => {
        updateLongBreakIntervalFromStorage(longBreakInterval);
    }, [longBreakInterval]);

    // Side effect: Run the timer if it's in a running state and update the remaining time every second
    useEffect(() => {
        if (status !== TimerStatusEnum.RUNNING) return;

        // !update worker timer
        const intervalId = workerTimer.setInterval(() => {
            if (remainingTime <= 1) {
                playSound(ringSound);
                handleTimerCompletion();
            } else {
                setTimeElapsed((timeElapsed) => timeElapsed + 1);
            }
        }, 1000);

        return () => workerTimer.clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, remainingTime]);

    // Side effect: Update the document title with the remaining time and current todo title
    useEffect(() => {
        const time = getTimes(remainingTime);
        const timeString = `${formatTime(time.minutes)}:${formatTime(time.seconds)}`;

        document.title = `${timeString} - ${currentTodo?.title ?? 'Time to focus!'}`;
    }, [currentTodo, remainingTime]);

    // Side effect: Update the theme mode based on whether the timer is running and the dark mode setting
    useThemeMode(status === TimerStatusEnum.RUNNING, isDarkMode);

    
    // =========================
    // ===   Timer actions   ===
    // =========================

    // Timer action: Start or pause the timer
    function toggleTimer() {
        setStatus((status) => {
            return status === TimerStatusEnum.RUNNING
                ? TimerStatusEnum.IDLE
                : TimerStatusEnum.RUNNING;
        });
    }

    // Timer action: Manually change the timer mode
    function changeTimerMode(mode: TimerModeEnum) {
        setTimerMode(mode);
        resetTimer();
    }

    // Timer action: Reset the timer to its initial state
    function resetTimer() {
        setStatus(TimerStatusEnum.IDLE);
        setTimeElapsed(0);
    }

    // Helper function: Handle actions when the timer completes (e.g., increment pomodoro count, switch mode, reset timer)
    function handleTimerCompletion() {
        if (currentTimerMode === TimerModeEnum.POMODORO) {
            todoActions.incrementPomodoro(selectedTodoId);
            longBreakIntervalCount.increment();
        }

        switchToNextTimerMode();
        resetTimer();
    }

    // Helper function: Switch to the next appropriate timer mode based on current condition
    function switchToNextTimerMode() {
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

    return {
        remainingTime,
        percentageToCompletion,
        status,
        currentTimerMode,
        actions: {
            toggleTimer,
            changeTimerMode,
            resetTimer,
        },
    };
};

export { useTimer };
