"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmationModal from "./[songId]/ConfirmationModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`http://localhost:8080/api/songs`);
      const data = await response.json();
      setSongs(data);
      setIsLoading(false);
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

      <div className="song-list">
        {isLoading ? (
          // If isLoading is true, display the loading animation
          <div className="flex justify-center">
            <span className="your-song-loading loading loading-ring loading-lg"></span>
          </div>
        ) : (
          // If isLoading is false, display the song list
          <ul className="flex flex-col justify-center ">
            {[...filteredSongs].reverse().map((song: Song) => (
              <li key={song.id} className="bg-neutral mb-5 rounded-lg">
                <div className="song-list-card flex justify-between items-center">
                  <Link className="card-list-text card-body text-left overflow-hidden" href={`/home/${song.id}`}>
                    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">{song.songName}</p>
                  </Link>

                  <div className="flex-shrink-0 min-w-max">
                    <Link href={`/home/${song.id}/edit`}>
                      <button className="edit-list edit-btn btn-sm mr-5">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </button>
                    </Link>

                    <button
                      className="delete-list delete-btn btn-sm"
                      onClick={() => handleDelete(song.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>

            ))}
          </ul>
        )}

        {showConfirmation && (
          <ConfirmationModal
            message="Are you sure you want to delete this song?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}


      </div>
      <div className="w-full">
       
          <div className="navbar-fixed-bottom">
            <button className="fa-solid fa-circle-plus">
              <Link href="/create">
                <svg
                  className="btn-new-song"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </Link>
            </button>
          </div>
      
      </div>
    </main>



  );
}
