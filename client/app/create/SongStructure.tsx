import React from 'react';

type SongPart = {
  name: string;
  lyrics: string;
}

type SongStructureProps = {
  isVisible: boolean;
  structure: SongPart[];
  setStructure: (parts: SongPart[]) => void;
}

export default function SongStructure({ isVisible, structure, setStructure } : SongStructureProps) {
  const handleClick = (partName: string) => {
    setStructure([...structure, { name: partName, lyrics: "" }]);
  };

  const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    let updatedParts = [...structure];
    updatedParts[index].lyrics = event.target.value;
    setStructure(updatedParts);
  };

  const handleDelete = (index: number) => {
    let updatedParts = [...structure];
    updatedParts.splice(index, 1);
    setStructure(updatedParts);
  };

  return (
    <div>
      {isVisible && (
        <div className='add-song-part'>
          <button className='btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Intro')}>Intro</button>
          <button className='btn btn-outline btn-success btn-sm'  type="button" onClick={() => handleClick('Verse')}>Verse</button>
          <button className='btn btn-outline btn-success btn-sm'  type="button" onClick={() => handleClick('Chorus')}>Chorus</button>
          <button className='btn btn-outline btn-success btn-sm'  type="button" onClick={() => handleClick('Pre-Chorus')}>Pre-Chorus</button>
          <button className='btn btn-outline btn-success btn-sm'  type="button" onClick={() => handleClick('Bridge')}>Bridge</button>
        </div>
      )}
      {structure.map((part, index) => (
        <div key={index}>
          <h3>{part.name}</h3>
          <textarea
            cols={40}
            rows={8}
            value={part.lyrics}
            onChange={(event) => handleLyricsChange(event, index)}
          />
          <button type="button" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
