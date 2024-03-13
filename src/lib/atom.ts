import { atom } from 'jotai';

interface timerSettingOptions {
    [index: string]: number;
}

const timerSettingsAtom = atom<timerSettingOptions>({
    pomodoroDuration: 60,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});

const activeTabAtom = atom('pomodoroDuration');
const activeTimeMode = activeTabAtom;

export { timerSettingsAtom, activeTabAtom, activeTimeMode };
