// We can import a worker in vite like this
import Worker from './timer-worker.ts?worker';

// interact with timer-worker.ts

// postMessage => a message is sent to worker on main thread to tell worker in another thread do something
// onMessage => handle the communication between worker and the main thread

const createTimerWorker = (worker: Worker) => {
    // id: A counter used to assign unique IDs to each interval.
    // callbacks: An object that stores the callback functions associated with each interval ID.
    let id = 0;
    const callbacks: Record<number, { fn: () => void; context?: unknown }> = {};

    // accepts a
    // => callback function `cb`
    // => interval time in milliseconds
    // => optional `context` (the value of `this` when `cb` is executed)
    const setInterval = (
        cb: () => void,
        interval: number | null,
        context?: unknown
    ): number => {
        // A unique ID is generated and incremented for each new interval.
        id++;
        const currentId = id;

        // The callback is stored in the callbacks object with its ID.
        callbacks[currentId] = { fn: cb, context };

        // A message is sent to the Web Worker to start the interval, passing the interval time and the unique ID.
        worker.postMessage({
            command: 'interval:start',
            interval,
            id: currentId,
        });

        // The method returns the unique ID, which can be used to clear the interval later.
        return currentId;
    };

    const clearInterval = (id: number): void => {
        // A message is sent to the Web Worker to stop the interval associated with the given id
        worker.postMessage({ command: 'interval:cleared', id });
    };

    // onMessage: Handles the communication between the worker and the main thread, ensuring the callback functions are executed correctly or removed when the interval is cleared.
    // receive data from `postMessage`
    worker.onmessage = (e) => {
        const data = e.data;

        // If the msg indicates an interval tick, it retrieves the corresponding callback and executes it.
        if (data.type === 'interval:tick') {
            const callback = callbacks[data.id];
            if (callback && callback.fn) {
                callback.fn.apply(callback.context);
            }
            // If the interval has been cleared (interval:cleared), it deletes the callback from the callbacks object.
        } else if (data.type === 'interval:cleared') {
            delete callbacks[data.id];
        }
    };

    return {
        setInterval,
        clearInterval,
    };
};

const worker = new Worker();
const timerWorker = createTimerWorker(worker);

window.setInterval(() => {
    worker.postMessage('heartbeat');
}, 200);

export { timerWorker };
