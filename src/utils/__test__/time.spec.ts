import { describe, it } from 'vitest';
import { getTimes, formatTime, addMinutesToTime } from '../time';

describe('getTimes()', () => {
    it('returns an object', () => {
        expect(typeof getTimes(60)).toBe('object');
        expect(typeof getTimes(-60)).toBe('object');
    });

    it('positive number cases', () => {
        expect(getTimes(+0)).toEqual({ minutes: 0, seconds: 0 });
        expect(getTimes(1)).toEqual({ minutes: 0, seconds: 1 });
        expect(getTimes(123)).toEqual({ minutes: 2, seconds: 3 });
        expect(getTimes(180)).toEqual({ minutes: 3, seconds: 0 });
        expect(getTimes(1833)).toEqual({ minutes: 30, seconds: 33 });
    });

    it('negative number cases', () => {
        const defaultTime = { minutes: 0, seconds: 0 };

        expect(getTimes(-0)).toEqual(defaultTime);
        expect(getTimes(-1)).toEqual(defaultTime);
        expect(getTimes(-2.5)).toEqual(defaultTime);
    });
});

describe('formattedTimes()', () => {
    it('returns a string', () => {
        expect(typeof formatTime(0)).toBe('string');
        expect(typeof formatTime(60)).toBe('string');
    });

    it('single digit', () => {
        expect(formatTime(0)).toBe('00');
        expect(formatTime(1)).toBe('01');
        expect(formatTime(5)).toBe('05');
    });

    it('double digit', () => {
        expect(formatTime(11)).toBe('11');
        expect(formatTime(50)).toBe('50');
        expect(formatTime(60)).toBe('60');
    });

    it('triple digit', () => {
        expect(formatTime(110)).toBe('110');
        expect(formatTime(500)).toBe('500');
        expect(formatTime(600)).toBe('600');
    });

    it('negative number cases', () => {
        expect(() => formatTime(-60)).toThrow();
    });
});

describe('addMinutesToTime()', () => {
    it('returns an object', () => {
        expect(typeof addMinutesToTime({ hours: 1, minutes: 1 }, 10)).toBe(
            'object'
        );
        expect(typeof addMinutesToTime({ hours: 10, minutes: 5 }, 30)).toBe(
            'object'
        );
    });

    it('negative additional minutes cases', () => {
        const baseTime = { hours: 21, minutes: 30 };

        expect(() => addMinutesToTime(baseTime, -1)).toThrow();
        expect(() => addMinutesToTime(baseTime, -10)).toThrow();
    });

    it('negative time object cases', () => {
        expect(() =>
            addMinutesToTime({ hours: -21, minutes: -30 }, 10)
        ).toThrow();
        expect(() =>
            addMinutesToTime({ hours: -1, minutes: -3 }, 10)
        ).toThrow();
    });

    describe('Given the current time is 1 hour 30 minutes', () => {
        const currentTime = { hours: 1, minutes: 30 };

        it('When adding an additional 30 minutes', () => {
            const additionalMinutes = 30;
            const time = addMinutesToTime(currentTime, additionalMinutes);

            expect(time).toStrictEqual({ hours: 2, minutes: 0 });
        });
    });

    describe('Given the current time is 23 hour 30 minutes', () => {
        const currentTime = { hours: 23, minutes: 30 };

        it('When adding an additional 30 minutes', () => {
            const additionalMinutes = 30;
            const time = addMinutesToTime(currentTime, additionalMinutes);

            expect(time).toStrictEqual({ hours: 0, minutes: 0 });
        });
    });

    describe('Given the current time is 23 hour 30 minutes', () => {
        const currentTime = { hours: 23, minutes: 30 };

        it('When adding an additional 1500 minutes', () => {
            const additionalMinutes = 1500; // 25 hours
            const time = addMinutesToTime(currentTime, additionalMinutes);

            expect(time).toStrictEqual({ hours: 0, minutes: 30 });
        });
    });
});
