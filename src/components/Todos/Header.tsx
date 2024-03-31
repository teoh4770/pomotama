const Header = () => {
    return (
        <header className="tasks-section__header flex items-center justify-between border py-4">
            <h2 className="font-semibold text-white">Tasks</h2>
            <button className="button" data-type="secondary" data-size="small">
                Options
            </button>
        </header>
    );
};

export { Header };
