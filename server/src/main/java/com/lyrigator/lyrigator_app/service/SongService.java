package com.lyrigator.lyrigator_app.service;

import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.repository.SongRepo;
import org.springframework.stereotype.Service;

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
            songRepo.editSong(songEdit);
        }
        return null;
    }

    public void deleteById(Integer id) {
        songRepo.deleteSongById(id);
    }


}
