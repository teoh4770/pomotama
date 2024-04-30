import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Setting, Summary, Timer, Todos } from './components';
import { Button } from './components/ui';
import { useTimer } from './hooks';
import { runTour } from './lib';
import { themeSettingsAtom } from './lib/atom';

const App = () => {
    const timer = useTimer();
    const resetTimer = timer.actions.resetTimer;

    // state
    const themeSettings = useAtomValue(themeSettingsAtom);
    const isDarkModeWhenRunning = themeSettings.darkModeWhenRunning;

    const isRunning = timer.status === 'running';

    // if timer is running and isDarkModeWhenRunning setting is on, add hiddenClass
    const hiddenClass =
        isRunning && isDarkModeWhenRunning ? 'invisible delay-1000' : '';

    useEffect(() => {
        const bodyClass = ['bg-black', 'delay-1000'];

        if (isRunning && isDarkModeWhenRunning) {
            document.body.classList.add(...bodyClass);
        } else {
            document.body.classList.remove(...bodyClass);
        }
    }, [isRunning, isDarkModeWhenRunning]);

    return (
        <main className="[&>*]:px-3 sm:[&>*]:px-4">
            <section aria-label="app" className={`${hiddenClass} min-h-screen`}>
                <header className="mx-auto flex max-w-2xl gap-2 py-4">
                    <h1
                        className={`mr-auto text-2xl font-bold text-white ${hiddenClass}`}
                    >
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
                <Summary
                    className={`mx-auto mt-6 max-w-[30rem] border-t-2 bg-white/10 px-3 py-5 text-white`}
                />
            </section>

            <section
                className="mt-10 bg-white/85"
                aria-label="pomodoro timer user manual"
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
