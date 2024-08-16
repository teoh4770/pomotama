import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const driverObj = driver({
    showProgress: true,
    steps: [
        {
            popover: {
                title: 'Welcome to Pomotama',
                description:
                    '<p>Pomotama: Your customizable Pomodoro timer for desktop and mobile browsers. It helped you stay focus on tasks like studying, writing, or coding.</p><p style="margin-top: 1rem;">To leave the tutorial, you can also click on <mark>esc</mark> key.</p>',
            },
        },
        {
            popover: {
                title: 'What is Pomodoro?',
                description:
                    '<li>A <b>pomodoro</b> is a <b>30 min time slot</b> which consists of <b>25 min</b> of <b>focused work</b> followed by <b>5 mins</b> of <b>break</b>.</li><li><b>Repeat</b> this 30 min time slot <strong>4 times</strong> to take a <b>long break of 15 mins</b> ( usually )</li>',
            },
        },
        {
            popover: {
                title: 'How to use the Pomodoro Timer?',
                description:
                    '<ol style="list-style-type: decimal; margin-left:1rem;"><li><b>Add tasks</b> to work on today</li><li><b>Set estimate pomodoros (1 = 25min of work)</b> for each tasks</li><li><b>Select a task</b> to work on</li><li><b>Start timer</b> and focus on the task for 25 minutes</li><li><b>Take a break</b> for 5 minutes when the alarm ring</li><li><b>Iterate</b> 3-5 until you finish the tasks</li></ol>',
            },
        },
        {
            element: '#driver-1',
            popover: {
                title: 'Todo List',
                description:
                    'Create your task by clicking on "Add Task" button.',
            },
        },
        {
            element: '#driver-2',
            popover: {
                title: 'Timer',
                description:
                    'Start your timer here. The timer mode will change to short break once a pomodoro has finished.',
            },
        },

        {
            element: '#driver-3',
            popover: {
                title: 'Setting Button',
                description:
                    'Change timer setting like the duration of pomodoro and break periods here.',
            },
        },
        {
            popover: {
                title: 'Happy Coding',
                description:
                    'And that is all, go ahead and start your day with Pomotama!',
            },
        },
    ],
});

const runTour = () => {
    driverObj.drive();
};

export { runTour };
