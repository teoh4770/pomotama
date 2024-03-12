/* API Design
`items`: a list of item object, each item object contain:
  - name: the unique identifier of the object
  - label: the text shown in the tab item
  - value: the value the tab should provide

`defaultTab`: The default tab to show. If defaultTab is empty, we use the first item as a default as the value

`handler`: The handler to update the timer value
*/

import { useState } from 'react';

/* Test Case
- All the provided items should be displayed.
- The default active item should be reflected correctly.
- Selecting the tab items updates the current timer value
- Test that you are able to initialize multiple instances of the component, each with independent states.
 */

interface TabItemProp {
    name: string;
    label: string;
    value: number;
}

interface TabsProps {
    defaultTab?: string;
    items: TabItemProp[];
    handler: (name: string) => void;
}

const Tabs = ({ defaultTab, items, handler }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab ?? items[0].name);

    return (
        <div className="tabs mx-auto w-fit">
            <div className="tabList">
                {items.map(({ name, label, value }) => {
                    const isActive = activeTab === name;

                    return (
                        <button
                            key={name}
                            type="button"
                            className={`${isActive ? 'bg-black/15 font-bold' : ''} rounded-md px-[12px] py-[2px]`}
                            onClick={() => {
                                handler(name);
                                setActiveTab(name);
                            }}
                            value={value}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export { Tabs };
