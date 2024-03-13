/* API Design
`Timer`: the main component that contains:
  - Tabs
  - Time
  - Controls

States
- initialTime: the initial amount of time
- timeElapsed: keep track of the amount of time passed
- status: to run or stop the interval based on status


Effect
- setInterval

Handlers
- toggle the timer
- reset the timer
 */

import { useEffect, useState } from 'react';
import { Controls } from './Controls';
import { Tabs } from './Tabs';
import { Time } from './Time';
import { useInterval } from '../../effects';
import { getTimes, minutesToSeconds } from '../../utils';
import { useAtomValue } from 'jotai';
import { timerSettingsAtom, activeTimeMode } from '../../lib/atom';

const Timer = () => {
    const timerSettings = useAtomValue(timerSettingsAtom);
    const timeMode = useAtomValue(activeTimeMode);

    const [initialTime, setInitialTime] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const remainingTime = initialTime - timeElapsed;
    const { minutes, seconds } = getTimes(remainingTime);

    const [status, setStatus] = useState('idle');

    useInterval(
        () => {
            setTimeElapsed((timeElapsed) => timeElapsed + 1);
        },
        status === 'running' ? 1000 : null
    );

    useEffect(() => {
        if (remainingTime <= 0) {
            resetTimer();
        }
    }, [remainingTime]);

    useEffect(() => {
        const currentActiveTimeModeValue = minutesToSeconds(
            timerSettings[timeMode]
        );

        setInitialTime(currentActiveTimeModeValue);
    }, [timerSettings, timeMode]);

    const updateTimerMode = (name: string) => {
        resetTimer();
        setInitialTime(minutesToSeconds(timerSettings[name]));
    };

    const toggleTimer = () => {
        setStatus((status) => {
            if (status === 'running') {
                return 'idle';
            }
            return 'running';
        });
    };

    const resetTimer = () => {
        setStatus('idle');
        setTimeElapsed(0);
    };

    return (
        <article className="timer mx-auto max-w-[30rem] space-y-1 rounded-lg bg-white/10 py-8 pt-6 text-center text-white">
            <Tabs
                items={[
                    {
                        name: 'pomodoroDuration',
                        label: 'Pomodoro',
                        value: timerSettings.pomodoroDuration,
                    },
                    {
                        name: 'shortBreakDuration',
                        label: 'Short Break',
                        value: timerSettings.shortBreakDuration,
                    },
                    {
                        name: 'longBreakDuration',
                        label: 'Long Break',
                        value: timerSettings.longBreakDuration,
                    },
                ]}
                handler={updateTimerMode}
            />
            <Time minutes={minutes} seconds={seconds} />
            <Controls
                status={status}
                toggleTimer={toggleTimer}
                resetTimer={resetTimer}
            />
        </article>
    );
};

export { Timer };
