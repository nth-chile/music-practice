/** Plays sounds using audio sprites. Reacts to input parameters, 
 * takes event callbacks, returns some info
 * 
 * Make sure to use useCallback for onSequenceEnded
*/

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const FADE_DURATION = 250;

type UseInstrumentProps = {
  bpm: number;
  onSequenceEnded?: () => any;
  sequenceRef: React.MutableRefObject<string[]>;
  play: boolean;
};

export default function useInstrument({
  bpm,
  onSequenceEnded,
  sequenceRef,
  play
}: UseInstrumentProps) {
  const { howlRef } = useGlobalContext();
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false);

  const noteDuration = useMemo(() => {
    return 60 / bpm * 1000;
  }, [bpm])

  useEffect(() => {
    setIsPlaying(play)
  }, [play])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, []);

  const playSequence = useCallback(() => {
    // Using a local index even though we have currentNoteIndex because of function scoping
    let index = 0
    // Store currently played sound so we can fade it to 0
    let soundId: number | undefined

    function playNextNote() {
      // If a sound is playing, fade it to 0
      if (soundId !== undefined) {
        howlRef.current?.fade(1, 0, FADE_DURATION, soundId)
      }

      const nextNote = sequenceRef.current[index]

      if (!nextNote) {
        if (onSequenceEnded) {
          setIsPlaying(false)
          onSequenceEnded()
        }

        return
      }

      index = index + 1
      setCurrentNoteIndex(index)
      soundId = howlRef.current?.play(nextNote)
      timeoutRef.current = setTimeout(playNextNote, noteDuration)
    }

    playNextNote()
  }, [sequenceRef, noteDuration, onSequenceEnded, howlRef])

  // Handle start and stop
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!isPlaying) {
      timeoutRef.current = null
      howlRef.current?.stop()
    } else {
      playSequence()
    }
  }, [isPlaying, playSequence, howlRef]);

  return { currentNoteIndex };
}
