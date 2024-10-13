import { useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
    longBreakIntervalAtom,
    themeSettingsAtom,
    timerModeAtom,
    timerSettingsAtom,
} from '../lib';
import ringSound from '../assets/ring.mp3';
import { clamp, formatTime, getTimes, playSound, storage } from '../utils';
import { useTodos } from './useTodos';
import { TimerModeEnum, TimerStatusEnum } from '../types';
import { useDarkMode } from './useDarkMode';
import { clearInterval, setInterval } from 'worker-timers'; // use a library instead of built my own untest solution

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
    const { selectedTodoId, selectedTodo, actions: todoActions } = useTodos();

    // Derived variable: Calculate the initial time in seconds based on the current timer mode
    const initialTime = useMemo(() => {
        const timeInSeconds = timerSettings[currentTimerMode] * 60;
        return timeInSeconds;
    }, [timerSettings, currentTimerMode]);

    // Derived variable: Calculate the remaining time by subtracting the elapsed time from the initial time
    const remainingTime = useMemo(
        () => initialTime - timeElapsed,
        [initialTime, timeElapsed]
    );

    // Derived variable: Calculate the percentage of time elapsed for the progress bar
    const percentageToCompletion = useMemo(
        () => clamp(timeElapsed / initialTime), // [0,1]: inclusively between 0 and 1
        [timeElapsed, initialTime]
    );

    // =========================
    // ===    Side Effect    ===
    // =========================

    // Side effect: Update the settings in local storage whenever they change
    useEffect(() => {
        storage.timerSettings.populate(timerSettings);
        storage.longBreakInterval.set(longBreakInterval);
    }, [timerSettings, longBreakInterval]);

    // Side effect: Run the timer if it's in a running state
    useEffect(() => {
        if (status !== TimerStatusEnum.RUNNING) return;

        let lastTime = Date.now();
        let milliseconds = 0;

        const intervalId = setInterval(() => {
            milliseconds += Date.now() - lastTime;
            lastTime = Date.now();

            if (remainingTime <= 0) {
                playSound(ringSound);
                handleTimerCompletion();
            } else {
                setTimeElapsed(
                    (timeElapsed) =>
                        timeElapsed + Math.floor(milliseconds / 1000)
                );
                updateTitle();
            }
        }, 100);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, remainingTime]);

    // Side effect: Update the document title with the remaining time and current todo title
    useEffect(updateTitle, [remainingTime, selectedTodo]);

    // Side effect: Update the theme mode based on whether the timer is running and the dark mode setting
    const isDarkMode =
        useAtomValue(themeSettingsAtom).darkMode &&
        status === TimerStatusEnum.RUNNING;

    useDarkMode(isDarkMode);

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
            todoActions.incrementPomodoro(selectedTodoId); // render
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

    // Helper function: Update title
    function updateTitle() {
        const time = getTimes(remainingTime);
        const timeString = `${formatTime(time.minutes)}:${formatTime(time.seconds)}`;

        document.title = `${timeString} - ${selectedTodo?.title ?? 'Time to focus!'}`;
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
