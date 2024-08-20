interface IndicatorProps {
    percentageToCompletion: number;
}

const Indicator = ({ percentageToCompletion }: IndicatorProps) => {
    return (
        <div
            className="max-w-2xl w-full h-[0.125rem] mx-auto mb-8 bg-black/10 visible"
            aria-label="Time indicator"
        >
            <div
                className="h-full bg-white"
                style={{
                    transformOrigin: 'left',
                    transform: `scaleX(${percentageToCompletion})`,
                }}
            ></div>
        </div>
    );
};

export { Indicator };
