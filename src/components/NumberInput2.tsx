"use client";

import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
    className?: string;
    label: string | React.ReactNode;
    min: number;
    max: number;
    value: number;
    setValue: (value: number) => void;
    step?: number;
    inputClass?: string;
}

// trim trailing zeros after decimal point, returning number
const trimZeros = (num: number) => Number(num.toFixed(10));

const NumberInput2: React.FC<SliderProps> = ({ inputClass = 'w-12', step = 1, className, label, min, max, value, setValue }) => {
    const [internalValue, setInternalValue] = useState(value);
    const [inputValue, setInputValue] = useState(value.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInternalValue(trimZeros(value));
        setInputValue(trimZeros(value).toString());
    }, [value]);

    useEffect(() => {
        setValue(internalValue);
    }, [internalValue, setValue]);

    const validateAndUpdate = () => {
        const numericValue = Number(inputValue);
        if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
            setInternalValue(trimZeros(numericValue));
        } else {
            setInputValue(trimZeros(internalValue).toString()); // Revert to internal value if invalid
        }
    };

    const handleTextChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(trimZeros(Number(value)).toString());
    };

    const handleBlur = () => {
        validateAndUpdate();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateAndUpdate();
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const increment = () => {
        const newValue = Math.min(internalValue + step, max);
        setInternalValue(trimZeros(newValue));
        setInputValue(trimZeros(newValue).toString());
    };

    const decrement = () => {
        const newValue = Math.max(internalValue - step, min);
        setInternalValue(trimZeros(newValue));
        setInputValue(trimZeros(newValue).toString());
    };

    return (
        <div className={`w-fit inline-block ${className}`}>
            {typeof label === "string" ? <label className='prose prose-invert prose-sm uppercase'>{label}</label> : label}
            <div className="flex items-center rounded overflow-hidden">
                <button onClick={decrement} className="px-2 py-1 bg-neutral-300 text-neutral-950">−</button>
                <input
                    ref={inputRef}
                    className={`p-1 text-center bg-neutral-300 text-neutral-950 ${inputClass}`}
                    value={inputValue}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={increment} className="px-2 py-1 bg-neutral-300 text-neutral-950">+</button>
            </div>
        </div>
    );
};

export default NumberInput2;
