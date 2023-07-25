"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmationModal from "./[songId]/ConfirmationModal";

type Song = {
  id: number;
  songName: string;
  listOfSongs: LyricPart[];
};

type LyricPart = {
  lyricTitle: string;
  lyric: string;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [songToDelete, setSongToDelete] = useState<number | null>(null);

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`http://localhost:8080/api/songs`);
      const data = await response.json();
      setSongs(data);
    };
    getSongs();
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.songName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    console.log("handleDelete called");
    setSongToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmation(false);

    if (songToDelete !== null) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/songs/${songToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const updatedSongs = songs.filter((song) => song.id !== songToDelete);
          setSongs(updatedSongs);
        } else {
          console.error("Failed to delete the song.");
        }
      } catch (error) {
        console.error("An error occurred trying to delete song:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <main className="home-page flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-5xl text-center">Your Lyrics</h2>
      <input
        className="input input-bordered w-full max-w-xs"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <ul className="menu bg-base-200 w-56 rounded-box">
        {filteredSongs.map((song: Song) => (
          <li key={song.id}>
            <Link href={`/home/${song.id}`}>{song.songName}</Link>
            <div>
              <Link href={`/home/${song.id}/edit`}>
                <button className="btn btn-info btn-sm">Edit</button>
              </Link>

              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDelete(song.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you Sure!"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <Link href="/create">
        <button className="add-new-home btn btn-success">
          Create new song
        </button>
      </Link>
    </main>
  );
}
