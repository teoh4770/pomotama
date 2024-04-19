interface IntervalIds {
    [id: string]: number;
}

const intervalIds: IntervalIds = {};

self.onmessage = (e: MessageEvent): void => {
    const data = e.data;
    const command = data.command;
    const id = data.id;

    if (command === 'interval:start') {
        if (typeof data.interval === 'number') {
            const intervalId = +setInterval(() => {
                self.postMessage({
                    type: 'interval:tick',
                    id: id,
                });
            }, data.interval);

            intervalIds[id] = intervalId;

            self.postMessage({
                type: 'interval:started',
                id: data.id,
            });
        }
    } else if (command === 'interval:cleared') {
        const intervalId = intervalIds[id];
        if (intervalId) {
            clearInterval(intervalId);
            delete intervalIds[id];

            self.postMessage({
                type: 'interval:cleared',
                id: id,
            });
        } else {
            self.postMessage({
                type: 'error',
                message: 'Interval ID not found.',
            });
        }
    }
};
