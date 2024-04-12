import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

import { useTimer } from '../../hooks';

import { Time, Indicator, TimerControls } from '.';
import { Tabs } from '../Tabs';

const Timer = () => {
    const timerSettings = useAtomValue(timerSettingsAtom);
    const {
        percentageToCompletion,
        remainingTime,
        actions,
        status,
        timerMode,
    } = useTimer();

    return (
        <section id="timer-section" className="timer-section">
            <Indicator
                className="mx-auto mb-8 h-1 w-full max-w-2xl bg-slate-500"
                percentage={percentageToCompletion}
            />

            <article className="timer mx-auto max-w-[30rem] space-y-6 rounded-lg bg-white/10 px-4 py-6 text-center text-white sm:space-y-8 sm:py-8">
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
                    handler={actions.changeTimerMode}
                    timerMode={timerMode}
                />

                <Time remainingTime={remainingTime} />

                <TimerControls
                    status={status}
                    toggleTimer={actions.toggleTimer}
                    resetTimer={actions.resetTimer}
                />
            </article>
        </section>
    );
};

export { Timer };
