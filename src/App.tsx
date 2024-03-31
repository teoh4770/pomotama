import { Setting, Todos, Timer } from './components';

export type timerSettingOptions = {
    [key: string]: number;
};

const App = () => {
    return (
        <div>
            <Timer />
            <Setting />
            <Todos />
        </div>
    );
};

export default App;
