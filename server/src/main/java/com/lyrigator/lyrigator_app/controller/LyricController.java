package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.Lyric;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.service.LyricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LyricController {
    LyricService lyricService;

    OpenAiClient ai;

    @Autowired
    public LyricController(LyricService lyricService, OpenAiClient ai) {

        this.lyricService = lyricService;
        this.ai = ai;
    }

    @PostMapping
    public ResponseEntity<String> postLyricToDb(@RequestBody Lyric lyric){
        System.out.println(lyric.getTest());
        String response = ai.makePostRequest(lyric.getTest());
        System.out.println(response);
        Lyric aiResponse = new Lyric();
        aiResponse.setTest(response);
        lyricService.saveLyric(aiResponse);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<String> getLyric() {
        String newLyric = "whatever inside";
        return ResponseEntity.ok().body(newLyric);
    }
}
