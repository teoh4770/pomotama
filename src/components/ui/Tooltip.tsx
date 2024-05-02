// note: can have a position prop to set the position of the tooltip. "top" sets the tooltiip to the top of button
// note: can have 9 different position
// note: make sure the tooltip is not covered by anything

interface TooltipProps {
    icon: React.ReactNode;
    content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ icon, content }) => {
    return (
        <span className="relative">
            <button type="button" className="info peer border">
                {icon}
            </button>

            <span className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-full items-center rounded-xl bg-slate-900 text-white opacity-0 transition-opacity delay-100 peer-hover:opacity-100 peer-active:opacity-100">
                <span className="tooltip-content inline-block w-20 p-[2px] text-center text-[0.75rem]">
                    {content}
                </span>
            </span>
        </span>
    );
};

export { Tooltip };
