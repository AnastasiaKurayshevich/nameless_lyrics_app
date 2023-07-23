"use client";
import { type } from "os";
import React, { useEffect, useState } from "react";
import SongStructure from "./SongStructure";
import Link from "next/link";

type SongPart = {
  name: string;
  lyrics: string;
};

type APISongPart = {
  lyricTitle: string;
  lyric: string;
};

type APISong = {
  id: number;
  songName: string | null;
  songList: APISongPart[];
};

type FormData = {
  genre?: string;
  mood?: string;
  description?: string;
  structure?: SongPart[];
};

export default function Create() {
  const [formData, setFormData] = useState<FormData>({
    genre: "",
    mood: "",
    description: "",
    structure: [],
  });

  const [formDataRegenerate, setFormDataRegenerate] = useState<FormData>({});

  const [isGenerating, setIsGenerating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [songData, setSongData] = useState<APISong | null>(null);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);


  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, genre: event.target.value });
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, mood: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, description: event.target.value });
  };

  const setStructure = (parts: SongPart[]) => {
    setFormData({ ...formData, structure: parts });
  };

  const convertToJsonString = (songPartList: SongPart[] | undefined): string => {
    let result = "";

    if(songPartList !== undefined){

    for (let i = 0; i < songPartList.length; i++) {
        const { name, lyrics } = songPartList[i];

        result += '*' + name.toUpperCase() + '*';

        if (lyrics.length !== 0) {
            result += '\n' + lyrics + `\n(continue generating *${name.toUpperCase()}* with this input)`;
        }

        if (i < songPartList.length - 1) {
            result += "\n";
        }
    }
  }

    return result;
}

const createPrompt = (promptData: FormData): string => {
 const genre = promptData.genre;
 const mood = promptData.mood;
 const description = promptData.description;
 const structure = convertToJsonString(promptData.structure) 
 const prompt = `You are a song writer.
 \n We need you to generate a song based on the following structure:
 \n${structure}
 \n---STOP---
 \nThe song needs to be generated based on following parameters:
 \n mood: ${mood}
 \n genre: ${genre}
 \n description: ${description}
 \n If any of the parameters are null, you are free to generate the song based on random parameters.
 \n You MUST follow the provided structure EXACTLY.
 \n Each part of the song name should be wrapped in asterisk (*) - like that: *INTRO*, *VERSE*, *CHORUS*, *PRE-CHORUS*, *BRIDGE* etc.
 \n The lyrics you generate should only include the song part name and the lyrics for that part. No other information is required. Do not give the song a name.`
  return prompt;
}

const regeneratePrompt = (promptData: FormData): string => {
  
  const genre = promptData.genre;
  const mood = promptData.mood;
  const description = promptData.description;
  const songPart = "";
  const lyrics = ""; 
 // const structure = convertToJsonString(promptData.structure) 
  const prompt = `You are a song writer.
  \n We need you to rewrite this *${songPart.toUpperCase()}*: 
  \n
  \n ${lyrics}
  \n
  \n based on the following parameters:
  \n mood: ${mood}
  \n genre: ${genre}
  \n description: ${description}
  \n If any of the parameters are null, you are free to generate the song based on random parameters.
  \n Each part of the song name should be wrapped in asterisk (*) - like that: *INTRO*, *VERSE*, *CHORUS*, *PRE-CHORUS*, *BRIDGE* etc.
  \n The lyrics you generate should only include the song part name and the lyrics for that part. No other information can be added.`
   return prompt;
}
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setFormDataRegenerate(formData);
    event.preventDefault();
    setIsGenerating(true);

    fetch("http://localhost:8080/api/new-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: createPrompt(formData),
    })
      .then((response) => response.json())
      .then((data: APISong) => {
        setIsGenerating(false);
        setSongData(data);
        const newStructure = formData.structure!.map((part) => {
          const apiPart = data.songList.find(
            (apiPart) => apiPart.lyricTitle.toUpperCase() === part.name.toUpperCase()
          );

          if (apiPart) {
            return { ...part, lyrics: apiPart.lyric };
          } else {
            return part;
          }
        });
        setStructure(newStructure);
      })
      .catch((error) => {
        console.log(error);
        setIsGenerating(false);
      });
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
  
    fetch("http://localhost:8080/api/new-song", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: createPrompt(formDataRegenerate),
   })
     .then((response) => response.json())
     .then((data: APISong) => {
       setIsGenerating(false);
       setSongData(data);
       const newStructure = formData.structure!.map(part => {
        const apiPart = data.songList.find(
          (apiPart) => apiPart.lyricTitle.toUpperCase() === part.name.toUpperCase()
        );
 
         if(apiPart) {
           return { ...part, lyrics: apiPart.lyric };
         } else {
           return part;
         }
       });
 
       setStructure(newStructure);
     })
     .catch((error) => {
       console.log(error);
       setIsGenerating(false);      
     });
 
   console.log(formData);
    
   };

   const handleSave = () => {
    setIsSaveModalVisible(true);
  };



  return (
    <div className="create-flex-container">
      <h2 className="text-3xl font-bold underline">Create</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <select className="select select-accent w-full max-w-xs" value={formData.genre} onChange={handleGenreChange}>
            <option value="">Genre</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Blues">Blues</option>
          </select>
        </label>
        <br />
        <label>
          <select className="select select-accent w-full max-w-xs" value={formData.mood} onChange={handleMoodChange}>
            <option value="">Mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Angsty">Angsty</option>
          </select>
        </label>
        <br />
        <label>
          <textarea
            className="textarea textarea-success"
            placeholder="Description"
            cols={50}
            rows={5}
            value={formData.description}
            onChange={handleDescriptionChange}
          ></textarea>
        </label>
        <br />
        <button
          className="customise-btn btn btn-outline btn-success btn-sm"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          Customise
        </button>
        <SongStructure
          isVisible={isVisible}
          structure={formData.structure || []}
          setStructure={setStructure}
        />
        <div className="flex-container">
        {songData ? (
          <>
            <button className="btn btn-outline btn-error btn-sm" type="button" onClick={handleRegenerate} disabled={isGenerating}>
              {isGenerating ? "Regenerating..." : "Regenerate all"}
            </button>
            <button className="btn btn-active btn-neutral btn-sm" type="button" disabled={isGenerating}>
              Save
            </button>
          </>
        ) : (
          <button className="btn btn-outline btn-success btn-sm" type="submit" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        )}
        <Link href="../home">
          <button className="btn btn-outline btn-success btn-sm">
            Home
          </button>
        </Link>
        </div>
        
      </form>
    </div>
  );
}
