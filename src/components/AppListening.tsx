import React, { useState, useEffect, useRef, useMemo, use } from 'react';
import useMicStreamHz from '@/fns/useMicStreamHz';
import useModeValueEveryInterval from '@/fns/useModeValueEveryInterval';
import hzToNote from '@/fns/hzToNote';
import Dot, { DotStyle } from './Dot';
import { useGlobalContext } from '@/context/GlobalContext';

interface Props {
    bpm: number;
    className?: string;
    expectedSequence: string[];
    onFinish: (noteList: string[]) => any;
    listening: boolean;
    threshold: number;
}

const AppListening = ({
    className, expectedSequence, onFinish, listening, bpm, threshold
}: Props) => {
    const { modeValueReturnRate } = useGlobalContext();
    // Start receiving mic stream in hz
    const hz = useMicStreamHz(listening, threshold);
    // Mic stream as a note
    const note = hzToNote(hz);
    // Mode note per beat
    const modeNote = useModeValueEveryInterval(note, listening ? modeValueReturnRate : null);
    // notes heard
    const [noteList, setNoteList] = useState<string[]>([]);
    // Need a non-reactive reference to noteList
    const noteListRef = useRef(noteList);
    // Dot styles
    const initialDotStyles = useMemo(() => new Array(expectedSequence.length).fill('empty'), [expectedSequence]);
    const [dotStyles, setDotStyles] = useState<DotStyle[]>(initialDotStyles);

    // When mode note changes, add it to the noteList
    useEffect(() => {
        if (modeNote && noteListRef.current.length < expectedSequence.length) {
            setNoteList(prev => {
                noteListRef.current = [...prev, modeNote]
                return [...prev, modeNote]
            });
        }
    }, [modeNote, expectedSequence, noteListRef]);

    // do dotStyles
    useEffect(() => {
        if (!listening) {
            return () => { };
        }

        const newDotStyles = initialDotStyles;

        // First make all of the current & past beats blue. We'll overwrite red/green afterwards
        for (let i = 0; i < noteList.length + 1; i++) {
            if (newDotStyles[i]) {
                newDotStyles[i] = 'empty';
            }
        }

        // compare to expectedSequence
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i] === expectedSequence[i].replace(/[0-9]/g, '')) {
                newDotStyles[i] = 'blue';
            } else {
                newDotStyles[i] = 'red';
            }
        }

        setDotStyles(newDotStyles);
    }, [noteList, listening, expectedSequence, initialDotStyles]);

    // call onFinish after expectedSequence.length notes heard
    useEffect(() => {
        if (noteList.length === expectedSequence.length) {
            onFinish(noteList);
        }
    }, [bpm, expectedSequence.length, noteList, onFinish]);

    // reset when stopped
    useEffect(() => {
        if (!listening) {
            setNoteList([]);
            noteListRef.current = [];
            setDotStyles(initialDotStyles);
        }
    }, [listening, initialDotStyles]);

    return (
        <div className={className}>
            {dotStyles.map((i, index) => (
                <Dot
                    className={dotStyles.length === index + 1 ? '' : 'mr-4'}
                    key={index}
                    variant={i}
                />
            ))}
        </div>
    );
};

export default AppListening;
