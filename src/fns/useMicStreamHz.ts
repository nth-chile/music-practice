/**
 * - Requests microphone permission
 * - Returns state with hertz value
 * - Returns null after deciding that it's not hearing a note
 * 
 * ONLY WORKS IF MOUNTED AFTER PAGE HAS RECEIVED USER INTERACTION
 */

import { useEffect, useRef, useState } from 'react';
import Pitchfinder from 'pitchfinder';
import CONSTANTS from '@/constants/constants.json';

const { PITCH_DETECT_RATE } = CONSTANTS

// This is the default, but we need it to init the array
const FFT_SIZE = 2048

// isDetectingPitch might not be necessary but reduces memory usage
const useMicStreamHz = (isDetectingPitch: boolean, threshold: number) => {
    const [hz, setHz] = useState<any>();
    const [didInit, setDidInit] = useState(false);
    const detectPitch = useRef(Pitchfinder.AMDF())
    // array that we'll mutate to hold audio data, which we can then get the pitch from
    const buffer = useRef(new Float32Array(FFT_SIZE));
    const analyser = useRef<AnalyserNode>()

    useEffect(() => {
        let audioContext: AudioContext;
        let source: MediaStreamAudioSourceNode;

        // We already requested mic access, but let's do it again to get the stream
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                audioContext = new AudioContext();
                // createMediaStreamSource creates a new MediaStreamAudioSourceNode object, the audio from which can then be played and manipulated
                source = audioContext.createMediaStreamSource(stream);
                // create an analyser and connect it to the source
                analyser.current = audioContext.createAnalyser();
                analyser.current.fftSize = FFT_SIZE
                source.connect(analyser.current);
                setDidInit(true)
            })

        return () => {
            if (audioContext) {
                audioContext.close();
            }
            if (source) {
                source.disconnect();
            }
            if (analyser.current) {
                analyser.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        function getPitch() {
            if (!isDetectingPitch || !analyser.current) {
                return
            }
            // mutate the buffer array with current audio data
            analyser.current.getFloatTimeDomainData(buffer.current);

            // amplitude threshold to avoid analysing ambient sound
            const amplitude = buffer.current.reduce((sum, value) => {
                return sum + Math.abs(value)
            }, 0) / buffer.current.length;

            if (amplitude > threshold) {
                const pitch = detectPitch.current(buffer.current);
                setHz(pitch)
            }

            // The detectPitch function takes about 10ms on my machine. So, setHz is called every PITCH_DETECT_RATE + ~10ms
            timeout = setTimeout(getPitch, PITCH_DETECT_RATE);
        }
        if (didInit && isDetectingPitch) {
            getPitch();
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [isDetectingPitch, didInit, threshold])

    return hz;
};

export default useMicStreamHz;
