// Note: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
import { TimerModeEnum } from '../../types';

interface TimerSettingProps {
    timerSettings: {
        [TimerModeEnum.POMODORO]: number;
        [TimerModeEnum.SHORT_BREAK]: number;
        [TimerModeEnum.LONG_BREAK]: number;
        longBreakInterval: number;
    };
}

const TimerSettingInputs: React.FC<TimerSettingProps> = ({ timerSettings }) => {
    const renderInput = (
        label: string,
        name: string,
        value: number,
        min: number = 0,
        max: number = 999
    ) => (
        <label className="timer-setting__item">
            <div className="timer-setting__item-label">{label}</div>
            <input
                type="number"
                className="timer-setting__item-input"
                min={min}
                max={max}
                id={`${name}-input`}
                name={name}
                defaultValue={value}
            />
        </label>
    );

    return (
        <div className="timer-setting">
            <h3 className="setting-title capita py-4 font-semibold text-gray-400">
                ⌛ Timer
            </h3>
            <div className="stack">
                {/* Consider form validation? */}
                <div>
                    <h4 className="timer-setting__title font-bold">
                        Time (minutes)
                    </h4>

                    {renderInput(
                        'Pomodoro',
                        'pomodoroDuration',
                        timerSettings[TimerModeEnum.POMODORO]
                    )}
                    {renderInput(
                        'Short Break',
                        'shortBreakDuration',
                        timerSettings[TimerModeEnum.SHORT_BREAK]
                    )}
                    {renderInput(
                        'Long Break',
                        'longBreakDuration',
                        timerSettings[TimerModeEnum.LONG_BREAK]
                    )}
                </div>

                <label className="timer-setting__item flex items-center justify-between">
                    <div className="timer-setting__item-label">
                        Long Break Interval
                    </div>
                    <input
                        type="number"
                        className="timer-setting__item-input !max-w-20"
                        min={1}
                        max={999}
                        id="long-break-interval"
                        name="longBreakInterval"
                        defaultValue={timerSettings.longBreakInterval}
                    />
                </label>
            </div>
        </div>
    );
};

export { TimerSettingInputs };
