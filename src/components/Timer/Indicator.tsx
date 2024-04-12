interface IndicatorProps {
    percentage: number;
    className?: string;
}

const Indicator = ({ percentage, className }: IndicatorProps) => {
    const barStyles = {
        transformOrigin: 'left',
        transform: `scaleX(${percentage})`,
    };

    return (
        <div className={className}>
            <div className="h-full bg-white" style={barStyles}></div>
        </div>
    );
};

export { Indicator };
