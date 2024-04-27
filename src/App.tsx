import { useAtomValue } from 'jotai';

import { Button } from './components/ui';
import { Setting, Timer, Todos } from './components';
import { useTimer } from './hooks';
import {
    getUpdatedTimeAtom,
    getTotalSessionsAtom,
    finishedSessionsAtom,
    runTour,
} from './lib';
import { formattedTimes } from './utils';

const App = () => {
    const timer = useTimer();
    const resetTimer = timer.actions.resetTimer;

    const finishedSessions = useAtomValue(finishedSessionsAtom);
    const totalSessions = useAtomValue(getTotalSessionsAtom);
    const { hours, minutes } = useAtomValue(getUpdatedTimeAtom);

    return (
        <main className="[&>*]:px-3 sm:[&>*]:px-4">
            <section aria-label="app">
                <header className="mx-auto flex max-w-2xl gap-2 py-4">
                    <h1 className="mr-auto text-2xl font-bold text-white ">
                        Pomotama
                    </h1>
                    <Button
                        intent="secondary"
                        size="small"
                        type="button"
                        aria-label="Tutorial button"
                        onClick={runTour}
                    >
                        Tutorial
                    </Button>
                    <Setting />
                </header>
                <Timer timer={timer} />
                <Todos timerCallback={resetTimer} />

                {/* hide it when there's no todo */}
                <div className="mx-auto mt-6 max-w-[30rem] border-t bg-white/10 p-4 text-white">
                    <p>
                        <span className="text-white/70">Pomodoros:</span>
                        <span className="text-xl">{finishedSessions}</span>
                        <span>/</span>
                        <span className="text-xl">{totalSessions}</span>
                    </p>
                    <p>
                        <span className="text-white/70">Finish At:</span>
                        <span className="text-xl">{formattedTimes(hours)}</span>
                        <span>:</span>
                        <span className="text-xl">
                            {formattedTimes(minutes)}
                        </span>
                    </p>
                </div>
            </section>

            <section
                aria-label="pomodoro timer user manual"
                className="mt-10 bg-white/85"
            >
                <div id="instruction" className="center p-6 [--max:42rem]">
                    <h2 className="text-xl font-bold text-gray-900">
                        How to use the Pomodoro Timer?
                    </h2>
                    <ol className="prose mt-4 list-decimal space-y-2 pl-5 text-gray-700">
                        <li>Add tasks to work on today</li>
                        <li>
                            Set estimate pomodoros (1 = 25min of work) for each
                            task
                        </li>
                        <li>Select a task to work on</li>
                        <li>
                            Start timer and focus on the task for 25 minutes
                        </li>
                        <li>Take a break for 5 minutes when the alarm rings</li>
                        <li>Iterate 3-5 until you finish the tasks</li>
                    </ol>
                    <p className="mt-4 text-sm text-gray-600">
                        💡 Tip: The selected task will update its est.pomodoro
                        number once the pomodoro timer has finished!
                    </p>
                </div>
            </section>
        </main>
    );
};

export default App;
