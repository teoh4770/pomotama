const getTimes = (timeInSeconds: number) => {
    if (timeInSeconds < 0) throw Error('time cannot be less than 0');

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return { minutes, seconds };
};

const formattedTimes = (time: number) => {
    if (time >= 10) {
        return '' + time;
    }
    return '0' + time;
};

const minutesToSeconds = (minutes: number) => {
    return minutes * 60;
};

export { getTimes, formattedTimes, minutesToSeconds };
