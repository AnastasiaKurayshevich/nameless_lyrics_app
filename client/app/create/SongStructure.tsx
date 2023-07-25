import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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
}: SongStructureProps) {

  const handleClick = (partName: string) => {
    setStructure([...structure, { name: partName, lyrics: "" }]);
  };

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


  }
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(structure);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log(items);
    setStructure(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {isVisible && (
        <div className='add-song-part'>
          <button className='customise-options btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Intro')}>Intro</button>
          <button className='customise-options btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Verse')}>Verse</button>
          <button className='customise-options btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Chorus')}>Chorus</button>
          <button className='customise-options btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Pre-Chorus')}>Pre-Chorus</button>
          <button className='customise-options btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Bridge')}>Bridge</button>
          <button className='customise-options btn btn-outline btn-success btn-sm' type="button" onClick={() => handleClick('Outro')}>Outro</button>
        </div>
      )}
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {structure.map((part: SongPart, index: number) => (
              <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                {(provided) => (
                  
                  <div
                    className='card card-draggable green'
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className='nav' {...provided.dragHandleProps}>
                      <h2 className="">{part.name}</h2>
                      <button 
                        className='material-icons-round' 
                        type="button" 
                        onClick={() => handleDelete(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <div className='text'>
                      <textarea
                        className="textarea-auto"
                        cols={60}
                        rows={5}
                        value={part.lyrics}
                        onChange={(event) => handleLyricsChange(event, index)}
                      />
                    </div>
                    <button
                      className='material-icons-round'
                      type="button"
                      onClick={() => handleDelete(index)}
                    >
                    </button>
                    <div className="bottom-nav">
                    <i className='fas fa-redo' ></i>
                      <button
                        className="btn btn-outline btn-xs"
                        type="button"
                        onClick={() => onRegeneratePart(part)}
                        disabled={isGenerating}
                      >
                        {isGenerating ? "Regenerating..." : "Regenerate"}
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
