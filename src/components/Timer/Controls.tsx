interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const Controls = ({ status, toggleTimer, resetTimer }: ControlsProps) => {
    const buttonState = status === 'running' ? 'stop' : 'start';

    return (
        <div className="controls">
            <button
                onClick={toggleTimer}
                className="w-[200px] rounded-md bg-white px-14 py-3 text-[22px] uppercase text-[--custom-color] shadow-[0_6px_0px_0px_rgba(235,235,235)]"
            >
                {buttonState}
            </button>
            <button
                onClick={resetTimer}
                className="rounded-md px-14 py-5 text-xl"
            >
                Reset
            </button>
        </div>
    );
};

export { Controls };
