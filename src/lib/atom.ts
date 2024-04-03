import { atom } from 'jotai';

const timerSettingsAtom = atom({
    pomodoroDuration: 60,
    shortBreakDuration: 5,
    longBreakDuration: 20,
});

export { timerSettingsAtom };
