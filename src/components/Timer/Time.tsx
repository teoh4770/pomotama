import { formattedTimes, getTimes } from '../../utils';

interface TimeProps {
    remainingTime: number;
}

const Time = ({ remainingTime }: TimeProps) => {
    const { minutes, seconds } = getTimes(remainingTime);
    const formattedMinutes = formattedTimes(minutes);
    const formattedSeconds = formattedTimes(seconds);

    const timeString = `${formattedMinutes}:${formattedSeconds}`;
    return (
        <p className="text-[6.25rem] font-extrabold leading-none sm:text-[7.5rem]">
            {timeString}
        </p>
    );
};

export { Time };
