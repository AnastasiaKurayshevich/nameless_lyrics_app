"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";

type Song = {
  id: number;
  songName: string;
  songList: LyricPart[];
};

type LyricPart = {
  id: number;
  lyricTitle: string;
  lyric: string;
};

type Props = {
  params: {
    songId: string;
  };
};

export default function Song(props: Props) {
  const [song, setSong] = useState<Song>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(
        `http://localhost:8080/api/songs/${props.params.songId}`
      );
      const data = await response.json();
      setSong(data);
    };
    getSongs();
  }, [props.params.songId]);

  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/songs/${props.params.songId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        window.location.href = "/home";
      } else {
        console.error("Failed to delete the song.");
      }
    } catch (error) {
      console.error(
        "An error occurred while trying to delete the song:",
        error
      );
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="song-name">{song?.songName}</h1>
      {song?.songList ? (
        <ul className="song-card">
          {song?.songList.map((lyricPart: LyricPart, index: number) => (
            <li key={index}>
              <h3 className="song-title-done">{lyricPart.lyricTitle}</h3>
              <p className="song-lyric-done">{lyricPart.lyric}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="your-song-loading-text loading loading-ring loading-lg"></p>
      )}
      <div className="navbar-fixed-bottom">
        <button className="delete-btn btn-sm" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
        <Link href="/home">
          <button className="home-btn btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </button>
        </Link>
        <Link href={`/home/${song?.id}/edit`}>
          <button className="edit-btn btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </button>
        </Link>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="Delete "
          songName={song?.songName || ""}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
