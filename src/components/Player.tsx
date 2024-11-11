"use client";

import { useEffect, useCallback, useState, Dispatch, SetStateAction, useRef } from 'react';
import UserListening from './UserListening';
import AppListening from './AppListening';
import EmptyDots from './EmptyDots';
import { useGlobalContext } from '@/context/GlobalContext';
import { Note } from '../app/page';
import getNextLevelKey from '@/fns/getNextLevelKey';
import getPrevLevelKey from '@/fns/getPrevLevelKey';
import { useCookies } from 'react-cookie';
import LEVELS from '@/constants/levels.json';
import useLevel from '@/fns/useLevel';

type PlayerProps = {
    isPlaying: boolean;
    setFirstTryCorrectStreak: Dispatch<SetStateAction<number>>;
}

const Player: React.FC<PlayerProps> = ({ isPlaying, setFirstTryCorrectStreak }) => {
    // Who is listening? The user or the app?
    const [listeningMode, setListeningMode] = useState<'user' | 'app' | 'stopped'>('stopped');
    const { isLoaded } = useGlobalContext();
    const [{ bpm, threshold }] = useCookies(['bpm', 'threshold']);
    const { level, numNotes, scale, setLevel } = useLevel();
    const firstTryCorrectStreak = useRef(0);
    const firstTryIncorrectStreak = useRef(0);
    const sequence = useRef<string[]>([]);

    const getSequence = useCallback(() => {
        let result: string[] = [];

        function generateSequence() {
            let previousItem = '';
            result = [];

            for (let i = 0; i < numNotes; i++) {
                let randomItem;
                // Avoid repeating the same note twice in a row
                do {
                    randomItem = scale[Math.floor(Math.random() * scale.length)];
                } while (randomItem === previousItem);

                previousItem = randomItem;
                result.push(`${randomItem}4`);
            }
        }

        // Avoid returning the same sequence as sequence.current
        let attempts = 0;
        do {
            generateSequence();
            attempts++;
        } while (attempts < 5 && result.join('') === sequence.current?.join(''));

        return result;
    }, [numNotes, scale]);

    useEffect(() => {
        sequence.current = getSequence();
    }, [getSequence, numNotes])

    useEffect(() => {
        setListeningMode(isPlaying ? 'user' : 'stopped');
    }, [isPlaying, getSequence])

    const onFinishAppListening = useCallback((noteList: Note[]) => {
        const isCorrect = !noteList.some((note, index) => note !== sequence.current![index].replace(/\d+/g, ''))

        if (isCorrect) {
            firstTryCorrectStreak.current = firstTryCorrectStreak.current + 1
            firstTryIncorrectStreak.current = 0

            if (firstTryCorrectStreak.current === 5 && level !== Object.keys(LEVELS)[Object.keys(LEVELS).length - 1]) {
                firstTryCorrectStreak.current = 0
                setLevel(getNextLevelKey(level))
            } else {
                sequence.current = getSequence();
            }

            setFirstTryCorrectStreak(firstTryCorrectStreak.current)
        } else {
            firstTryCorrectStreak.current = 0
            setFirstTryCorrectStreak(0)
            firstTryIncorrectStreak.current = firstTryIncorrectStreak.current + 1

            if (firstTryIncorrectStreak.current === 3 && level !== Object.keys(LEVELS)[0]) {
                firstTryIncorrectStreak.current = 0
                setLevel(getPrevLevelKey(level))
            }
        }

        setListeningMode('user')
    }, [sequence, setFirstTryCorrectStreak, level, setLevel, getSequence])

    if (!isLoaded) {
        return <div className='relative' style={{ height: 100 }}>
            <p className='text-color'>Loading...</p>
        </div>
    }

    return (
        <div className='relative' style={{ height: 100 }}>
            {listeningMode === 'stopped' && <EmptyDots />}
            {listeningMode !== 'stopped' &&
                <>
                    <div className={`w-full duration-300 absolute ${listeningMode === 'app' ? '-translate-x-6 opacity-0' : undefined}`} >
                        <UserListening
                            sequenceRef={sequence}
                            bpm={bpm}
                            play={listeningMode === 'user'}
                            setListeningMode={setListeningMode}
                        />
                    </div>
                    <div className={`w-full duration-300 absolute ${listeningMode === 'user' ? 'translate-x-6 opacity-0' : undefined}`}>
                        <AppListening
                            bpm={bpm}
                            threshold={threshold}
                            expectedSequenceRef={sequence}
                            onFinish={onFinishAppListening}
                            listening={listeningMode === 'app'}
                        />
                    </div>
                </>
            }
        </div>
    );
};

export default Player;
