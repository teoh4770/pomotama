import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../lib/atom';

import { useInterval } from './useInterval';
import { minutesToSeconds } from '../utils';

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

const useTimer = (): UseTimer => {
    // global variable
    const timerSettings = useAtomValue(timerSettingsAtom);

    // states
    const [initialTime, setInitialTime] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState<Status>('idle');
    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoroDuration');

    // calculated variable
    const remainingTime = initialTime - timeElapsed;
    const percentageToCompletion = timeElapsed / initialTime;

    // runs the timer once status is set to "running"
    useInterval(
        () => {
            if (remainingTime <= 0) {
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

    function changeTimerMode(mode: TimerMode) {
        setTimerMode(mode);
        reset();
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
