import { Header, Setting, Timer, Todos } from './components';

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
