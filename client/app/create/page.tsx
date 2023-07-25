"use client";

import React, { useEffect, useState } from "react";
import SongStructure from "./SongStructure";
import Link from "next/link";
import { APISong, APISongPart, FormData, RegenerateData, SongPart, SongToSave } from "../Types";


export default function Create() {
  const [formData, setFormData] = useState<FormData>({
    genre: "",
    mood: "",
    description: "",
    structure: [],
  });

  const [formDataRegenerate, setFormDataRegenerate] = useState<FormData>({
    genre: "",
    mood: "",
    description: "",
    structure: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [songData, setSongData] = useState<APISong | null>(null);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [songName, setSongName] = useState("");
  const [isGeneratingPart, setIsGeneratingPart] = useState(false);


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

  const convertToJsonString = (
    songPartList: SongPart[] | undefined
  ): string => {
    let result = "";

    if (songPartList !== undefined) {
      for (let i = 0; i < songPartList.length; i++) {
        const { name, lyrics } = songPartList[i];

        result += "*" + name.toUpperCase() + "*";

        if (lyrics.length !== 0) {
          result +=
            "\n" +
            lyrics +
            `\n(continue generating *${name.toUpperCase()}* with this input)`;
        }

        if (i < songPartList.length - 1) {
          result += "\n";
        }
      }
    }

    return result;
  };

  const createPrompt = (promptData: FormData): string => {
    const genre = promptData.genre;
    const mood = promptData.mood;
    const description = promptData.description;
    const structure = convertToJsonString(promptData.structure);

    let prompt = "";
   
    if(structure == ""){
        prompt = `You are a song writer.
      \nWe need you to generate a song based on following parameters:
      \n mood: ${mood}
      \n genre: ${genre}
      \n description: ${description}
      \n If any of the parameters are null, you are free to generate the song based on random parameters.
      \n You can generate your own song structure. 
      \n Each part of the song name should be wrapped in asterisk (*) - like that: *INTRO*, *VERSE*, *CHORUS*, *PRE-CHORUS*, *BRIDGE* etc.
      \n The lyrics you generate should only include the song part name and the lyrics for that part. No other information is required. Do not give the song a name.`;
    } else {

        prompt = `You are a song writer.
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
      \n The lyrics you generate should only include the song part name and the lyrics for that part. No other information is required. Do not give the song a name.`;
    }   
 return prompt;
  };

  const regeneratePrompt = (data: RegenerateData): string => {
    const { genre, mood, description, songPart } = data;
    const { name } = songPart;
  
    const prompt = `You are a song writer.
    \n We need you to create *${name.toUpperCase()}*  
    \n based on the following parameters:
    \n mood: ${mood}
    \n genre: ${genre}
    \n description: ${description}
    \n If any of the parameters are null, you are free to generate the song based on random parameters.
    \n The lyrics you generate should only include the song part name and the lyrics for that part. No other information can be added.`;
  
    console.log(prompt);
    return prompt;
  };


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

        if (formData.structure.length === 0) {
          console.log("I'm inside if statement")
          const randomStructure = data.songList.map((apiPart) => ({
            name: apiPart.lyricTitle.toUpperCase(),
            lyrics: apiPart.lyric,
          }));
          randomStructure.map(line => {
            console.log("name: "+line.name)
            console.log("lyrics: " + line.lyrics)
          })
          setStructure(randomStructure);
        } else {

        const newStructure = formData.structure!.map((part) => {
          const apiPart = data.songList.find(
            (apiPart) =>
              apiPart.lyricTitle.toUpperCase() === part.name.toUpperCase()
          );

          if (apiPart) {
            return { ...part, lyrics: apiPart.lyric };
          } else {
            return part;
          }
        });
        setStructure(newStructure);
      }
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
        const newStructure = formData.structure!.map((part) => {
          const apiPart = data.songList.find(
            (apiPart) =>
              apiPart.lyricTitle.toUpperCase() === part.name.toUpperCase()
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

    console.log(formData);
  };

  const handleSave = () => {
    setIsSaveModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsSaveModalVisible(false);
  };

  const handleModalSave = () => {
    setIsSaveModalVisible(false);

    const songPartsToSave = formData.structure.map(part => ({
      lyricTitle: part.name,
      lyric: part.lyrics,
    }));

    const songToSave: SongToSave = { 
      songName: songName || "Untitled",
      genre: formData.genre, 
      mood: formData.mood,
      description: formData.description,
      songList: songPartsToSave
    };

    fetch("http://localhost:8080/api/save-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songToSave),
    })
      .then((response) => response.json())
      .then((data) => 
      {
        console.log(data)
        const songId = data.id;
        console.log("this is song ID: " + songId);
        window.location.href = `/home/${songId}`;
      })
      .catch((error) => {
        console.log(error);
      });   
  }
  const handleRegeneratePart = (part: SongPart) => {
    setIsGeneratingPart(true);

    const data: RegenerateData = {
      genre: formDataRegenerate.genre || "",
      mood: formDataRegenerate.mood || "",
      description: formDataRegenerate.description || "", 
      songPart: part,
    };

    const dataToRegenerate = regeneratePrompt(data);
    
  
    fetch("http://localhost:8080/api/regenerate-part", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataToRegenerate,
    })
      .then((response) => {
        console.log(response);
        return response.json()
      })
      .then((data: APISongPart) => {
        setIsGeneratingPart(false);
        const updatedStructure = formData.structure!.map((item) =>
          item === part ? { ...item, lyrics: data.lyric } : item
        );
        setStructure(updatedStructure);
      })
      .catch((error) => {
        console.log(error);
        setIsGeneratingPart(false);
      });
  };
const handleLyricsChange = (updatedPart: SongPart, index: number) => {
  const updatedStructure = formData.structure.map((part, i) =>
    i === index ? updatedPart : part
  );
  setFormData({ ...formData, structure: updatedStructure });
  if (songData) {
    const updatedSongData = { ...songData };
    updatedSongData.songList = updatedStructure.map((part) => ({
      lyricTitle: part.name,
      lyric: part.lyrics,
    }));
    setSongData(updatedSongData);
  }
};
  return (
    <div className="create-flex-container">
      <h2 className="text-3xl font-bold underline">Create</h2>
      <form onSubmit={handleSubmit}>
      <label>
  <select
    className="select select-accent w-full max-w-xs"
    value={formData.genre}
    onChange={handleGenreChange}
  >
    <option value="">Genre</option>
    <option value="Alternative">Alternative</option>
    <option value="Blues">Blues</option>
    <option value="Classical">Classical</option>
    <option value="Country">Country</option>
    <option value="Disco">Disco</option>
    <option value="Electronic">Electronic</option>
    <option value="Folk">Folk</option>
    <option value="Funk">Funk</option>
    <option value="Fusion">Fusion</option>
    <option value="Gospel">Gospel</option>
    <option value="Grindcore">Grindcore</option>
    <option value="Grunge">Grunge</option>
    <option value="Hip hop">Hip hop</option>
    <option value="Indie">Indie</option>
    <option value="Jazz">Jazz</option>
    <option value="Metal">Metal</option>
    <option value="Pop">Pop</option>
    <option value="Punk">Punk</option>
    <option value="R&B">R&B</option>
    <option value="Reggae">Reggae</option>
    <option value="Rock">Rock</option>
    <option value="Salsa">Salsa</option>
    <option value="Samba">Samba</option>
    <option value="Ska">Ska</option>
    <option value="Soul">Soul</option>
    <option value="Techno">Techno</option>
  </select>
</label>
<br />
<label>
  <select
    className="select select-accent w-full max-w-xs"
    value={formData.mood}
    onChange={handleMoodChange}
  >
    <option value="">Mood</option>
    <option value="Angry">Angry</option>
    <option value="Anxious">Anxious</option>
    <option value="Blissful">Blissful</option>
    <option value="Calm">Calm</option>
    <option value="Cheerful">Cheerful</option>
    <option value="Depressed">Depressed</option>
    <option value="Energetic">Energetic</option>
    <option value="Grateful">Grateful</option>
    <option value="Hopeful">Hopeful</option>
    <option value="Inspirational">Inspirational</option>
    <option value="Joyful">Joyful</option>
    <option value="Melancholic">Melancholic</option>
    <option value="Optimistic">Optimistic</option>
    <option value="Peaceful">Peaceful</option>
    <option value="Reflective">Reflective</option>
    <option value="Romantic">Romantic</option>
    <option value="Silly">Silly</option>
    <option value="Thoughtful">Thoughtful</option>
    <option value="Upbeat">Upbeat</option>
    <option value="Whimsical">Whimsical</option>
  </select>
</label>

        <br />
        <label>
          <textarea
            className="textareaa"
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
          onRegeneratePart={handleRegeneratePart}
          onLyricsChange={handleLyricsChange} 
          isGenerating={isGeneratingPart}
        />
        <div className="flex-container">
        {songData ? (
          <>
            <button className="btn btn-outline btn-error btn-sm" type="button" onClick={handleRegenerate} disabled={isGenerating}>
              {isGenerating ? "Regenerating..." : "Regenerate all"}
            </button>
            <button className="btn btn-active btn-neutral btn-sm" type="button" onClick={handleSave} disabled={isGenerating}>
              Save
            </button>
          </>
        ) : (
          <button className="btn btn-outline btn-success btn-sm" type="submit" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        )}
       </div>
      </form>
      {isSaveModalVisible && (
        <div>
          <div>
            <h3>Save Song</h3>
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Enter song name"
            />
            <button type="button" onClick={handleModalSave}>Save</button>
            <button type="button" onClick={handleModalCancel}>Cancel</button>
          </div>
        </div>
      )}
      <Link href="../home">
          <button className="btn btn-outline btn-success btn-sm">
            Home
          </button>
        </Link>
    </div>
  );
}
