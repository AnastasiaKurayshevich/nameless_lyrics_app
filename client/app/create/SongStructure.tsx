import React from 'react';

type SongPart = {
  name: string;
  lyrics: string;
}

type SongStructureProps = {
  isVisible: boolean;
  structure: SongPart[];
  setStructure: (parts: SongPart[]) => void;
  isGenerating: boolean; 
  onLyricsChange: (updatedPart: SongPart, index: number) => void;
  onRegeneratePart: (part: SongPart) => void; 
}

export default function SongStructure({ 
  isVisible, 
  structure, 
  setStructure, 
  isGenerating,
  onLyricsChange,
  onRegeneratePart,
  
} : SongStructureProps) {

  const handleClick = (partName: string) => {
    setStructure([...structure, { name: partName, lyrics: "" }]);
  };

  // const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
  //   let updatedParts = [...structure];
  //   updatedParts[index].lyrics = event.target.value;
  //   setStructure(updatedParts);
  // };

  const handleDelete = (index: number) => {
    let updatedParts = [...structure];
    updatedParts.splice(index, 1);
    setStructure(updatedParts);
  };

  const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const updatedPart = { ...structure[index], lyrics: event.target.value };
    onLyricsChange(updatedPart, index); 
    let updatedParts = [...structure];
    updatedParts[index].lyrics = event.target.value;
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
          <button className='btn btn-outline btn-success btn-sm'  type="button" onClick={() => handleClick('Outro')}>Outro</button>
        </div>
      )}
      {structure.map((part, index) => (
        <div key={index}>
          <h3>{part.name}</h3>
          <textarea
            className="textarea textarea-success"
            cols={40}
            rows={8}
            value={part.lyrics}
            onChange={(event) => handleLyricsChange(event, index)}
          />
          <button className='btn btn-circle btn-outline btn-xs' type="button" onClick={() => handleDelete(index)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>

          </button>
          <button
            className="btn btn-outline btn-error btn-xs"
            type="button"
            onClick={() => onRegeneratePart(part)} 
            disabled={isGenerating}
          >
            {isGenerating ? "Regenerating..." : "Regenerate"}
          </button>
        </div>
      ))}
    </div>
  );
}
