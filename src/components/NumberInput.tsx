"use client";

interface CounterProps {
    className?: string;
    min: number;
    max: number;
    value: number;
    label: string;
    setValue: (arg: number) => void
}

const NumberInput: React.FC<CounterProps> = ({ className, min, max, label, value, setValue }) => {

    const increment = () => {
        if (value < max) {
            setValue(value + 1)
        }
    };

    const decrement = () => {
        if (value > min) {
            setValue(value - 1)
        }
    };

    return (
        <div className={`inline-flex flex-col items-center ${className}`}>
            <label className='uppercase prose prose-invert prose-sm' style={{ maxWidth: "10em" }}>{label}</label>
            <div className="flex w-min rounded overflow-hidden">
                <button className="px-2 py-1 bg-neutral-300 text-neutral-950" onClick={decrement}>-</button>
                <div className='inline-block px-2 py-1 bg-neutral-300 text-neutral-950'>{value}</div>
                <button className="px-2 py-1 bg-neutral-300 text-neutral-950" onClick={increment}>+</button>
            </div>
        </div>
    );
};

export default NumberInput;
