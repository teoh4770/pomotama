import { useAtomValue } from 'jotai';

import {
    todosAtom,
    totalSessionsAtom,
    completedSessionsAtom,
    finishTimeAtom,
    totalTimeRemainingAtom,
} from '../../lib';
import { Todo } from '../../types';
import { formatTime } from '../../utils';

type SummaryProps = {
    className?: string;
};

const Summary: React.FC<SummaryProps> = ({ className }) => {
    // Retrieve atom values
    const todos = useAtomValue(todosAtom) as Todo[];
    const completedSessions = useAtomValue(completedSessionsAtom);
    const totalSessions = useAtomValue(totalSessionsAtom);
    const { hours, minutes } = useAtomValue(finishTimeAtom);
    const { hours: totalTimeRemainingInHour } = useAtomValue(
        totalTimeRemainingAtom
    );

    const formattedTotalTimeRemaining = `${totalTimeRemainingInHour.toFixed(1)}h`;

    // Check for empty todos and provide a fallback UI
    if (todos.length === 0) {
        return (
            <section className={className} aria-label="Pomodoro summary">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <p className="text-center text-sm">
                        Please add some tasks to track your progress.
                    </p>
                </div>
            </section>
        );
    }

    // Render the summary details
    return (
        <section className={className} aria-label="Pomodoro summary">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                {/* Pomodoro infos */}
                <p className="flex items-center">
                    <span className="mr-1 text-white/70">Pomodoros:</span>
                    <span className="text-2xl font-bold">
                        {completedSessions}
                    </span>
                    <span className="mx-1 font-extralight">/</span>
                    <span className="text-2xl font-bold">{totalSessions}</span>
                </p>
                {/* Finish time info */}
                <p className="flex items-center space-x-1">
                    <span className="text-white/70">Finish At:</span>
                    <span className="text-2xl font-bold">
                        {formatTime(hours)}:{formatTime(minutes)}
                    </span>
                    {/* we wanna add an extra information here */}
                    <span className="text-sm text-white/70">
                        ({formattedTotalTimeRemaining})
                    </span>
                </p>
            </div>
        </section>
    );
};

export { Summary };
