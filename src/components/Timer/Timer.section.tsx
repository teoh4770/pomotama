import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

import { Time, Indicator, TimerControls } from '.';
import { Tabs } from '../Tabs';

import { TimerModeEnum, TimerStatusEnum } from '../../types';

interface TimerActions {
    toggleTimer: () => void;
    resetTimer: () => void;
    changeTimerMode: (mode: TimerModeEnum) => void;
}

interface UseTimer {
    status: TimerStatusEnum;
    remainingTime: number;
    percentageToCompletion: number;
    timerMode: TimerModeEnum;
    actions: TimerActions;
}

interface TimerProps {
    timer: UseTimer;
}

const Timer = ({ timer }: TimerProps) => {
    const timerSettings = useAtomValue(timerSettingsAtom);

    return (
        <section id="timer-section" className="timer-section">
            <Indicator
                className="mx-auto mb-8 h-[0.125rem] w-full max-w-2xl bg-black/10"
                percentage={timer.percentageToCompletion}
            />

            <article className="timer mx-auto max-w-[30rem] space-y-6 rounded-lg bg-white/10 px-4 py-6 text-center text-white sm:space-y-8 sm:py-8">
                <Tabs
                    items={[
                        {
                            name: TimerModeEnum.POMODORO,
                            label: 'Pomodoro',
                            value: timerSettings.pomodoroDuration,
                        },
                        {
                            name: TimerModeEnum.SHORT_BREAK,
                            label: 'Short Break',
                            value: timerSettings.shortBreakDuration,
                        },
                        {
                            name: TimerModeEnum.LONG_BREAK,
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
                    toggleTimer={timer.actions.toggleTimer}
                    resetTimer={timer.actions.resetTimer}
                />
            </article>
        </section>
    );
};

export { Timer };
