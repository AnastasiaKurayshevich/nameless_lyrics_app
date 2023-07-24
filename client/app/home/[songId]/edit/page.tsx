"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import SongStructure from '../../../create/SongStructure'

type Props = {
  params: {
    songId: string;
  }
}


export default function EditPage(props: Props) {
  return (
    <div>
      <h1>Edit Page</h1>
      <h3>this is the song with id {props.params.songId}</h3>
    </div>
  )
}

