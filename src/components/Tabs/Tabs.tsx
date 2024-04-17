/* API Design
`items`: a list of item object, each item object contain:
  - name: the unique identifier of the object
  - label: the text shown in the tab item
  - value: the value the tab should provide

`defaultTab`: The default tab to show. If defaultTab is empty, we use the first item as a default as the value

`handler`: The handler to update the timer value
*/

/* Test Case
- All the provided items should be displayed.
- The default active item should be reflected correctly.
- Selecting the tab items updates the current timer value
- Test that you are able to initialize multiple instances of the component, each with independent states.
 */
import { useEffect, useState } from 'react';

import { TimerModeEnum } from '../../types';

interface TabItemProp {
    name: TimerModeEnum;
    label: string;
    value: number;
}

interface TabsProps {
    items: TabItemProp[];
    defaultValue?: TimerModeEnum;
    timerMode: TimerModeEnum;
    handler: (name: TimerModeEnum) => void;
}

const Tabs: React.FC<TabsProps> = ({ timerMode, items, handler }) => {
    const [activeTab, setActiveTab] = useState<TimerModeEnum>(
        TimerModeEnum.POMODORO
    );

    // when the timermode is updated, tab is also get updated as well
    useEffect(() => {
        setActiveTab(timerMode);
    }, [timerMode]);

    return (
        <div className="center | w-fit flex-row">
            {items.map(({ name, label, value }) => (
                <button
                    key={name}
                    type="button"
                    data-type="naked"
                    className={`button ${name === activeTab ? 'active' : ''}`}
                    onClick={() => {
                        handler(name);
                        setActiveTab(name);
                    }}
                    value={value}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export { Tabs };
