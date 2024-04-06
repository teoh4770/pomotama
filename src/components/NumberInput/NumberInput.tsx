import { useState } from 'react';

// Note:
// create a special number input that contains number input and 2 buttons
// button can be reusable for sure

type NumberInputProps = React.HTMLProps<HTMLDivElement>;

const NumberInput: React.FC<NumberInputProps> = ({
    className,
    name,
    defaultValue,
    ...props
}) => {
    const [number, setNumber] = useState<number>(
        defaultValue ? Number(defaultValue) : 1
    );

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
                <span>Est. Pomodoro</span>
                <div className="grid grid-cols-8 gap-4">
                    <input
                        type="number"
                        name={name}
                        className="col-span-2 w-fit border"
                        min={1}
                        step={1}
                        value={number}
                        onChange={handleChange}
                    />
                    <div className="col-span-2 flex">
                        <button
                            type="button"
                            aria-label="increment pomodoros amount by 1"
                            className="grid aspect-square place-items-center border"
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
                        </button>
                        <button
                            type="button"
                            aria-label="decrement pomodoros amount by 1"
                            className="grid aspect-square place-items-center border"
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
                        </button>
                    </div>
                </div>
            </label>
        </div>
    );
};

export { NumberInput };
