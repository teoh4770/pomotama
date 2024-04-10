import { FormEvent } from 'react';
import { useAtom } from 'jotai';

import { longBreakIntervalAtom, timerSettingsAtom } from '../../lib/atom';
import { clipTime } from '../../utils';

const TimerSetting = () => {
    const [timerSettings, updateTimerSetting] = useAtom(timerSettingsAtom);
    const [longBreakInterval, updateLongBreakInterval] = useAtom(
        longBreakIntervalAtom
    );

    const handleTimerSetting = (event: FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;

        updateTimerSetting({
            ...timerSettings,
            [target.name]: clipTime(+target.value),
        });
    };

    const handleLongBreakInterval = (event: FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        updateLongBreakInterval(+target.value);
    };

    return (
        <div>
            <div className="setting-title py-4 font-semibold uppercase text-gray-400">
                ❤️ Timer
            </div>
            <div className="stack">
                <div>
                    <div className="mb-3 font-bold">Time (minutes)</div>
                    <div className="flex flex-wrap justify-between gap-2">
                        <label>
                            <div>Pomodoro</div>
                            <input
                                type="number"
                                className="min-w-[6.25rem]"
                                min={0}
                                max={999}
                                id="pomodoro-input"
                                name="pomodoroDuration"
                                onChange={handleTimerSetting}
                                value={
                                    timerSettings.pomodoroDuration === 0
                                        ? ''
                                        : timerSettings.pomodoroDuration
                                }
                            />
                        </label>
                        <label>
                            <div>Short Break</div>
                            <input
                                type="number"
                                className="min-w-[6.25rem]"
                                min={0}
                                max={999}
                                id="short-break-input"
                                name="shortBreakDuration"
                                onChange={handleTimerSetting}
                                value={
                                    timerSettings.shortBreakDuration === 0
                                        ? ''
                                        : timerSettings.shortBreakDuration
                                }
                            />
                        </label>
                        <label>
                            <div>Long Break</div>
                            <input
                                type="number"
                                className="min-w-[6.25rem]"
                                min={0}
                                max={999}
                                id="long-break-input"
                                name="longBreakDuration"
                                onChange={handleTimerSetting}
                                value={
                                    timerSettings.longBreakDuration === 0
                                        ? ''
                                        : timerSettings.longBreakDuration
                                }
                            />
                        </label>
                        <label>
                            <div>Long Break Interval</div>
                            <input
                                type="number"
                                className="min-w-[6.25rem]"
                                min={0}
                                max={999}
                                id="long-break-interval"
                                name="longBreakInterval"
                                onChange={handleLongBreakInterval}
                                value={
                                    longBreakInterval <= 0
                                        ? '0'
                                        : longBreakInterval
                                }
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TimerSetting };
