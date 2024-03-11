const getTimes = (timeInSeconds: number) => {
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

const clipNumber = (number: number, min: number, max: number) => {
    if (number < min) return min;
    if (number > max) return max;
    return number;
};

export { getTimes, formattedTimes, minutesToSeconds, clipNumber };
