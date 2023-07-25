export type SongPart = {
    name: string;
    lyrics: string;
  };
  
  export type RegenerateData = {
    genre: string;
    mood: string;
    description: string;
    songPart: SongPart;
  };
  
  
  export type APISongPart = {
    lyricTitle: string;
    lyric: string;
  };
  
  export type APISong = {
    songList: APISongPart[];
  };
  
  export type SongToSave = {
    songName: string;
    genre?: string;
    mood?: string;
    description?: string;
    songList: APISongPart[] | undefined;
  };
  
  export type FormData = {
    genre?: string;
    mood?: string;
    description?: string;
    structure: SongPart[];
  };