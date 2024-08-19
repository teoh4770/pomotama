import React, { useState } from 'react';

import { Button } from '.';

interface Tab {
    label: string;
    name: string | number;
    value: string | number;
    ariaLabel?: string;
    handleClick: () => void;
}

interface TabsProps {
    tabs: Tab[];
    defaultValue?: string | number;
    tabListClassName?: string;
    tabItemClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    defaultValue,
    tabListClassName,
    tabItemClassName,
}) => {
    const [activeTab, setActiveTab] = useState(defaultValue ?? tabs[0].name);

    return (
        <div className="tabs">
            <div className={`tabs-list ${tabListClassName}`}>
                {tabs.map(({ name, label, ariaLabel, value, handleClick }) => (
                    <Button
                        key={name}
                        intent="secondary"
                        size="small"
                        type="button"
                        className={`${tabItemClassName} ${name === activeTab ? 'active' : ''}`}
                        aria-label={ariaLabel}
                        value={value}
                        onClick={() => {
                            handleClick();
                            setActiveTab(name);
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export { Tabs };
