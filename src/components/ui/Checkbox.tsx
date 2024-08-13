import { KeyboardEventHandler } from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            (document.activeElement as HTMLInputElement).click();
        }
    };

    return (
        <input
            onKeyUp={handleKeyUp}
            className={className}
            type="checkbox"
            {...props}
        />
    );
};

export { Checkbox };
