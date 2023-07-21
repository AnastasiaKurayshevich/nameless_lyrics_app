"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

type Song = {
  id: number;
  songName: string;
  listOfSongs: LyricPart[];
};

type LyricPart = {
  lyricTitle: string; 
  lyric: string;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`http://localhost:8080/api/songs`);
      const data = await response.json();
      setSongs(data);
    };
    getSongs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-5xl text-center">Your Lyrics</h2>
      <ul>
        {songs.map((song: Song) => (
          <li key={song.id}>
            <Link href={`/home/${song.id}`}>{song.songName}</Link>
          </li>
        ))}
      </ul>
      <Link href="/create"><button>Create new song bro</button></Link>
    </main>
  );
}
