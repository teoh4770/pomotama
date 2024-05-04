import { useAtomValue } from 'jotai';
import { Setting, Summary, Timer, Todos } from './components';
import { Button } from './components/ui';
import { useTimer } from './hooks';
import { runTour } from './lib';
import { themeSettingsAtom } from './lib/atom';

const App = () => {
    const timer = useTimer();
    const resetTimer = timer.actions.resetTimer;

    const themeSettings = useAtomValue(themeSettingsAtom);
    const isDarkModeWhenRunning = themeSettings.darkModeWhenRunning;
    const isRunning = timer.status === 'running';
    const isTimerRunningInDarkMode = isDarkModeWhenRunning && isRunning;
    const hiddenClass = isTimerRunningInDarkMode ? 'invisible delay-1000' : '';

    return (
        <main className="[&>*]:px-3 sm:[&>*]:px-4">
            <section
                aria-label="app"
                className={`${hiddenClass} min-h-[calc(80svh)]`}
            >
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
                <Timer timer={{ ...timer, isTimerRunningInDarkMode }} />
                <Todos timerCallback={resetTimer} />
                <Summary
                    className={`mx-auto mt-6 max-w-[30rem] border-t-2 bg-white/10 px-3 py-5 text-white`}
                />
            </section>

            <section
                className="mt-10 bg-white/85"
                aria-label="pomodoro timer user manual"
            >
                <div
                    id="instruction"
                    className="center grid gap-4 p-6 [--max:42rem]"
                >
                    <div className="tips border border-dashed border-black p-1">
                        <h2 className="text-xl font-bold text-gray-900">
                            Tips💡
                        </h2>
                        <ol className="prose mt-4 list-decimal space-y-2 pl-6 text-sm text-gray-700">
                            <li>
                                The estimated pomodoro rounds for a task will
                                update automatically after each pomodoro
                                session.
                            </li>
                            <li>
                                The timer switches to a short break mode after
                                each pomodoro session.
                            </li>
                            <li>
                                The timer switches to a long break mode after
                                completing four pomodoros.
                            </li>
                        </ol>
                    </div>

                    <div className="how-to">
                        <h2 className="text-xl font-bold text-gray-900">
                            How to use the Pomodoro Timer?
                        </h2>
                        <ol className="prose mt-4 list-decimal space-y-2 pl-6 text-gray-700">
                            <li>
                                List Your Tasks: Write down your work, study, or
                                personal tasks that need to be completed.
                            </li>
                            <li>
                                Estimate Pomodoros per Task: Predict how many
                                25-minute pomodoros each task will take.
                            </li>
                            <li>
                                Choose a Task: Prioritize and start with the
                                most important or challenging task.
                            </li>
                            <li>
                                Set the Pomodoro Timer: Use a 25-minute timer to
                                work solely on the chosen task.
                            </li>
                            <li>
                                Work Until the Timer Rings: Concentrate on the
                                task until the timer goes off.
                            </li>
                            <li>
                                Take a Short Break: Relax or stretch for 5
                                minutes when the timer ends.
                            </li>
                            <li>
                                Repeat the Cycle: Begin another 25-minute work
                                interval on the same task.
                            </li>
                            <li>
                                Take Longer Breaks: After four pomodoros (about
                                2 hours), take a 15-30 minute break.
                            </li>
                            <li>
                                Track Progress: Keep a record of completed
                                pomodoros for each task.
                            </li>
                            <li>
                                Adjust as Needed: Update pomodoro estimates
                                based on actual task completion times.
                            </li>
                        </ol>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default App;
