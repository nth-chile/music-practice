import React from 'react';

type Props = {
    className?: string;
    variant: DotStyle;
}

export type DotStyle = 'empty' | 'green' | 'yellow' | 'red' | 'blue';

const Dot = ({ className = '', variant }: Props) => {
    const stateToColor = {
        green: {
            inner: 'text-green-500',
            highlight: 'text-green-300',
        },
        yellow: {
            inner: 'text-yellow-400',
            highlight: 'text-yellow-200',
        },
        red: {
            inner: 'text-red-500',
            highlight: 'text-red-300',
        },
        blue: {
            inner: 'text-blue-400',
            highlight: 'text-blue-200',
        },
        empty: {
            inner: 'text-transparent',
        },
    };

    return <svg className={`inline-block ${className}`} width="20" height="20" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse className='text-stone-600' cx="9" cy="8.5" rx="9" ry="8.5" fill="currentColor" />
        {variant !== 'empty' && <>
            <ellipse className={stateToColor[variant].inner} cx="9" cy="8.5" rx="8" ry="7.5" fill="currentColor" />
            <path className={stateToColor[variant].highlight} d="M13.5 8.09375C13.5 6 12 5 11 4.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </>}
    </svg>
};

export default Dot;
