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
    // https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
    return (
        <div className="timer-setting">
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
                                min={1}
                                max={999}
                                id="pomodoro-input"
                                name="pomodoroDuration"
                                defaultValue={timerSetting.pomodoroDuration}
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
                                defaultValue={timerSetting.shortBreakDuration}
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
                                defaultValue={timerSetting.longBreakDuration}
                            />
                        </label>

                        <label>
                            <div>Long Break Interval</div>
                            <input
                                type="number"
                                className="min-w-[6.25rem]"
                                min={1}
                                max={999}
                                id="long-break-interval"
                                name="longBreakInterval"
                                defaultValue={timerSetting.longBreakInterval}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TimerSettingInputs };
