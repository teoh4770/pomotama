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
import { timerSettingOptions } from '../../App';

// the timer setting component should stay inside Timer component
// instead, the setting component should contains multiple sub setting component

interface Timer {
    timerSettings: timerSettingOptions;
    initialTime: number;
    initialTimeHandler: (arg0: number) => void;
}

const Timer = ({ timerSettings, initialTime, initialTimeHandler }: Timer) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState('idle');

    const time = initialTime - timeElapsed;
    const { minutes, seconds } = getTimes(time);

    useInterval(
        () => {
            setTimeElapsed((timeElapsed) => timeElapsed + 1);
        },
        status === 'running' ? 1000 : null
    );

    useEffect(() => {
        if (time === 0) {
            resetTimer();
        }
    }, [time]);

    const updateTimerMode = (name: string) => {
        resetTimer();
        initialTimeHandler(minutesToSeconds(timerSettings[name]));
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
