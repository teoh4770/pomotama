import { useEffect, useRef } from 'react';

/**
 * Custom hook for creating intervals with adjustable delay.
 * @param callback Function to be executed at each interval.
 * @param delay Time (in milliseconds) between intervals. Pass null to stop the interval.
 * @returns A mutable ref object holding the interval ID.
 */
const useInterval = (callback: () => void, delay: number | null) => {
    const intervalRef: React.MutableRefObject<ReturnType<
        typeof setInterval
    > | null> = useRef(null);
    const savedCallback = useRef(callback);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Setup the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (typeof delay === 'number') {
            intervalRef.current = setInterval(tick, delay);

            return () => clearInterval(intervalRef.current as NodeJS.Timeout);
        }
    }, [delay]);

    return intervalRef;
};

export { useInterval };
