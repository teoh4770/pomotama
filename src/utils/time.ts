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

const formatTime = (time: number) => {
    if (time < 0) throw new Error('Input cannot be a negative number');

    return time >= 10 ? String(time) : '0' + time;
};

const minutesToSeconds = (minutes: number) => {
    return minutes * 60;
};

const clipTime = (time: number) => {
    return Math.min(Math.max(0, time), 999);
};

const addMinutesToTime = (currentTime: Time, minutesToAdd: number): Time => {
    if (minutesToAdd < 0) {
        throw new Error('additionalMinutes cannot accept negative values...');
    }

    const totalMinutes =
        currentTime.hours * 60 + currentTime.minutes + minutesToAdd;

    return {
        hours: Math.floor(totalMinutes / 60) % 24,
        minutes: totalMinutes % 60,
    };
};

export {
    getTimes,
    formatTime,
    minutesToSeconds,
    clipTime,
    addMinutesToTime,
};