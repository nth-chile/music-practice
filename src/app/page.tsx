"use client"

import NumberInput2 from "@/components/NumberInput2";
import Player from "@/components/Player";
import { useCallback, useEffect, useState } from "react"
import { useGlobalContext } from "@/context/GlobalContext";
import LabelWithPopover from "@/components/LabelWithPopover";
import { CookiesProvider, useCookies } from "react-cookie";
import CONSTANTS from "@/constants/constants.json";
import resetCookiesIfVersionNumberChanged from "@/fns/resetCookiesIfVersionNumberChanged";
import useLevel from "@/fns/useLevel";

const { COOKIE_OPTIONS, COOKIE_DEFAULTS: { bpm: DEFAULT_BPM, threshold: DEFAULT_THRESHOLD } } = CONSTANTS

const ThresholdLabel = <LabelWithPopover label="Threshold" info="Amplitude threshold for detecting a note. Increase this value to analyze less ambient sound." />

export type Note = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B'

function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const { didGetMicPermission } = useGlobalContext()
  // react-cookie converts level to a number, so we need to convert it back
  const [{ bpm = DEFAULT_BPM, threshold = DEFAULT_THRESHOLD }, setCookie] = useCookies(['bpm', 'threshold']);
  const { level, scale } = useLevel()
  const [didMount, setDidMount] = useState(false)
  const [firstTryCorrectStreak, setFirstTryCorrectStreak] = useState<number>(0);

  useEffect(() => {
    resetCookiesIfVersionNumberChanged()
    // For the components that need cookies for render, use this to prevent UI mismatch between server and client
    setDidMount(true)
  }, [])

  const onClickStart = useCallback(() => {
    if (!didGetMicPermission.current) {
      // request mic access
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          didGetMicPermission.current = true
        })
    }

    setIsPlaying(!isPlaying)
  }, [isPlaying, didGetMicPermission])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 text-center">
      <div className="flex flex-col flex-grow justify-end">
        {didMount && <>
          {typeof bpm === "number" && level && <Player setFirstTryCorrectStreak={setFirstTryCorrectStreak} isPlaying={isPlaying} />}
          <div className="flex gap-6 justify-between items-center mb-6 prose prose-invert">
            <div>
              <h2 className="m-0">Level</h2>
              <p className="prose-2xl m-0">{level}</p>
            </div>
            <div>
              <h2 className="m-0">Streak</h2>
              <p className="prose-2xl m-0">{firstTryCorrectStreak}</p>
            </div>
            <div>
              <h2 className="m-0">Notes</h2>
              <p className="prose-2xl m-0">{scale.join(', ')}</p>
            </div>
          </div>
          <button onClick={onClickStart} className="mx-auto w-fit rounded py-2 px-6 mb-8 bg-blue-500 text-color uppercase">{isPlaying ? "Stop" : "Start"}</button>
          <div className="flex gap-6 justify-between items-center">
            {typeof bpm === "number" && <NumberInput2 label="BPM" value={bpm} setValue={v => setCookie('bpm', v)} min={20} max={200} />}
            {typeof threshold === "number" && <NumberInput2 label={ThresholdLabel} value={threshold} setValue={v => setCookie('threshold', v)} min={0} max={1} step={.001} inputClass="w-16" />}
          </div>
        </>}
      </div>
      <div className="prose prose-invert prose-lg flex flex-col flex-grow justify-end">
        <p>Listen to the melody, then play it back.</p>
        <small className="block">Requires microphone access</small>
      </div>
    </main>
  );
}

export default function HomeWithCookies() {
  return (
    <CookiesProvider defaultSetOptions={COOKIE_OPTIONS}>
      <Home />
    </CookiesProvider>
  )
}