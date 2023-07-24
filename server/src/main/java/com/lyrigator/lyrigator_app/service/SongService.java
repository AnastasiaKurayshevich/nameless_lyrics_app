package com.lyrigator.lyrigator_app.service;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.repository.LyricPartRepo;
import com.lyrigator.lyrigator_app.repository.SongRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SongService {
    SongRepo songRepo;
    LyricPartRepo lyricPartRepo; // add LyricPartRepo here

    public SongService(SongRepo songRepo, LyricPartRepo lyricPartRepo) { // modify the constructor
        this.songRepo = songRepo;
        this.lyricPartRepo = lyricPartRepo; // add this line
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



    @Transactional
    public Song editSong(Integer id, Song existingSong) {
        Song songEdit = songRepo.getSongById(id);
        if (songEdit != null) {
            songEdit.setSongName(existingSong.getSongName());
            songEdit.setGenre(existingSong.getGenre());
            songEdit.setMood(existingSong.getMood());
            songEdit.setDescription(existingSong.getDescription());

            for (LyricPart lyricPart : songEdit.getSongList()) {
                lyricPartRepo.delete(lyricPart);
            }
            songEdit.setSongList(existingSong.getSongList());
            songRepo.saveLyric(songEdit);
            return songEdit;
        }
        return null;
    }

    public void deleteById(Integer id) {
        songRepo.deleteSongById(id);
    }


}
