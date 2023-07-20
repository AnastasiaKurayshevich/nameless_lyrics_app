import React, { useState } from 'react'

type SongPart = {
  name: string;
  lyrics: string;
}

type SongStructureProps = {
  structure: SongPart[];
  setStructure: (parts: SongPart[]) => void; 
}

export default function SongStructure({ structure, setStructure} : SongStructureProps) {
 // const [songParts, setSongParts] = useState<SongPart[]>([]);

  const handleClick = (partName: string) => {
    setStructure([...structure, { name: partName, lyrics: "" }]);
  };

  const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    let updatedParts = [...structure];
    updatedParts[index].lyrics = event.target.value;
    setStructure(updatedParts);
  };

  return (
    <div>
      <button type="button" onClick={() => handleClick('Intro')}>Intro</button>
      <button type="button" onClick={() => handleClick('Verse')}>Verse</button>
      <button type="button" onClick={() => handleClick('Chorus')}>Chorus</button>
      <button type="button" onClick={() => handleClick('Pre-Chorus')}>Pre-Chorus</button>
      <button type="button" onClick={() => handleClick('Bridge')}>Bridge</button>


      {structure.map((part, index) => (
        <div key={index}>
          <h3>{part.name}</h3>
          <textarea
            value={part.lyrics}
            onChange={(event) => handleLyricsChange(event, index)}
          />
        </div>
      ))}
    </div>
  )
}

