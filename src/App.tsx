import { runTour } from './lib';
import { Button } from './components/ui';
import { Setting, Timer, Todos } from './components';

const App = () => {
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
                <Timer />
                <Todos />
            </section>

            <section aria-label="description" className="mt-10 bg-white/85">
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
