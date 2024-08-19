interface ThemeSettingData {
    darkMode: boolean;
}

interface ThemeSettingInputsProps {
    themeSettings: ThemeSettingData;
    setThemeSetting: (value: ThemeSettingData) => void;
}

const ThemeSettingInputs: React.FC<ThemeSettingInputsProps> = ({
    themeSettings,
    setThemeSetting,
}) => {
    const handleChange = () => {
        setThemeSetting({
            ...themeSettings,
            darkMode: !themeSettings.darkMode,
        });
    };

    return (
        <div className="theme-setting">
            <h3 className="setting-title capitalize py-4 font-semibold text-gray-400">
                🎨 Theme
            </h3>
            <label className="inline-flex items-center justify-between cursor-pointer w-full">
                <span className="timer-setting__title font-bold">
                    Dark Mode When Running
                </span>
                <input
                    type="checkbox"
                    checked={themeSettings.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                    id="dark-mode-input"
                    name="darkModeWhenRunning"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export { ThemeSettingInputs };
