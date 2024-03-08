interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const Controls = ({ status, toggleTimer, resetTimer }: ControlsProps) => {
    const buttonState = status === 'running' ? 'stop' : 'start';

    return (
        <div className="controls">
            <button onClick={toggleTimer} className="px-14 py-5 rounded-md">
                {buttonState}
            </button>
            <button onClick={resetTimer} className="px-14 py-5 rounded-md">
                Reset
            </button>
        </div>
    );
};

export { Controls };
