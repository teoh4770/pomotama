import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

import { useTimer } from '../../hooks';

import { Time, Indicator, TimerControls } from '.';
import { Tabs } from '../Tabs';

const Timer = () => {
    const timerSettings = useAtomValue(timerSettingsAtom);
    const timer = useTimer();

    return (
        <section id="timer-section" className="timer-section">
            <Indicator
                className="mx-auto mb-8 h-1 w-full max-w-2xl bg-slate-500"
                percentage={timer.percentageToCompletion}
            />

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
                    handler={timer.actions.changeTimerMode}
                    timerMode={timer.timerMode}
                />

                <Time remainingTime={timer.remainingTime} />

                <TimerControls
                    status={timer.status}
                    toggleTimer={timer.actions.toggle}
                    resetTimer={timer.actions.reset}
                />
            </article>
        </section>
    );
};

export { Timer };
