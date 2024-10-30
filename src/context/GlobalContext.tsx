"use client"

import React, { useState, createContext, useContext, useRef, ReactNode, useEffect } from 'react';
import { Howl } from 'howler';
import MF_SPRITE from '@/constants/mf.json';
import Cookies from "js-cookie"

interface GlobalContextProps {
    howlRef: React.MutableRefObject<Howl | null>;
    isLoaded: boolean;
    didGetMicPermission: boolean;
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

    return (
        <GlobalContext.Provider value={{
            howlRef, isLoaded, didGetMicPermission, setDidGetMicPermission
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