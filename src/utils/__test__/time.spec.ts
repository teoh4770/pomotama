import { getTimes, formattedTimes, clipTime, updatedTime } from '../time';

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

describe('updatedTime', () => {
    it('should add additional minutes to the given time', () => {
        const baseTime = { hours: 21, minutes: 30 };
        const additionalMinutes = 30;

        const result = updatedTime(baseTime, additionalMinutes);
        expect(result).toStrictEqual({ hours: 22, minutes: 0 });
    });

    it('should wrap hours within 0 to 23 range when exceeding 24 hours', () => {
        const baseTime = { hours: 23, minutes: 30 };
        const additionalMinutes = 60;

        const result = updatedTime(baseTime, additionalMinutes);
        expect(result).toStrictEqual({ hours: 0, minutes: 30 });
    });

    it('should handle large amounts of additional minutes and wrap hours correctly', () => {
        const baseTime = { hours: 23, minutes: 30 };
        const additionalMinutes = 1500; // 25 hours (1500 minutes)

        const result = updatedTime(baseTime, additionalMinutes);
        expect(result).toEqual({ hours: 0, minutes: 30 });
    });

    it('should return the base time if additionalMinutes are 0', () => {
        const baseTime = { hours: 21, minutes: 30 };
        const additionalMinutes = 0;

        const result = updatedTime(baseTime, additionalMinutes);
        expect(result).toStrictEqual(baseTime);
    });

    it('should throw an error if additionalMinutes input is negative', () => {
        const baseTime = { hours: 23, minutes: 30 };
        const additionalMinutes = -60;

        expect(() => updatedTime(baseTime, additionalMinutes)).toThrow(
            'additionalMinutes cannot accept negative values...'
        );
    });
});
