import { useRef } from 'react';
import { TimerSetting } from './TimerSetting';

const Setting = () => {
    const dialog = useRef<HTMLDialogElement | null>(null);

    return (
        <div>
            <button
                type="button"
                onClick={() =>
                    (dialog.current as HTMLDialogElement).showModal()
                }
                className="bg-gray-400"
            >
                open modal
            </button>
            <dialog
                ref={dialog}
                className="modal w-full max-w-[30rem] space-y-4 bg-gray-50 p-4 backdrop:bg-white/50"
                id="modal"
            >
                <TimerSetting />
                <button
                    onClick={() =>
                        (dialog.current as HTMLDialogElement).close()
                    }
                    className="button bg-gray-400 text-white"
                >
                    Close Modal
                </button>
            </dialog>
        </div>
    );
};

export { Setting };
