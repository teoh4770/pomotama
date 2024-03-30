import { Setting, Tasks, Timer } from './components';

export type timerSettingOptions = {
    [key: string]: number;
};

const App = () => {
    return (
        <div>
            <Timer />
            <Setting />
            <Tasks />
        </div>
    );
};

export default App;
