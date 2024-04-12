interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const TimerControls = ({ status, toggleTimer }: ControlsProps) => {
    const timerIsRunning = status === 'running';
    const buttonText = timerIsRunning ? 'stop' : 'start';

    return (
        <div className="flex-row">
            <button
                className="button | !uppercase [--fs:1.375rem] [--px:3rem] [--py:0.75rem] sm:[--px:4rem]"
                onClick={toggleTimer}
                data-type="primary"
            >
                {buttonText}
            </button>
            {/* temporarily remove the  */}
            {/* <button className="button !bg-black" onClick={resetTimer}>
                Reset
            </button> */}
        </div>
    );
};

export { TimerControls };
