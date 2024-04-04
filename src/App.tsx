import { Header } from './components/Header';
import { Setting } from './components/Setting/Setting.section';
import { Timer } from './components/Timer/Timer.section';
import { Todos } from './components/Todos/Todos.section';

const App = () => {
    return (
        <main className="px-4">
            <Header
                headingLevel={1}
                title="Pomotama"
                className="mx-auto max-w-2xl py-4"
            >
                <Setting />
            </Header>
            <Timer />
            <Todos />
        </main>
    );
};

export default App;
