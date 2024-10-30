"use client";

import { useEffect, useCallback, useState } from 'react';
import UserListening from './UserListening';
import AppListening from './AppListening';
import EmptyDots from './EmptyDots';
import { useGlobalContext } from '@/context/GlobalContext';

type PlayerProps = {
    numNotes: number;
    scale: string[];
    bpm: number;
    isPlaying: boolean;
    threshold: number;
}

const Player: React.FC<PlayerProps> = ({ numNotes, scale, bpm, isPlaying, threshold }) => {
    // Who is listening? The user or the app?
    const [listeningMode, setListeningMode] = useState<'user' | 'app' | 'stopped'>('stopped');
    const { isLoaded } = useGlobalContext();
    const [sequence, setSequence] = useState<string[]>([]);

    const getSequence = useCallback(() => {
        const result = [];
        let previousItem = '';

        for (let i = 0; i < numNotes; i++) {
            let randomItem;
            // Avoid repeating the same note twice in a row
            do {
                randomItem = scale[Math.floor(Math.random() * scale.length)];
            } while (randomItem === previousItem);

            previousItem = randomItem;
            result.push(`${randomItem}4`);
        }

        return result;
    }, [numNotes, scale]);

    useEffect(() => {
        if (isPlaying) {
            setSequence(getSequence())
        }

        setListeningMode(isPlaying ? 'user' : 'stopped');
    }, [isPlaying, getSequence])

    const onSequenceEnded = useCallback(() => {
        // Waiting one beat feels more intuitive for the user
        setTimeout(() => {
            setListeningMode('app');
        }, 60 * 1000 / bpm);
    }, [bpm])

    const onFinishAppListening = useCallback(() => {
        // Waiting one beat feels more intuitive for the user
        setTimeout(() => {
            setSequence(getSequence())
            setListeningMode('user');
        }, 60 * 1000 / bpm);
    }, [getSequence, bpm])

    if (!isLoaded) {
        return <div className='relative' style={{ height: 100 }}>
            <p className='text-color'>Loading...</p>
        </div>
    }

    return (
        <div className='relative' style={{ height: 100 }}>
            {listeningMode === 'stopped' && <EmptyDots numNotes={numNotes} />}
            {listeningMode !== 'stopped' &&
                <>
                    <div className={`w-full duration-300 absolute ${listeningMode === 'app' ? '-translate-x-6 opacity-0' : undefined}`} >
                        <UserListening
                            numNotes={numNotes}
                            sequence={sequence}
                            bpm={bpm}
                            play={listeningMode === 'user'}
                            onSequenceEnded={onSequenceEnded}
                        />
                    </div>
                    <div className={`w-full duration-300 absolute ${listeningMode === 'user' ? 'translate-x-6 opacity-0' : undefined}`}>
                        <AppListening
                            bpm={bpm}
                            threshold={threshold}
                            expectedSequence={sequence}
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
