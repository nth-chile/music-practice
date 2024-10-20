import { FC, useState, useRef, useEffect } from 'react';

interface LabelWithPopoverProps {
    label: string;
    info: string;
}

const LabelWithPopover: FC<LabelWithPopoverProps> = ({ label, info }) => {
    const [show, setShow] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleFocus = () => setShow(true);
        const handleBlur = () => setShow(false);

        const button = buttonRef.current;
        if (button) {
            button.addEventListener('focus', handleFocus);
            button.addEventListener('blur', handleBlur);
        }

        return () => {
            if (button) {
                button.removeEventListener('focus', handleFocus);
                button.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

    return (
        <label className="relative">
            <span className='uppercase prose prose-invert prose-sm'>{label}</span>
            <button
                ref={buttonRef}
                className='ml-1 bg-none text-neutral-400 rounded-full border border-neutral-400 w-4 h-4 align-super inline-flex items-center justify-center p-0'
                style={{ fontSize: '.65em' }}
            >
                <span>?</span>
            </button>
            {show && (
                <div className='absolute bg-neutral-100 text-black w-52 bottom-0 right-0 mb-7 text-left p-2 rounded text-sm'>
                    {info}
                </div>
            )}
        </label>
    );
};

export default LabelWithPopover;

