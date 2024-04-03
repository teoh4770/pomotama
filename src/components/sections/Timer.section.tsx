import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

import { useTimer } from '../../hooks';

import { TimerControls, Time, Indicator, Tabs } from '../Timer';

const Timer = () => {
    const timerSettings = useAtomValue(timerSettingsAtom);
    const { status, remainingTime, percentageToCompletion, timerActions } =
        useTimer();
    
    return (
        <section id="timer-section" className="timer-section">
            <Indicator percentage={percentageToCompletion} />
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
                    handler={timerActions.setMode}
                    defaultValue="pomodoroDuration"
                />
                <Time remainingTime={remainingTime} />
                <TimerControls
                    status={status}
                    toggleTimer={timerActions.toggle}
                    resetTimer={timerActions.reset}
                />
            </article>
        </section>
    );
};

export { Timer };
