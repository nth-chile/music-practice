"use client"

import NumberInput from "@/components/NumberInput";
import NumberInput2 from "@/components/NumberInput2";
import Player from "@/components/Player";
import NoteSelector from "@/components/NoteSelector";
import { useCallback, useEffect, useState } from "react"
import { useGlobalContext } from "@/context/GlobalContext";
import LabelWithPopover from "@/components/LabelWithPopover";
import { CookiesProvider, useCookies } from "react-cookie";
import CONSTANTS from "@/constants/constants.json";
import resetCookiesIfVersionNumberChanged from "@/fns/resetCookiesIfVersionNumberChanged";

const { COOKIE_OPTIONS, COOKIE_DEFAULTS: { bpm: DEFAULT_BPM, numNotes: DEFAULT_NUM_NOTES, defaultThreshold: DEFAULT_THRESHOLD, defaultScale: DEFAULT_SCALE } } = CONSTANTS

const ThresholdLabel = <LabelWithPopover label="Threshold" info="Amplitude threshold for detecting a note. Increase this value to analyze less ambient sound." />

export type Note = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B'

function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const { setDidGetMicPermission, didGetMicPermission } = useGlobalContext()
  const [{ bpm = DEFAULT_BPM, numNotes = DEFAULT_NUM_NOTES, threshold = DEFAULT_THRESHOLD, scale = DEFAULT_SCALE }, setCookie] = useCookies(['bpm', 'numNotes', 'threshold', 'scale']);
  const [didMount, setDidMount] = useState(false)

  // For the components that need cookies for render, use this to prevent UI mismatch between server and client
  useEffect(() => {
    resetCookiesIfVersionNumberChanged()
    setDidMount(true)
  }, [])

  const onClickStart = useCallback(() => {
    if (!didGetMicPermission) {
      // request mic access
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setDidGetMicPermission(true)
        })
    }

    setIsPlaying(!isPlaying)
  }, [didGetMicPermission, isPlaying, setDidGetMicPermission])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 text-center">
      <div className="flex flex-col flex-grow justify-end">
        {didMount && <>
          {typeof bpm === "number" && typeof numNotes === "number" && scale && <Player numNotes={numNotes} scale={scale} bpm={bpm} isPlaying={isPlaying} threshold={threshold} />}
          <div className="flex gap-6 justify-between items-center mb-4">
            {typeof bpm === "number" && <NumberInput2 label="BPM" value={bpm} setValue={v => setCookie('bpm', v)} min={20} max={200} />}
            {typeof numNotes === "number" && <NumberInput value={numNotes} setValue={v => setCookie('numNotes', v)} min={1} max={10} label="Sequence length" />}
            {typeof threshold === "number" && <NumberInput2 label={ThresholdLabel} value={threshold} setValue={v => setCookie('threshold', v)} min={0} max={1} step={.001} inputClass="w-16" />}
          </div>
          {scale && <NoteSelector className="mb-10" scale={scale} setScale={v => setCookie('scale', v)} />}
        </>}
        <button onClick={onClickStart} className="mx-auto w-fit rounded py-2 px-6 bg-blue-500 text-color uppercase">{isPlaying ? "Stop" : "Start"}</button>
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