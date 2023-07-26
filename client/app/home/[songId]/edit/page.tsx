"use client";
import React from "react";
import { useEffect, useState } from "react";
import SongStructure from "../../../create/SongStructure";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";



type SongPart = {
  name: string;
  lyrics: string;
};

type RegenerateData = {
  genre: string;
  mood: string;
  description: string;
  songPart: SongPart;
};

type APISongPart = {
  lyricTitle: string;
  lyric: string;
};

type APISong = {
  songList: APISongPart[];
};

type SongToSave = {
  songName: string;
  genre?: string;
  mood?: string;
  description?: string;
  songList: APISongPart[] | undefined;
};

type FormData = {
  genre?: string;
  mood?: string;
  description?: string;
  structure: SongPart[];
};

type Props = {
  params: {
    songId: string;
  };
};

export default function EditPage(props: Props) {
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
  const [songName, setSongName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/songs/${props.params.songId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.songList) {
          setFormData({
            genre: data.genre,
            mood: data.mood,
            description: data.description,
            structure: data.songList.map((songPart: APISongPart) => ({
              name: songPart.lyricTitle,
              lyrics: songPart.lyric,
            })),
          });
          setSongName(data.songName);
        } else {
          throw new Error("songList is undefined in the returned data");
        }
        console.log(data);
        setSongData(data);
      })
      .catch((error) =>
        console.error("Error occurred during the fetch operation", error)
      );
  }, [props.params.songId]);

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
     \n The lyrics you generate should only include the song part name and the lyrics for that part. No other information is required. Do not give the song a name.`;
    return prompt;
  };

  const regeneratePrompt = (data: RegenerateData): string => {
    const { genre, mood, description, songPart } = data;
    const { name, lyrics } = songPart;

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

  const handleModalSave = () => {
    const songToSave: SongToSave = {
      songName: songName || "Untitled",
      genre: formData.genre,
      mood: formData.mood,
      description: formData.description,
      songList: formData.structure?.map((part) => ({
        lyricTitle: part.name,
        lyric: part.lyrics,
      })),
    };

    fetch(`http://localhost:8080/api/songs/${props.params.songId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songToSave),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const songId = data.id;
        console.log("this is song ID: " + songId);
        window.location.href = `/home/${songId}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegeneratePart = (part: SongPart) => {
    setIsGenerating(true);

    const data: RegenerateData = {
      genre: formDataRegenerate.genre || "",
      mood: formDataRegenerate.mood || "",
      description: formDataRegenerate.description || "",
      songPart: part,
    };

    fetch("http://localhost:8080/api/regenerate-part", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: regeneratePrompt(data),
    })
      .then((response) => response.json())
      .then((data: APISongPart) => {
        setIsGenerating(false);
        const updatedStructure = formData.structure!.map((item) =>
          item === part ? { ...item, lyrics: data.lyric } : item
        );
        setStructure(updatedStructure);
      })
      .catch((error) => {
        console.log(error);
        setIsGenerating(false);
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
      <input
        type="text"
        className="input input-bordered input-accent w-full max-w-xs"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />{" "}
      <form onSubmit={handleSubmit} className="form-generate">
        <label>
          <select
            className="select select-accent w-full"
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
            className="select select-accent w-full"
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
            className="textareaa textarea textarea-accent"
            placeholder="Description"
            cols={50}
            rows={5}
            value={formData.description}
            onChange={handleDescriptionChange}
          ></textarea>
        </label>
        <br />
        <button
          className="customise-btn btn btn-outline btn-accent btn-sm"
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
          isGenerating={isGenerating}
        />
        <div className="flex-container">
          {songData ? (
            <>
              <button
                className="buttons-buttom btn btn-outline btn-warning btn-sm"
                type="button"
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                {isGenerating ? "Regenerating..." : "Regenerate all"}
              </button>
              <button
                className="buttons-buttom btn btn-active btn-primary btn-sm"
                type="button"
                onClick={handleModalSave}
                disabled={isGenerating}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="generate-btn btn btn-outline btn-success btn-sm"
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          )}
        </div>
      </form>
      <div className="navbar-fixed-bottom">
      <Link href="/home">
      <button className="home-btn btn btn-outline btn-success btn-sm">
            <FontAwesomeIcon icon={faHome} className="fa fa-home" />
          </button>
      </Link>
      </div>
    </div>
  );
}
