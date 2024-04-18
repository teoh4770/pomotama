import { FormEvent, useRef } from 'react';
import { useAtom } from 'jotai';
import { longBreakIntervalAtom, timerSettingsAtom } from '../../lib';

import { TimerSettingInputs } from './TimerSettingInputs';
import { Button } from '../ui';

interface SettingFormTimerData {
    pomodoroDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
}

const Setting = () => {
    const [timerSetting, setTimerSetting] = useAtom(timerSettingsAtom);
    const [longBreakInterval, setLongBreakInterval] = useAtom(
        longBreakIntervalAtom
    );

    const dialog = useRef<HTMLDialogElement | null>(null);

    function showModal() {
        (dialog.current as HTMLDialogElement).showModal();
    }

    function hideModal() {
        (dialog.current as HTMLDialogElement).close();
    }

    function handleSubmit(e: FormEvent) {
        const $form = e.currentTarget as HTMLFormElement;
        const formData = Object.fromEntries(new FormData($form));

        const settingFormData: SettingFormTimerData = {
            longBreakDuration: +formData.longBreakDuration,
            pomodoroDuration: +formData.pomodoroDuration,
            shortBreakDuration: +formData.shortBreakDuration,
            longBreakInterval: +formData.longBreakInterval,
        };

        const isWrongInputValue =
            settingFormData.pomodoroDuration <= 0 ||
            settingFormData.longBreakInterval <= 0;

        if (isWrongInputValue) {
            return;
        }

        setTimerSetting({
            pomodoroDuration: settingFormData.pomodoroDuration,
            shortBreakDuration: settingFormData.shortBreakDuration,
            longBreakDuration: settingFormData.longBreakDuration,
        });
        setLongBreakInterval(settingFormData.longBreakInterval);
    }

    return (
        <>
            <Button
                intent="secondary"
                size="small"
                type="button"
                aria-label="setting button"
                onClick={showModal}
            >
                <span>❤️</span>
                <span>Settings</span>
            </Button>

            {/* link about dialog html component: https://blog.webdevsimplified.com/2023-04/html-dialog/ */}
            <dialog ref={dialog} className="dialog | box">
                <form method="dialog" onSubmit={handleSubmit}>
                    <header className="dialog__header | box | flex items-center">
                        <h2 className="font-bold uppercase">Setting</h2>
                        <button
                            type="reset"
                            className="button to-right"
                            data-type="naked"
                            aria-label="close button"
                            onClick={hideModal}
                        >
                            Cancel/Close
                        </button>
                    </header>

                    <div className="dialog__content | box">
                        {/* besides the timer setting, other setting should be updated in real time, such as background color and sound (decorative) */}
                        <TimerSettingInputs
                            timerSetting={{
                                ...timerSetting,
                                longBreakInterval,
                            }}
                        />

                        {/* setting 2 */}

                        {/* setting 3 */}
                    </div>

                    <div className="dialog__footer | box">
                        <button
                            type="submit"
                            className="button to-right"
                            data-type="confirm"
                            data-size="medium"
                        >
                            OK
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export { Setting };
