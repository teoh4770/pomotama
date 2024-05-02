import { useState } from 'react';

import { Button } from '../../ui';

interface NumberInputExtraProps {
    completedPomodoro?: number;
}

type NumberInputProps = React.HTMLProps<HTMLDivElement> & NumberInputExtraProps;

const NumberInput: React.FC<NumberInputProps> = ({
    className,
    name,
    defaultValue,
    completedPomodoro,
    ...props
}) => {
    const [number, setNumber] = useState<number>(
        defaultValue ? Number(defaultValue) : 1
    );

    // span text (the text that I need to elaborate)
    const spanText = `${completedPomodoro !== undefined ? 'Act / Est. Pomodoro Rounds' : 'Est. Pomodoro Rounds'}`;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = +e.currentTarget.value;

        if (value <= 0) {
            setNumber(0);
        } else {
            setNumber(value);
        }
    }

    function increment() {
        setNumber((number) => number + 1);
    }

    function decrement() {
        if (number <= 0) return;
        setNumber((number) => number - 1);
    }

    return (
        <div className={className} {...props}>
            <label>
                <span className="label-text mb-1 inline-block">{spanText}</span>

                <div className="flex items-center gap-1">
                    {completedPomodoro !== undefined ? (
                        <input
                            type="number"
                            className="number-input w-fit basis-20 border"
                            value={completedPomodoro}
                            readOnly
                        />
                    ) : (
                        ''
                    )}

                    {completedPomodoro !== undefined ? (
                        <span className="font-extralight">/</span>
                    ) : (
                        ''
                    )}

                    <input
                        type="number"
                        name={name}
                        className="number-input w-fit basis-20 border"
                        min={1}
                        step={1}
                        value={number}
                        onChange={handleChange}
                    />

                    <div className="flex gap-[2px] [&>*]:border [&>*]:p-4">
                        <Button
                            intent="primary"
                            size="small"
                            type="button"
                            aria-label="Increment button"
                            onClick={increment}
                        >
                            <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.26545 0.795177C5.66137 0.366578 6.33863 0.366579 6.73455 0.795177L11.3776 5.82145C11.9693 6.46193 11.515 7.5 10.6431 7.5H1.35693C0.484996 7.5 0.0307256 6.46193 0.622376 5.82145L5.26545 0.795177Z"
                                    fill="black"
                                />
                            </svg>
                        </Button>

                        <Button
                            intent="primary"
                            size="small"
                            type="button"
                            aria-label="Decrement button"
                            onClick={decrement}
                        >
                            <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.73455 7.20482C6.33863 7.63342 5.66137 7.63342 5.26545 7.20482L0.622375 2.17855C0.0307243 1.53807 0.484997 0.5 1.35693 0.5L10.6431 0.5C11.515 0.5 11.9693 1.53807 11.3776 2.17855L6.73455 7.20482Z"
                                    fill="black"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </label>
        </div>
    );
};

export { NumberInput };
