package com.lyrigator.lyrigator_app.repository;

import com.lyrigator.lyrigator_app.model.Lyric;
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
