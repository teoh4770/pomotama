import { useEffect } from 'react';

import { TimerModeEnum } from '../../types';
import { Tabs } from '../ui';

interface TimerTabItemProps {
    label: string;
    name: string;
    value: number;
    ariaLabel?: string;
    handleClick: () => void;
}

interface TimerTabsProps {
    items: TimerTabItemProps[];
    timerMode: TimerModeEnum;
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

const TimerTabs: React.FC<TimerTabsProps> = ({
    items,
    timerMode,
    tabListClassName,
    tabItemClassName,
}) => {
    useEffect(() => {
        setPrimaryColor(timerMode);
        changeIcon(timerMode);
    }, [timerMode]);

    function setPrimaryColor(activeTab: TimerModeEnum) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', ACTIVE_TABS[activeTab].color);
    }

    function changeIcon(activeTab: TimerModeEnum) {
        const link = document.querySelector(
            "link[rel~='icon']"
        ) as HTMLAnchorElement;

        if (link) {
            link.href = ACTIVE_TABS[activeTab].icon;
        }
    }

    return (
        // why key?: resetting the tabs state when timerMode changes
        <Tabs
            key={timerMode}
            items={items}
            defaultValue={timerMode}
            tabListClassName={tabListClassName}
            tabItemClassName={tabItemClassName}
        />
    );
};

export { TimerTabs };
