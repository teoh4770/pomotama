/**
 * time.ts
 */
import {
    getTimes,
    formatTime,
    minutesToSeconds,
    clipTime,
    updatedTime,
} from './time';
export { getTimes, formatTime, minutesToSeconds, clipTime, updatedTime };

/**
 * localStorage.ts
 */
import {
    fetchUserTodosFromStorage,
    updateUserTodosFromStorage,
    fetchSelectedTodoIdFromStorage,
    updateSelectedTodoIdFromStorage,
    fetchTimerSettingsFromStorage,
    updateTimerSettingsFromStorage,
    fetchLongBreakIntervalFromStorage,
    updateLongBreakIntervalFromStorage,
} from './localStorage';
export {
    fetchUserTodosFromStorage,
    updateUserTodosFromStorage,
    fetchSelectedTodoIdFromStorage,
    updateSelectedTodoIdFromStorage,
    fetchTimerSettingsFromStorage,
    updateTimerSettingsFromStorage,
    fetchLongBreakIntervalFromStorage,
    updateLongBreakIntervalFromStorage,
};

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
