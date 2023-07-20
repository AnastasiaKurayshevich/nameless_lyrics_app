import React, { useState } from 'react'

type SongPart = {
  name: string;
  lyrics: string;
}

export default function SongStructure() {
  const [songParts, setSongParts] = useState<SongPart[]>([]);

  const handleClick = (partName: string) => {
    setSongParts([...songParts, { name: partName, lyrics: "" }]);
  };

  const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    let updatedParts = [...songParts];
    updatedParts[index].lyrics = event.target.value;
    setSongParts(updatedParts);
  };

  return (
    <div>
      <button type="button" onClick={() => handleClick('Intro')}>Intro</button>
      <button type="button" onClick={() => handleClick('Verse')}>Verse</button>
      <button type="button" onClick={() => handleClick('Chorus')}>Chorus</button>
      <button type="button" onClick={() => handleClick('Pre-Chorus')}>Pre-Chorus</button>
      <button type="button" onClick={() => handleClick('Bridge')}>Bridge</button>


      {songParts.map((part, index) => (
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

