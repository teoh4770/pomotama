import { describe, test, expect } from 'vitest';
import { getTimes, formattedTimes, clipNumber } from './index';

// Tests
// should be able to get time in seconds, and return an object that contains minutes and seconds
describe('getTimes function', () => {
    test('return a time object when input is positive', () => {
        const seconds = 60;
        const time = getTimes(seconds);

        expect(time).toBeTypeOf('object');
        expect(time.minutes).toBeTypeOf('number');
        expect(time.seconds).toBeTypeOf('number');
    });

    test('return the correct time object with minutes and seconds for a given input in seconds', () => {
        expect(getTimes(0)).toEqual({ minutes: 0, seconds: 0 });
        expect(getTimes(30)).toEqual({ minutes: 0, seconds: 30 });
        expect(getTimes(60)).toEqual({ minutes: 1, seconds: 0 });
        expect(getTimes(61)).toEqual({ minutes: 1, seconds: 1 });
    });

    test('throws an error for negative input', () => {
        expect(() => getTimes(-1)).toThrowError(
            'Input cannot be a negative number'
        );
    });
});

describe('formattedTimes function', () => {
    test("returns '01' when input is 1", () => {
        expect(formattedTimes(1)).toBe('01');
    });

    test("returns '10' when input is 10", () => {
        expect(formattedTimes(10)).toBe('10');
    });

    test('throws an error with specific message for negative input', () => {
        expect(() => formattedTimes(-1)).toThrowError(
            'Input cannot be a negative number'
        );
    });
});

describe('clipNumber function', () => {
    const MIN = 0;
    const MAX = 100;
    const valueBelowMin = -1;
    const valueAboveMax = 101;
    const valueWithinRange = 50;

    test('return min value if number is less than min', () => {
        expect(clipNumber(valueBelowMin, MIN, MAX)).toBe(MIN);
    });

    test('return max value if number is more than max', () => {
        expect(clipNumber(valueAboveMax, MIN, MAX)).toBe(MAX);
    });

    test('return the value if number is within the clip range', () => {
        expect(clipNumber(valueWithinRange, MIN, MAX)).toBe(valueWithinRange);
    });
});
