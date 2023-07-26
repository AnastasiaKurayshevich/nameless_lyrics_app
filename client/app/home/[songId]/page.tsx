"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { faHome, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(
        `http://localhost:8080/api/songs/${props.params.songId}`
      );
      const data = await response.json();
      console.log(data);
      setSong(data);
    };
    getSongs();
  }, [props.params.songId]);

  const handleDelete = async () => {
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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {song?.songName}
      {song?.songList ? (
        <ul className="song-card shadow-xl">
          {song?.songList.map((lyricPart: LyricPart, index: number) => (
            <li key={index}>
              <h3 className="song-title-done">{lyricPart.lyricTitle}</h3>
              <p className="song-lyric-done">{lyricPart.lyric}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="loading loading-ring loading-lg"></p>
      )}
      <div className="navbar-fixed-bottom">
        <button className="delete-btn btn btn-outline btn-success btn-sm" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
        <Link href="/home">
          <button className="home-btn btn btn-outline btn-success btn-sm">
            <FontAwesomeIcon icon={faHome} className="fa fa-home" />
          </button>
        </Link>
        <Link href={`/home/${song?.id}/edit`}>
        <button className="edit-btn btn btn-outline btn-success btn-sm">
               <FontAwesomeIcon icon={faEdit} />
            </button>
        </Link>
      </div>
    </div>
  );
}
