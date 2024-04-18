import { getButtonStyles } from './Button.styles';

import type { ButtonStylesProps } from './Button.styles';

type ButtonProps = ButtonStylesProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    children,
    intent,
    size,
    className,
    ...props
}) => {
    return (
        <button
            className={getButtonStyles({ intent, size, className })}
            {...props}
        >
            {children}
        </button>
    );
};
