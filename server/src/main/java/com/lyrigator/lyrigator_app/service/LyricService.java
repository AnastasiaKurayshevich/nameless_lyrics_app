package com.lyrigator.lyrigator_app.service;

import com.lyrigator.lyrigator_app.model.Lyric;
import com.lyrigator.lyrigator_app.repository.LyricRepo;
import org.springframework.stereotype.Service;

@Service
public class LyricService {
    LyricRepo lyricRepo;

    public LyricService(LyricRepo lyricRepo) {
        this.lyricRepo = lyricRepo;
    }

    public void saveLyric(Lyric lyric) {
        lyricRepo.saveLyric(lyric);
    }

}
