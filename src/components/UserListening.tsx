import React from 'react';
import Dot from './Dot';
import useInstrument from '@/fns/useInstrument';

interface Props {
    className?: string;
    numNotes: number;
    sequence: string[];
    bpm: number;
    onSequenceEnded: () => void;
    play: boolean;
}

const UserListening = ({
    bpm, sequence, className, play, numNotes, onSequenceEnded
}: Props) => {
    const { currentNoteIndex } = useInstrument({
        bpm,
        onSequenceEnded,
        sequence,
        play
    })

    const dots = [];

    for (let i = 0; i < numNotes; i++) {
        const dotClass = i + 1 === numNotes ? '' : 'mr-4';
        const variant = currentNoteIndex > i ? 'blue' : 'empty';

        dots.push(<Dot key={i} variant={variant} className={dotClass} />);
    }

    return (
        <div className={className}>
            {dots}
        </div>
    );
};

export default UserListening;
