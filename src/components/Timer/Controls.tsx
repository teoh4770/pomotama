interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const Controls = ({ status, toggleTimer, resetTimer }: ControlsProps) => {
    const buttonState = status === 'running' ? 'stop' : 'start';

    return (
        <div className="flex-row">
            <button
                className="button"
                data-type="primary"
                data-size="large"
                onClick={toggleTimer}
            >
                {buttonState}
            </button>
            <button
                className="button"
                data-type="naked"
                data-size="large"
                onClick={resetTimer}
            >
                Reset
            </button>
        </div>
    );
};

export { Controls };
