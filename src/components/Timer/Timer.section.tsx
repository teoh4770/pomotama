import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

import { Time, Indicator, TimerControls } from '.';
import { TimerTabs } from './TimerTabs';

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
                <TimerTabs
                    items={[
                        {
                            name: TimerModeEnum.POMODORO,
                            label: 'Pomodoro',
                            value: timerSettings.pomodoroDuration,
                            handleClick: () =>
                                timer.actions.changeTimerMode(
                                    TimerModeEnum.POMODORO
                                ),
                        },
                        {
                            name: TimerModeEnum.SHORT_BREAK,
                            label: 'Short Break',
                            value: timerSettings.shortBreakDuration,
                            handleClick: () =>
                                timer.actions.changeTimerMode(
                                    TimerModeEnum.SHORT_BREAK
                                ),
                        },
                        {
                            name: TimerModeEnum.LONG_BREAK,
                            label: 'Long Break',
                            value: timerSettings.longBreakDuration,
                            handleClick: () =>
                                timer.actions.changeTimerMode(
                                    TimerModeEnum.LONG_BREAK
                                ),
                        },
                    ]}
                    timerMode={timer.timerMode}
                    tabListClassName="center | flex w-fit flex-row"
                    tabItemClassName="bg-transparent"
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
