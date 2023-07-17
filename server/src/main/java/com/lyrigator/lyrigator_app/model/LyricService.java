package com.lyrigator.lyrigator_app.model;

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
