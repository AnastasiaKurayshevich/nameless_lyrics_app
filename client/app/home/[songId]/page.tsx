"use client"
import React, { useEffect, useState } from 'react'

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
                <ul>{song?.songList.map((lyricPart: LyricPart) => (
                    <li key={lyricPart.id}>
                        <h3>{lyricPart.lyricTitle}</h3>
                        <h4>{lyricPart.lyric}</h4>
                    </li>
                ))}
                </ul>
            ) : (
                <p>Loading...</p> // You can display a loading message while fetching the data
            )}
        </div>
    )
}
