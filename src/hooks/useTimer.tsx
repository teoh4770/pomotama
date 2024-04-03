import { useState } from 'react';

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
    setMode: (name: TimerMode) => void;
}

interface UseTimer {
    status: Status;
    remainingTime: number;
    percentageToCompletion: number;
    timerActions: TimerActions;
}

const useTimer = (): UseTimer => {
    const [initialTime, setInitialTime] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState<Status>('idle');

    const timerSettings = useAtomValue(timerSettingsAtom);
    const remainingTime = initialTime - timeElapsed;
    const percentageToCompletion = timeElapsed / initialTime;

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

    function setMode(name: TimerMode) {
        reset();
        setInitialTime(minutesToSeconds(timerSettings[name]));
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

    const timerActions: TimerActions = {
        toggle,
        reset,
        setMode,
    };

    return {
        remainingTime,
        percentageToCompletion,
        status,
        timerActions,
    };
};

export { useTimer };
