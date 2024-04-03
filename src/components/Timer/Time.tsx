import { formattedTimes, getTimes } from '../../utils';

interface TimeProps {
    remainingTime: number;
}

const Time = ({ remainingTime }: TimeProps) => {
    const { minutes, seconds } = getTimes(remainingTime);

    return (
        <p className="text-[7.5rem] font-extrabold">
            {formattedTimes(minutes)}:{formattedTimes(seconds)}
        </p>
    );
};

export { Time };
