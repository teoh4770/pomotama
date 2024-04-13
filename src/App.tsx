import { runTour } from './lib';
import { Setting, Timer, Todos } from './components';

const App = () => {
    return (
        <main className="px-3 sm:px-4">
            <header className="mx-auto flex max-w-2xl items-center gap-2 py-4">
                <h1 className="mr-auto text-2xl font-bold text-white ">
                    Pomotama
                </h1>

                <button
                    type="button"
                    className="button"
                    data-type="secondary"
                    data-size="small"
                    aria-label="tutorial button"
                    onClick={runTour}
                >
                    Tutorial
                </button>
                <Setting />
            </header>
            <Timer />
            <Todos />
            <div id="instruction" className="mt-10 bg-slate-300">
                <h2 className="text-xl font-bold">
                    How to use the Pomodoro Timer?
                </h2>
                <ol className="ml-10 list-decimal grid gap-1">
                    <li>
                        <mark>Add tasks</mark> to work on today
                    </li>
                    <li>
                        <mark>Set estimate pomodoros</mark> (1 = 25min of work)
                        for each tasks
                    </li>
                    <li>
                        <mark>Select a task</mark> to work on
                    </li>
                    <li>
                        <mark>Start timer</mark> and focus on the task for 25
                        minutes
                    </li>
                    <li>
                        <mark>Take a break</mark> for 5 minutes when the alarm
                        ring
                    </li>
                    <li>
                        <mark>Iterate</mark> 3-5 until you finish the tasks
                    </li>
                </ol>
                <p className="mt-2">
                💡Tip: The selected task will update its est.pomodoro number
                    once the pomodoro timer has finished!
                </p>
            </div>
        </main>
    );
};

export default App;
