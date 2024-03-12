import { FormEvent } from 'react';
import { clipNumber } from '../utils';
import { timerSettingOptions } from '../App';

interface settingProps {
    timerSettings: timerSettingOptions;
    timerSettingshandler: (arg0: timerSettingOptions) => void;
}

const clipTime = (time: number) => {
    return clipNumber(time, 0, 999);
};

/**
 * @returns a setting section that contain multiple sub setting, like setting for times, todos, themes...
 */
const Setting = ({ timerSettings, timerSettingshandler }: settingProps) => {
    const handleTimerSetting = (event: FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;

        timerSettingshandler({
            ...timerSettings,
            [target.name]: clipTime(+target.value),
        });
    };

    return (
        <div>
            <label htmlFor="pomodoro-input">Pomodoro</label>
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

            <label htmlFor="short-break-input">Short Break</label>
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

            <label htmlFor="long-break-input">Long Break</label>
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
        </div>
    );
};

export { Setting };
