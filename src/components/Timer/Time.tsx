import { formattedTimes } from '../../utils';

interface TimeProps {
    minutes: number;
    seconds: number;
}

const Time = ({ minutes, seconds }: TimeProps) => {
    return (
        <p className="text-9xl">
            {formattedTimes(minutes)} : {formattedTimes(seconds)}
        </p>
    );
};

export { Time };
