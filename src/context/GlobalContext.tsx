"use client"

import React, { useState, createContext, useContext, useRef, ReactNode, useEffect } from 'react';
import { Howl } from 'howler';
import MF_SPRITE from '@/constants/mf.json';
import Cookies from "js-cookie"

interface GlobalContextProps {
    howlRef: React.MutableRefObject<Howl | null>;
    isLoaded: boolean;
    didGetMicPermission: boolean;
    modeValSampleRate: number;
    pitchDetectRate: number;
    setPitchDetectRate: (value: number) => void;
    setModeValSampleRate: (value: number) => void;
    setDidGetMicPermission: (value: boolean) => void;
}

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const howlRef = useRef<Howl | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [didGetMicPermission, setDidGetMicPermission] = useState(false);
    const [modeValSampleRate, setModeValSampleRate] = useState<number | null>(null);
    const [pitchDetectRate, setPitchDetectRate] = useState<number | null>(null);

    // This takes a while, so let's load it immediately
    useEffect(() => {
        howlRef.current = new Howl({
            src: ['/mf_normalized_denoised_compressed.mp3'],
            sprite: MF_SPRITE as unknown as { [key: string]: [number, number] }
        });

        howlRef.current.once('load', () => {
            setIsLoaded(true);
        });

        return () => {
            howlRef.current?.unload();
        };
    }, []);

    useEffect(() => {
        setModeValSampleRate(Number(Cookies.get('modeValSampleRate')) || 90)
        setPitchDetectRate(Number(Cookies.get('pitchDetectRate')) || 10)
    }, [])

    useEffect(() => {
        if (modeValSampleRate) {
            Cookies.set('modeValSampleRate', modeValSampleRate.toString())
        }
    }, [modeValSampleRate])

    useEffect(() => {
        if (pitchDetectRate) {
            Cookies.set('pitchDetectRate', pitchDetectRate.toString())
        }
    }, [pitchDetectRate])

    return (
        <GlobalContext.Provider value={{
            howlRef, isLoaded, didGetMicPermission, setDidGetMicPermission, modeValSampleRate, setModeValSampleRate, pitchDetectRate, setPitchDetectRate
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};