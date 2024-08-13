import { useAtomValue } from 'jotai';
import { timerSettingsAtom } from '../../lib/atom';

import { Time, Indicator, TimerControls } from '.';
import { TimerTabs } from './TimerTabs';

import { TimerModeEnum } from '../../types';
import { UseTimer } from '../../hooks/useTimer';

interface TimerProps {
    timer: UseTimer;
    isDarkMode: boolean;
}

const Timer: React.FC<TimerProps> = ({
    timer: {
        remainingTime,
        status,
        timerMode,
        percentageToCompletion,
        actions,
    },
    isDarkMode,
}) => {
    const timerSettings = useAtomValue(timerSettingsAtom);

    return (
        <section aria-label="Timer section">
            <Indicator percentage={percentageToCompletion} />

            <article
                className="space-y-6 max-w-[30rem] px-4 py-6 mx-auto bg-white/10 text-center text-white rounded-lg sm:space-y-8 sm:py-8"
                aria-label="Timer"
            >
                <TimerTabs
                    tabs={[
                        {
                            name: TimerModeEnum.POMODORO,
                            label: 'Pomodoro',
                            value: timerSettings.pomodoroDuration,
                            handleClick: () =>
                                actions.changeTimerMode(TimerModeEnum.POMODORO),
                        },
                        {
                            name: TimerModeEnum.SHORT_BREAK,
                            label: 'Short Break',
                            value: timerSettings.shortBreakDuration,
                            handleClick: () =>
                                actions.changeTimerMode(
                                    TimerModeEnum.SHORT_BREAK
                                ),
                        },
                        {
                            name: TimerModeEnum.LONG_BREAK,
                            label: 'Long Break',
                            value: timerSettings.longBreakDuration,
                            handleClick: () =>
                                actions.changeTimerMode(
                                    TimerModeEnum.LONG_BREAK
                                ),
                        },
                    ]}
                    timerMode={timerMode}
                    isTimerRunningInDarkMode={isDarkMode}
                    tabListClassName="center | flex w-fit flex-row"
                    tabItemClassName="bg-transparent"
                />

                <Time remainingTime={remainingTime} />

                <TimerControls
                    status={status}
                    isDarkMode={isDarkMode}
                    toggleTimer={actions.toggleTimer}
                    resetTimer={actions.resetTimer}
                />
            </article>
        </section>
    );
};

export { Timer };
