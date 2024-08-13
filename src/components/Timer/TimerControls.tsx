import selectSound from '../../assets/select.mp3';
import { TimerStatusEnum } from '../../types';

import { Button } from '../ui';

interface ControlsProps {
    status: TimerStatusEnum;
    isDarkMode: boolean;
    toggleTimer: () => void;
    resetTimer: () => void;
}

function playSelectSound() {
    new Audio(selectSound).play();
}

const TimerControls: React.FC<ControlsProps> = ({
    status,
    isDarkMode,
    toggleTimer,
}) => {
    const isTimerRunning = status === TimerStatusEnum.RUNNING;

    const buttonTextColor = isDarkMode
        ? 'text-black'
        : 'text-[var(--primary-color)]';
    const activeButtonClass = isTimerRunning
        ? `${buttonTextColor} translate-y-0 shadow-none transition-colors delay-1000`
        : '';

    return (
        <div
            className="flex justify-center visible"
            aria-label="Timer controls"
        >
            <Button
                intent="primary"
                size="large"
                type="button"
                className={activeButtonClass}
                onClick={() => {
                    toggleTimer();
                    playSelectSound();
                }}
            >
                {isTimerRunning ? 'Pause' : 'Start'}
            </Button>
        </div>
    );
};

export { TimerControls };
