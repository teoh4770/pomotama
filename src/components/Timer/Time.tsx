import { formatTime, getTimes } from '../../utils';

interface TimeProps {
    remainingTime: number;
}

const Time: React.FC<TimeProps> = ({ remainingTime }) => {
    const { minutes, seconds } = getTimes(remainingTime);

    return (
        <p
            className="text-[6.25rem] font-extrabold leading-none visible sm:text-[7.5rem]"
            aria-label="Remaining time"
        >
            {formatTime(minutes)}:{formatTime(seconds)}
        </p>
    );
};

export { Time };
