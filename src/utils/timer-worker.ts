// Self-contained Worker Script

self.onmessage = (e: MessageEvent): void => {
    const { command, id, interval } = e.data;

    switch (command) {
        // Handle 'heartbeat' to keep the worker alive
        case 'heartbeat':
            break;

        // Handle 'interval:start' command to initiate a new interval
        case 'interval:start':
            if (typeof interval === 'number') {
                // startInterval
                startInterval(id, interval);
            } else {
                // sendError
                sendError('Invalid interval value provided');
            }
            break;

        // Handle 'interval:cleaered' command to clear an existing interval
        case 'interval:cleared':
            clearExistingInterval(id);
            break;

        // Default case to handle unknown commands
        default:
            sendError('Unknown command received.');
    }
};

const intervalIds: Record<number, NodeJS.Timeout> = {};

// Function to start an interval and track its ID
function startInterval(id: number, interval: number) {
    const intervalId = setInterval(() => {
        notifyIntervalTick(id);
    }, interval);

    intervalIds[id] = intervalId;

    notifyIntervalStarted(id);
}

// Function to clear an existing interval using its ID
function clearExistingInterval(id: number) {
    const intervalId = intervalIds[id];

    if (intervalId) {
        clearInterval(intervalId);
        delete intervalIds[id];

        notifyIntervalCleared(id);
    } else {
        sendError('Interval ID not found');
    }
}

// Notifies that the interval has ticked
function notifyIntervalTick(id: number): void {
    self.postMessage({
        type: 'interval:tick',
        id,
    });
}

// Notifies that the interval has started
function notifyIntervalStarted(id: number): void {
    self.postMessage({
        type: 'interval:started',
        id,
    });
}

// Notifies that the interval has been cleared
function notifyIntervalCleared(id: number): void {
    self.postMessage({
        type: 'interval:cleared',
        id,
    });
}

// Function to send an error message back to the main thread
function sendError(message: string) {
    self.postMessage({
        type: 'error',
        message: message,
    });
}
