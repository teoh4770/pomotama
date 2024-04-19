// Note: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

interface SettingFormTimerData {
    pomodoroDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
}

interface TimerSettingProps {
    timerSetting: SettingFormTimerData;
}

const TimerSettingInputs = ({ timerSetting }: TimerSettingProps) => {
    return (
        <div className="timer-setting">
            <h3 className="setting-title capita py-4 font-semibold text-gray-400">
                ⌛ Timer
            </h3>
            <div className="stack">
                <div>
                    <h4 className="timer-setting__title font-bold">
                        Time (minutes)
                    </h4>

                    <label className="timer-setting__item">
                        <div className="timer-setting__item-label">
                            Pomodoro
                        </div>
                        <input
                            type="number"
                            className="timer-setting__item-input"
                            min={1}
                            max={999}
                            id="pomodoro-input"
                            name="pomodoroDuration"
                            defaultValue={timerSetting.pomodoroDuration}
                        />
                    </label>

                    <label className="timer-setting__item">
                        <div className="timer-setting__item-label">
                            Short Break
                        </div>
                        <input
                            type="number"
                            className="timer-setting__item-input"
                            min={0}
                            max={999}
                            id="short-break-input"
                            name="shortBreakDuration"
                            defaultValue={timerSetting.shortBreakDuration}
                        />
                    </label>

                    <label className="timer-setting__item">
                        <div className="timer-setting__item-label">
                            Long Break
                        </div>
                        <input
                            type="number"
                            className="timer-setting__item-input"
                            min={0}
                            max={999}
                            id="long-break-input"
                            name="longBreakDuration"
                            defaultValue={timerSetting.longBreakDuration}
                        />
                    </label>
                </div>
                <label className="timer-setting__item flex items-center justify-between">
                    <div className="timer-setting__item-label">
                        Long Break Interval
                    </div>
                    <input
                        type="number"
                        className="timer-setting__item-input !w-fit"
                        min={1}
                        max={999}
                        id="long-break-interval"
                        name="longBreakInterval"
                        defaultValue={timerSetting.longBreakInterval}
                    />
                </label>
            </div>
        </div>
    );
};

export { TimerSettingInputs };
