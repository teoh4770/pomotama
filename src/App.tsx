import { useEffect, useState } from 'react';
import { Setting, Timer } from './components';
import { minutesToSeconds } from './utils';

export type timerSettingOptions = {
    [key: string]: number;
};

const App = () => {
    // timer setting is shared between the timer and the setting
    const [timerSettings, setTimerSettings] = useState<timerSettingOptions>({
        pomodoroDuration: 60,
        shortBreakDuration: 5,
        longBreakDuration: 20,
    });
    // when timer setting is
    const [initialTime, setInitialTime] = useState(0);

    // should change "pomodoroDuration" to current focus tab
    useEffect(() => {
        setInitialTime(minutesToSeconds(timerSettings['pomodoroDuration']));
    }, [timerSettings]);

    return (
        <div className="font-sans">
            <Timer
                initialTime={initialTime}
                initialTimeHandler={setInitialTime}
                timerSettings={timerSettings}
            />
            <Setting
                timerSettings={timerSettings}
                timerSettingshandler={setTimerSettings}
            />
        </div>
    );
};

export default App;
