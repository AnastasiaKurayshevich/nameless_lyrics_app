package com.lyrigator.lyrigator_app.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LyricController {
    LyricService lyricService;

    @Autowired
    public LyricController(LyricService lyricService) {
        this.lyricService = lyricService;
    }

    @PostMapping
    public ResponseEntity<Lyric> postLyricToDb(@RequestBody Lyric lyric){
        lyricService.saveLyric(lyric);
        return ResponseEntity.ok().body(lyric);
    }


}
