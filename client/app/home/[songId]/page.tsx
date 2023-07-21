"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'; 

type Song = {
  id: number;
  songName: string;
  songList: LyricPart[];
};

type LyricPart = {
  id: number;
  lyricTitle: string;
  lyric: string;
}

type Props = {
  params: {
    songId: string;
  }
}

export default function Song(props: Props) {
  const [song, setSong] = useState<Song>();


  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`http://localhost:8080/api/songs/${props.params.songId}`);
      const data = await response.json();
      console.log(data);
      setSong(data);
    };
    getSongs();
  }, []);


  return (
    <div>
      {song?.songName}
      {song?.songList ? (
        <ul>
          {song?.songList.map((lyricPart: LyricPart, index: number) => (
            <li key={index}>
              <h3>{lyricPart.lyricTitle}</h3>
              <h4>{lyricPart.lyric}</h4>
              <h4>{lyricPart.id}</h4>
            </li>
          ))}
        </ul>
      ) : (
        <p>LOGO</p>
      )}
      <Link href="/home"><button>Go to Home</button></Link>
    </div>
  )
}
