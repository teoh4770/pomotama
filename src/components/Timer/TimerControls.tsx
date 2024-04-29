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
    const activeButtonClass = timerIsRunning
        ? 'translate-y-0 text-black shadow-none transition-[color] delay-1000'
        : '';

    function playSound() {
        const click = new Audio(selectSound);
        click.play();
    }

    return (
        <div className="visible flex justify-center">
            <Button
                intent="primary"
                size="large"
                type="button"
                className={activeButtonClass}
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
