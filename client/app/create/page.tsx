"use client";
import { type } from "os";
import React, { useState } from "react";
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

  const [isVisible, setIsVisible] = useState(false);

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
    console.log(formData.structure);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/new-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data: APISong) => {
        const newStructure = formData.structure!.map((part) => {
          const apiPart = data.songList.find(
            (apiPart) => apiPart.lyricTitle === part.name
          );

          if (apiPart) {
            return { ...part, lyrics: apiPart.lyric };
          } else {
            return part;
          }
        });

        setStructure(newStructure);
      })
      .catch((error) => console.log(error));

    console.log(formData);
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
        <button type="submit" className="btn btn-success btn-sm">
          Generate
        </button>
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
