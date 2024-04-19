import Worker from './timer-worker.ts?worker';

const createWorkerTimer = (worker: Worker) => {
    let id = 0;
    const callbacks: Record<number, { fn: () => void; context?: unknown }> = {};

    const setInterval = (
        cb: () => void,
        interval: number | null,
        context?: unknown
    ): number => {
        id++;
        const currentId = id;
        callbacks[currentId] = { fn: cb, context };
        worker.postMessage({
            command: 'interval:start',
            interval,
            id: currentId,
        });
        return currentId;
    };

    const clearInterval = (id: number): void => {
        worker.postMessage({ command: 'interval:cleared', id });
    };

    const onMessage = (e: MessageEvent): void => {
        const data = e.data;
        if (data.type === 'interval:tick') {
            const callback = callbacks[data.id];
            if (callback && callback.fn) {
                callback.fn.apply(callback.context);
            }
        } else if (data.type === 'interval:cleared') {
            delete callbacks[data.id];
        }
    };

    worker.onmessage = onMessage;

    return {
        setInterval,
        clearInterval,
    };
};

const worker = new Worker();
const workerTimer = createWorkerTimer(worker);

export { workerTimer };
