"use client"

import NumberInput from "@/components/NumberInput";
import NumberInput2 from "@/components/NumberInput2";
import Player from "@/components/Player";
import NoteSelector from "@/components/NoteSelector";
import { useCallback, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useGlobalContext } from "@/context/GlobalContext";
import LabelWithPopover from "@/components/LabelWithPopover";

const ThresholdLabel = <LabelWithPopover label="Threshold" info="Amplitude threshold for detecting a note. Increase this value to analyze less ambient sound." />

export type Note = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B'

export default function Home() {
  const [numNotes, setNumNotes] = useState<number | null>(null)
  const [bpm, setBpm] = useState<number | null>(null)
  const [scale, setScale] = useState<Note[] | null>(null)
  // Increase value to analyze less ambient sound
  const [threshold, setThreshold] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { setDidGetMicPermission, didGetMicPermission } = useGlobalContext()

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

  useEffect(() => {
    setNumNotes(Number(Cookies.get('numNotes')) || 4)
    setBpm(Number(Cookies.get('bpm')) || 80)
    setScale(Cookies.get('scale')?.split(',') as Note[] || ['C', 'D', 'E', 'F', 'G', 'A', 'B'])
    setThreshold(Number(Cookies.get('threshold')) || .001)
  }, [])

  useEffect(() => {
    if (bpm) {
      Cookies.set('bpm', bpm.toString())
    }
  }, [bpm])

  useEffect(() => {
    if (scale) {
      Cookies.set('scale', scale.toString())
    }
  }, [scale])

  useEffect(() => {
    if (numNotes) {
      Cookies.set('numNotes', numNotes.toString())
    }
  }, [numNotes])

  useEffect(() => {
    if (threshold) {
      Cookies.set('threshold', threshold.toString())
    }
  }, [threshold])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 text-center">
      <div className="flex flex-col flex-grow justify-end">
        {typeof bpm === "number" && typeof numNotes === "number" && scale && <Player numNotes={numNotes} scale={scale} bpm={bpm} isPlaying={isPlaying} threshold={Number(threshold)} />}
        <div className="flex gap-6 justify-between items-center mb-4">
          {typeof bpm === "number" && <NumberInput2 label="BPM" value={bpm} setValue={setBpm} min={20} max={200} />}
          {typeof numNotes === "number" && <NumberInput value={numNotes} setValue={setNumNotes} min={1} max={10} label="Sequence length" />}
          {typeof threshold === "number" && <NumberInput2 label={ThresholdLabel} value={threshold} setValue={setThreshold} min={0} max={1} step={.001} inputClass="w-16" />}
        </div>
        {scale && <NoteSelector className="mb-10" scale={scale} setScale={setScale} />}
        <button onClick={onClickStart} className="mx-auto w-fit rounded py-2 px-6 bg-blue-500 text-color uppercase">{isPlaying ? "Stop" : "Start"}</button>
      </div>
      <div className="prose prose-invert prose-lg flex flex-col flex-grow justify-end">
        <p>Listen to the melody, then play it back.</p>
        <small className="block">Requires microphone access</small>
      </div>
    </main>
  );
}
