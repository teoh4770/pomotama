import { getTimes, formattedTimes, clipTime } from '../time';

describe('getTimes', () => {
    it('should return minutes and seconds for a given time in seconds', () => {
        const timeInSeconds = 123;
        const expectedTime = { minutes: 2, seconds: 3 };

        const time = getTimes(timeInSeconds);

        expect(time).toEqual(expectedTime);
    });

    it('should return 0 minutes and seconds for negative time in seconds', () => {
        const timeInSeconds = -1;
        const expectedTime = { minutes: 0, seconds: 0 };

        const time = getTimes(timeInSeconds);

        expect(time).toEqual(expectedTime);
    });
});

describe('formattedTimes', () => {
    it('should return the same value if the time is larger or equal to 10', () => {
        const time = 11;
        const expectedTime = '11';

        const formattedTime = formattedTimes(time);

        expect(formattedTime).toBe(expectedTime);
    });

    it('should prepend a zero to the time if it is between 0 and 10', () => {
        const time = 0;
        const expectedTime = '00';

        const formattedTime = formattedTimes(time);

        expect(formattedTime).toBe(expectedTime);
    });

    it('should throw an error if input is negative', () => {
        const time = -1;

        expect(() => formattedTimes(time)).toThrow();
    });
});

describe('clipTime', () => {
    const MIN = 0;
    const MAX = 999;

    it('should return the same time if it is between 0 and 999', () => {
        const time = 1;
        const expectedTime = 1;

        const result = clipTime(time);

        expect(result).toBe(expectedTime);
    });

    it(`should return ${MIN} if the time is negative`, () => {
        const time = -1;
        const expectedTime = MIN;

        const result = clipTime(time);
        expect(result).toBe(expectedTime);
    });

    it(`should return ${MAX} if the time is greater than ${MAX}`, () => {
        const time = 1000;
        const expectedTime = MAX;

        const result = clipTime(time);
        expect(result).toBe(expectedTime);
    });
});
