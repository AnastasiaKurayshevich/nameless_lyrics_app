package com.lyrigator.lyrigator_app.repository;

import com.lyrigator.lyrigator_app.model.Song;
import org.springframework.stereotype.Repository;

@Repository
public class SongRepo {
    JpaSongRepo repo;

    public SongRepo(JpaSongRepo repo) {
        this.repo = repo;
    }

    public void saveLyric(Song song) {
        repo.save(song);
    }


}
