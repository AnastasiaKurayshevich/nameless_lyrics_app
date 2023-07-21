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
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
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
          </li>
        ))}
      </ul>
      
      <Link href="/create">
        <button className="btn btn-success">Create new song</button>
      </Link>
    </main>
  );
}
