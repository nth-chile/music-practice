import React from 'react';
import { Note } from '../app/page'

const notes: Note[] = [
    'C', 'Db', 'D', 'Eb', 'E', 'F',
    'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
];

interface NoteSelectorProps {
    className?: string
    scale: Note[];
    setScale: React.Dispatch<React.SetStateAction<Note[] | null>>
}

const NoteSelector = ({ className, scale, setScale }: NoteSelectorProps) => {
    const toggleNoteSelection = (note: Note) => {
        setScale((prev) =>
            prev.includes(note)
                ? prev.filter(n => n !== note)
                : [...prev, note]
        );
    };

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <h3 className="prose prose-invert prose-sm uppercase">Scale</h3>
            <div className="flex flex-wrap justify-center gap-1 w-60">
                {notes.map(note => (
                    <button
                        key={note}
                        onClick={() => toggleNoteSelection(note)}
                        className={`px-2 py-1 rounded ${scale.includes(note) ? 'bg-blue-400' : 'bg-neutral-300'}`}
                        style={{
                            color: scale.includes(note) ? 'white' : 'black',
                        }}
                    >
                        {note}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NoteSelector;
