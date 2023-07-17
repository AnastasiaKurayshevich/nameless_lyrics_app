package com.lyrigator.lyrigator_app.model;

import com.lyrigator.lyrigator_app.model.JpaLyricRepo;
import org.springframework.stereotype.Repository;

@Repository
public class LyricRepo {
    JpaLyricRepo repo;

    public LyricRepo(JpaLyricRepo repo) {
        this.repo = repo;
    }

    public void saveLyric(Lyric lyric) {
        repo.save(lyric);
    }

}
