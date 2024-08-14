import { useEffect } from 'react';

const useThemeMode = (isRunning: boolean, isDarkMode: boolean) => {
    useEffect(() => {
        if (isRunning && isDarkMode) {
            document.body.classList.add('bg-black', 'delay-1000');
        } else {
            document.body.classList.remove('bg-black', 'delay-1000');
        }
    }, [isRunning, isDarkMode]);
};

export { useThemeMode };
