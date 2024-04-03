import { Setting, Todos, Timer } from './components';

export type timerSettingOptions = {
    [key: string]: number;
};

const App = () => {
    return (
        <main>
            <Timer />
            <Setting />
            <Todos />
        </main>
    );
};

export default App;
