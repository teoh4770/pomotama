interface IndicatorProps {
    percentage: number;
}

const Indicator = ({ percentage }: IndicatorProps) => {
    const validatedPercentage = Math.max(0, Math.min(percentage, 1));

    return (
        <div
            className="max-w-2xl w-full h-[0.125rem] mx-auto mb-8 bg-black/10"
            aria-label="Time indicator"
        >
            <div
                className="h-full bg-white"
                style={{
                    transformOrigin: 'left',
                    transform: `scaleX(${validatedPercentage})`,
                }}
            ></div>
        </div>
    );
};

export { Indicator };
