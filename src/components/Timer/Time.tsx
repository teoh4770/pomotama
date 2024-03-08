import { formattedTimes } from '../../utils';

interface TimeProps {
    minutes: number;
    seconds: number;
}

const Time = ({ minutes, seconds }: TimeProps) => {
    return (
        <p className="text-[7.5rem] font-extrabold">
            {formattedTimes(minutes)}:{formattedTimes(seconds)}
        </p>
    );
};

export { Time };
