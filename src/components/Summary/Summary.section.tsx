import { useAtomValue } from 'jotai';

import {
    getUpdatedTimeAtom,
    getTotalSessionsAtom,
    finishedSessionsAtom,
    todosAtom,
} from '../../lib';
import { Todo } from '../../types';
import { formattedTimes } from '../../utils';

type SummaryProps = {
    className?: string;
};

const Summary: React.FC<SummaryProps> = ({ className }) => {
    const finishedSessions = useAtomValue(finishedSessionsAtom);
    const totalSessions = useAtomValue(getTotalSessionsAtom);
    const { hours, minutes } = useAtomValue(getUpdatedTimeAtom);
    const todos: Todo[] = useAtomValue(todosAtom);

    if (todos.length > 0) {
        return (
            <section className={className}>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <p>
                        <span className="mr-1 text-white/70">Pomodoros:</span>

                        <span className="text-2xl font-bold">
                            {finishedSessions}
                        </span>
                        <span className="mx-[0.125rem] font-extralight">/</span>
                        <span className="text-2xl font-bold">
                            {totalSessions}
                        </span>
                    </p>
                    <p>
                        <span className="mr-1 text-white/70">Finish At:</span>
                        <span className="text-2xl font-bold">
                            <span>{formattedTimes(hours)}</span>
                            <span>:</span>
                            <span>{formattedTimes(minutes)}</span>
                        </span>
                    </p>
                </div>
            </section>
        );
    }
};

export { Summary };
