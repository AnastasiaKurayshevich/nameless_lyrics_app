package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.Lyric;
import com.lyrigator.lyrigator_app.service.LyricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<String> getLyric() {
        String newLyric = "whatever inside";
        return ResponseEntity.ok().body(newLyric);
    }
}
