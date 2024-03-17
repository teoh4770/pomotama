import { Setting, Timer } from './components';

export type timerSettingOptions = {
    [key: string]: number;
};

const App = () => {
    return (
        <div>
            <Timer />
            <Setting />
        </div>
    );
};

export default App;
