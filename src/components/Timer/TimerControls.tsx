interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const TimerControls = ({ status, toggleTimer, resetTimer }: ControlsProps) => {
    const timerIsRunning = status === 'running';
    const buttonText = timerIsRunning ? 'stop' : 'start';

    return (
        <div className="flex-row">
            <button
                className="button"
                data-type="primary"
                data-size="large"
                onClick={toggleTimer}
            >
                {buttonText}
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

export { TimerControls };
