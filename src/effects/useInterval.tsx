import { useEffect, useRef } from 'react';

// the enhance setInterval allows user to adjust the delay dynamically
const useInterval = (callback: () => void, delay: number | null) => {
    const intervalRef = useRef(0);
    const savedCallback = useRef(callback);

    // remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // setup the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (typeof delay === 'number') {
            intervalRef.current = setInterval(tick, delay);

            return () => clearInterval(intervalRef.current);
        }
    }, [delay]);

    return intervalRef;
};

export { useInterval };
