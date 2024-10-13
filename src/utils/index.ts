/**
 * time.ts
 */
import { getTimes, formatTime, addMinutesToTime } from './time';
export { getTimes, formatTime, addMinutesToTime };

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
