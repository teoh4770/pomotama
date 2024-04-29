import selectSound from '../../assets/select.mp3';

import { Button } from '../ui';

interface ControlsProps {
    status: string;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const TimerControls = ({ status, toggleTimer }: ControlsProps) => {
    const timerIsRunning = status === 'running';
    const buttonText = timerIsRunning ? 'pause' : 'start';

    function playSound() {
        const click = new Audio(selectSound);
        click.play();
    }

    return (
        <div className="flex justify-center visible">
            <Button
                intent="primary"
                size="large"
                type="button"
                className={`${timerIsRunning ? 'translate-y-0 shadow-none' : ''}`}
                onClick={() => {
                    toggleTimer();
                    playSound();
                }}
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
