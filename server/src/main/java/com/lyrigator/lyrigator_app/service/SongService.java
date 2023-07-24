package com.lyrigator.lyrigator_app.service;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.repository.SongRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SongService {
    SongRepo songRepo;

    public SongService(SongRepo songRepo) {
        this.songRepo = songRepo;
    }

    public void saveLyric(Song song) {
        songRepo.saveLyric(song);
    }

    public List<Song> findAllSongs(){
        return songRepo.getListOfSongs();
    }

    public Song getSongById(Integer id) {
        return songRepo.getSongById(id);
    }

    public Song editSong(Integer id, Song existingSong) {
        Song songEdit = songRepo.getSongById(id);
        if (songEdit != null) {
            songEdit.setSongName(existingSong.getSongName());
            songEdit.setGenre(existingSong.getGenre());
            songEdit.setMood(existingSong.getMood());
            songEdit.setDescription(existingSong.getDescription());
            songEdit.setSongList(existingSong.getSongList());
            songRepo.saveLyric(songEdit);
            return songEdit;
        }
        return null;
    }

//    public Song editSong(Integer id, Song existingSong) {
//        Song songEdit = songRepo.getSongById(id);
//        if (songEdit != null) {
//            songEdit.setSongName(existingSong.getSongName());
//            songEdit.setGenre(existingSong.getGenre());
//            songEdit.setMood(existingSong.getMood());
//            songEdit.setDescription(existingSong.getDescription());
//
//            // Create a new list to hold updated lyric parts
//            List<LyricPart> updatedSongList = new ArrayList<>();
//
//            // For each lyric part in the existing song, update it
//            for (LyricPart lyricPart : existingSong.getSongList()) {
//                LyricPart updatedLyricPart = lyricPartService.editLyricPart(lyricPart);
//                updatedSongList.add(updatedLyricPart);
//            }
//
//            songEdit.setSongList(updatedSongList);
//
//            songRepo.editSong(songEdit);
//            return songEdit; // return the updated song
//        }
//        return null;
//    }


    public void deleteById(Integer id) {
        songRepo.deleteSongById(id);
    }


}
