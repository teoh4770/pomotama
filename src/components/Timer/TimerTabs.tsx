import { useEffect } from 'react';
import { TimerModeEnum } from '../../types';
import { Tabs } from '../ui';

interface TimerTab {
    label: string;
    name: string | number;
    value: number;
    ariaLabel?: string;
    handleClick: () => void;
}

interface TimerTabsProps {
    tabs: TimerTab[];
    timerMode: TimerModeEnum;
    isTimerRunningInDarkMode: boolean;
    tabListClassName?: string;
    tabItemClassName?: string;
}

const ACTIVE_TABS = {
    [TimerModeEnum.POMODORO]: {
        color: 'var(--bg-color-1)',
        icon: '/favicon-red.svg',
    },
    [TimerModeEnum.SHORT_BREAK]: {
        color: 'var(--bg-color-2)',
        icon: '/favicon-green.svg',
    },
    [TimerModeEnum.LONG_BREAK]: {
        color: 'var(--bg-color-3)',
        icon: '/favicon-blue.svg',
    },
};

const setPrimaryColor = (activeTab: TimerModeEnum) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', ACTIVE_TABS[activeTab].color);
};

const changeIcon = (
    activeTab: TimerModeEnum,
    isTimerRunningInDarkMode: boolean
) => {
    const link = document.querySelector(
        "link[rel~='icon']"
    ) as HTMLAnchorElement | null;

    if (!link) {
        throw new Error('The icon is not found!');
    }

    link.href = isTimerRunningInDarkMode
        ? '/favicon-dark.svg'
        : ACTIVE_TABS[activeTab].icon;
};

const TimerTabs: React.FC<TimerTabsProps> = ({
    tabs,
    timerMode,
    isTimerRunningInDarkMode = false,
    tabListClassName = '',
    tabItemClassName = '',
}) => {
    useEffect(() => {
        setPrimaryColor(timerMode);
        changeIcon(timerMode, isTimerRunningInDarkMode);
    }, [timerMode, isTimerRunningInDarkMode]);

    return (
        <Tabs
            key={timerMode} // Ensures that the tab component resets its state when the timerMode changes
            tabs={tabs}
            defaultValue={timerMode}
            tabListClassName={tabListClassName}
            tabItemClassName={tabItemClassName}
        />
    );
};

export { TimerTabs };
