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
  }, [props.params.songId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/songs/${props.params.songId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/home'; 
      } else {
        console.error('Failed to delete the song.');
      }
    } catch (error) {
      console.error('An error occurred while trying to delete the song:', error);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      {song?.songName}
      {song?.songList ? (
        <ul className='card w-96 bg-base-100 shadow-xl'>
          {song?.songList.map((lyricPart: LyricPart, index: number) => (
            <li key={index}>
              <h3 className='song-title-done'>{lyricPart.lyricTitle}</h3>
              <h4 className='song-lyric-done'>{lyricPart.lyric}</h4>
              <h4>{lyricPart.id}</h4>
            </li>
          ))}
        </ul>
      ) : (
        <p className='loading loading-ring loading-lg'></p>
      )}
      <button className='btn btn-error btn-sm' onClick={handleDelete}>
        Delete Song
      </button>
      <Link href="/home"><button className='btn btn-info'>Go to Home</button></Link>
    </div>
  )
}
