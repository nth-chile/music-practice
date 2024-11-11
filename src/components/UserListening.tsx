import React, { useCallback } from 'react';
import Dot from './Dot';
import useInstrument from '@/fns/useInstrument';
import useLevel from '@/fns/useLevel';

interface Props {
    className?: string;
    sequenceRef: React.MutableRefObject<string[]>;
    bpm: number;
    play: boolean;
    setListeningMode: React.Dispatch<React.SetStateAction<'user' | 'app' | 'stopped'>>;
}

const UserListening = ({
    bpm, sequenceRef, className, play, setListeningMode
}: Props) => {
    const onSequenceEnded = useCallback(() => {
        setTimeout(() => {
            setListeningMode('app');
        }, 60 * 1000 / bpm);
    }, [bpm, setListeningMode]);

    const { currentNoteIndex } = useInstrument({
        bpm,
        onSequenceEnded,
        sequenceRef,
        play
    })

    const { numNotes } = useLevel();

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
