import React, { useState, useEffect, useRef, useMemo, use } from 'react';
import useMicStreamHz from '@/fns/useMicStreamHz';
import useModeValueEveryInterval from '@/fns/useModeValueEveryInterval';
import hzToNote from '@/fns/hzToNote';
import Dot, { DotStyle } from './Dot';
import CONSTANTS from '@/constants/constants.json';
import { Note } from '../app/page';

const { MODE_VALUE_RETURN_RATE } = CONSTANTS;

interface Props {
    bpm: number;
    className?: string;
    expectedSequenceRef: React.MutableRefObject<string[]>;
    onFinish: (noteList: Note[]) => void;
    listening: boolean;
    threshold: number;
}

const AppListening = ({
    className, expectedSequenceRef, onFinish, listening, threshold, bpm
}: Props) => {
    // Start receiving mic stream in hz
    const hz = useMicStreamHz(listening, threshold);
    // Mic stream as a note
    const note = hzToNote(hz);
    // Mode note per beat
    const modeNote = useModeValueEveryInterval(note, listening ? MODE_VALUE_RETURN_RATE : null);
    // notes heard
    const [noteList, setNoteList] = useState<Note[]>([]);
    // Need a non-reactive reference to noteList
    const noteListRef = useRef(noteList);
    // Dot styles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialDotStyles = useMemo(() => new Array(expectedSequenceRef.current.length).fill('empty'), [expectedSequenceRef.current]);
    const [dotStyles, setDotStyles] = useState<DotStyle[]>(initialDotStyles);

    // When mode note changes, add it to the noteList
    useEffect(() => {
        if (!listening || !modeNote) {
            return () => { };
        }

        if (noteListRef.current.length < expectedSequenceRef.current.length) {
            setNoteList(prev => {
                noteListRef.current = [...prev, modeNote]
                return [...prev, modeNote]
            });
        }
    }, [listening, modeNote, expectedSequenceRef, noteListRef]);

    // do dotStyles
    useEffect(() => {
        if (!listening) {
            return () => { };
        }

        const newDotStyles = [...initialDotStyles];

        // compare to expectedSequence
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i] === expectedSequenceRef.current[i].replace(/[0-9]/g, '')) {
                newDotStyles[i] = 'blue';
            } else {
                newDotStyles[i] = 'red';
            }
        }

        setDotStyles(newDotStyles);
    }, [noteList, listening, expectedSequenceRef, initialDotStyles]);

    useEffect(() => {
        if (noteList.length === expectedSequenceRef.current.length) {
            setTimeout(() => {
                const currentNoteList = noteListRef.current;
                setNoteList([]);
                noteListRef.current = [];
                onFinish(currentNoteList);
            }, 60 * 1000 / bpm);
        }
    }, [noteList, bpm, expectedSequenceRef, onFinish]);

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
