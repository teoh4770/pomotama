import { useEffect, useState } from 'react';
import { Setting, Timer } from './components';
import { minutesToSeconds } from './utils';

export type timerSettingOptions = {
    [key: string]: number;
};

// Todo: fix the bug that exists
// bug 1: the timer keeps running when time is 0

const App = () => {
    // timer setting is shared between the timer and the setting
    const [timerSettings, setTimerSettings] = useState<timerSettingOptions>({
        pomodoroDuration: 60,
        shortBreakDuration: 5,
        longBreakDuration: 20,
    });

    const [initialTime, setInitialTime] = useState(0);
    const [activeTab, setActiveTab] = useState('pomodoroDuration');

    // should change "pomodoroDuration" to current focus tab
    useEffect(() => {
        setInitialTime(minutesToSeconds(timerSettings[activeTab]));
    }, [timerSettings, activeTab]);

    return (
        <div className="font-sans">
            <Timer
                initialTime={initialTime}
                initialTimeHandler={setInitialTime}
                timerSettings={timerSettings}
                activeMode={activeTab}
                activeModeHandler={setActiveTab}
            />
            <Setting
                timerSettings={timerSettings}
                timerSettingshandler={setTimerSettings}
            />
        </div>
    );
};

export default App;
