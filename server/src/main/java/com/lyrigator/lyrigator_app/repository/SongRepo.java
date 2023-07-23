package com.lyrigator.lyrigator_app.repository;

import com.lyrigator.lyrigator_app.model.Song;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SongRepo {
    JpaSongRepo repo;

    public SongRepo(JpaSongRepo repo) {
        this.repo = repo;
    }

    public void saveLyric(Song song) {
        repo.save(song);
    }

    public List<Song> getListOfSongs(){
        Iterable<Song> list = repo.findAll();
        return Streamable.of(list).toList();
    }

    public Song getSongById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteSongById(int id) {
        repo.deleteById(id);
    }

}
