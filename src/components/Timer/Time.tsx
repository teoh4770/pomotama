import { formattedTimes, getTimes } from '../../utils';

interface TimeProps {
    remainingTime: number;
}

const Time = ({ remainingTime }: TimeProps) => {
    const { minutes, seconds } = getTimes(remainingTime);

    return (
        <p className="text-[6.25rem] leading-none font-extrabold sm:text-[7.5rem]">
            {formattedTimes(minutes)}:{formattedTimes(seconds)}
        </p>
    );
};

export { Time };
