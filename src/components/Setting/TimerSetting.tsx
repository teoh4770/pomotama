import { FormEvent } from 'react';
import { clipNumber } from '../../utils';
import { timerSettingsAtom } from '../../lib/atom';
import { useAtom } from 'jotai';

const clipTime = (time: number) => {
    return clipNumber(time, 0, 999);
};

const TimerSetting = () => {
    const [timerSettings, setTimerSettings] = useAtom(timerSettingsAtom);

    const handleTimerSetting = (event: FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;

        setTimerSettings({
            ...timerSettings,
            [target.name]: clipTime(+target.value),
        });
    };

    return (
        <>
            <div className="setting-title text-sm font-bold text-gray-400">
                Timer
            </div>
            <div className="setting-label">Time (minutes)</div>
            <div className="flex justify-between">
                <label>
                    <div>Pomodoro</div>
                    <input
                        type="number"
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
            </div>
        </>
    );
};

export { TimerSetting };
