"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmationModal from "./[songId]/ConfirmationModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
<main className="home-page flex flex-col items-center justify-start min-h-screen pt-10">
    <div className="">
        <h2 className="your-songs-title text-5xl text-center">Your Lyrics</h2>
    </div>
  
    <div className="sticky search-bar-div-your-songs top-0 z-10 w-full" style={{ backgroundColor: "#252525" }}>
    <div className="input-section-your-songs flex mx-auto my-2">

            <input
                className="input input-bordered w-full max-w-xs mx-auto"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
            />
        </div>
    </div>

    <div className="w-full pb-20">
    <ul className="flex flex-col justify-center ">
    {[...filteredSongs].reverse().map((song: Song) => (
        <li key={song.id} className="bg-neutral mb-5 rounded-lg">
            <div className="flex justify-between items-center p-5">
                <Link className="card-body text-left overflow-hidden" href={`/home/${song.id}`}>
                    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">{song.songName}</p>
                </Link>

                <div className="flex-shrink-0 min-w-max">
                    <Link href={`/home/${song.id}/edit`}>
                        <button className="btn btn-info btn-sm mr-5">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </Link>

                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(song.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
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
          <div className="navbar-fixed-bottom">
          <button className="add-new-home btn btn-success">
            Create new song
          </button>
          </div>
        </Link>
    </div>
</main>

  
  
  );
}
