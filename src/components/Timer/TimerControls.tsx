import { Button } from '../ui';

interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const TimerControls = ({ status, toggleTimer }: ControlsProps) => {
    const timerIsRunning = status === 'running';
    const buttonText = timerIsRunning ? 'pause' : 'start';

    return (
        <div className="flex justify-center">
            <Button
                intent="primary"
                size="large"
                type="button"
                className={`${timerIsRunning ? 'translate-y-0 shadow-none' : ''}`}
                onClick={toggleTimer}
            >
                {buttonText}
            </Button>
            {/* temporarily remove the  */}
            {/* <button className="button !bg-black" onClick={resetTimer}>
                Reset
            </button> */}
        </div>
    );
};

export { TimerControls };
