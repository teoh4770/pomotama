import { useEffect } from 'react';

// Main hook for handling dark theme mode
// isRunning: boolean, isDarkMode: boolean -> condition: boolean
const useDarkMode = (condition: boolean) => {
    useEffect(() => {
        if (condition) {
            document.body.classList.add('bg-black', 'delay-1000');
        } else {
            document.body.classList.remove('bg-black', 'delay-1000');
        }
    }, [condition]);
};

export { useDarkMode };
