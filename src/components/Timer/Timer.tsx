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

const timerSettings = [
    {
        name: 'pomodoro',
        label: 'Pomodoro',
        value: 15,
    },
    {
        name: 'shortBreak',
        label: 'Short Break',
        value: 5,
    },
    {
        name: 'longBreak',
        label: 'Long Break',
        value: 20,
    },
];

// contain all the timer related logic
const Timer = () => {
    const [initialTime, setInitialTime] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState('idle'); // idle or running

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
    }, [time])

    const updateTimer = (val: number) => {
        resetTimer();
        setInitialTime(minutesToSeconds(val));
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
        <article className="timer mx-auto max-w-[30rem] space-y-1 rounded-lg bg-white/10 py-8 pt-6 text-center">
            <Tabs items={timerSettings} handler={updateTimer} />
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
