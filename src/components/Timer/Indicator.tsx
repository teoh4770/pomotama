interface IndicatorProps {
    percentage: number;
    className: string;
}

const Indicator = ({ percentage, className }: IndicatorProps) => {
    return (
        <div className={className}>
            <div
                className="h-full bg-white"
                style={{
                    transformOrigin: 'left',
                    transform: `scaleX(${percentage})`,
                }}
            ></div>
        </div>
    );
};

export { Indicator };
