import { useEffect, useRef } from 'react';

const useInterval = (callback: Function, delay: number | null) => {
    const savedCallback = useRef<Function>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };

        if (delay !== null) {
            const id = setInterval(tick, delay);

            return () => clearInterval(id);
        }
    }, [delay]);
};

export default useInterval;
