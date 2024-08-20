/**
 * time.ts
 */
import {
    getTimes,
    formatTime,
    minutesToSeconds,
    clipTime,
    addMinutesToTime,
} from './time';
export { getTimes, formatTime, minutesToSeconds, clipTime, addMinutesToTime };

/**
 * localStorage.ts
 */
import { storage } from './localStorage';
export { storage };

/**
 * dom.ts
 */
import { moveCursorToTheEnd } from './dom';
export { moveCursorToTheEnd };

/**
 * worker-timer.js
 */
import { workerTimer } from './worker-timer';
export { workerTimer };

export function playSound(src: string) {
    try {
        new Audio(src).play();
    } catch (error) {
        console.error('Failed to play sound: ', error);
    }
}

export function clamp(percentage: number, min = 0, max = 1) {
    return Math.max(min, Math.min(percentage, max));
}
