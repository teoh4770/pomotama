interface Time {
    hours: number;
    minutes: number;
}

const getTimes = (timeInSeconds: number) => {
    if (timeInSeconds < 0) return { minutes: 0, seconds: 0 };

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return { minutes, seconds };
};

const formattedTimes = (time: number) => {
    if (time < 0) throw new Error('Input cannot be a negative number');

    return time >= 10 ? String(time) : '0' + time;
};

const minutesToSeconds = (minutes: number) => {
    return minutes * 60;
};

const clipTime = (time: number) => {
    return Math.min(Math.max(0, time), 999);
};

const updatedTime = (time: Time, additionalMinutes: number): Time => {
    if (additionalMinutes < 0) {
        throw new Error('additionalMinutes cannot accept negative values...');
    }

    const timeInMinutes = time.hours * 60 + time.minutes + additionalMinutes;
    const minutes = timeInMinutes % 60;
    let hours = Math.floor(timeInMinutes / 60);

    if (hours >= 24) {
        hours %= 24;
    }

    return { hours, minutes };
};

export { getTimes, formattedTimes, minutesToSeconds, clipTime, updatedTime };
