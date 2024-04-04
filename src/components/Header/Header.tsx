import { ReactNode } from 'react';

interface HeaderProps {
    headingLevel: number;
    title: string;
    children: ReactNode;
    className: string;
}

const Header: React.FC<HeaderProps> = ({
    headingLevel,
    title,
    children,
    className,
}) => {
    return (
        <header className={'flex items-center justify-between ' + className}>
            {headingLevel === 1 && (
                <h1 className="text-2xl font-bold text-white">{title}</h1>
            )}
            {headingLevel === 2 && (
                <h2 className="text-lg font-bold text-white">{title}</h2>
            )}
            <div>{children}</div>
        </header>
    );
};

export { Header };
