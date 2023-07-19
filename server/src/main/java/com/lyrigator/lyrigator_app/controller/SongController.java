package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SongController {
    SongService songService;

    OpenAiClient ai;

    @Autowired
    public SongController(SongService songService, OpenAiClient ai) {

        this.songService = songService;
        this.ai = ai;
    }

    @GetMapping("/all-songs")
    public ResponseEntity<List<Song>> getAllSongs(){
       List<Song> songList = songService.findAllSongs();
       return ResponseEntity.ok().body(songList);
    }









    @PostMapping
    public ResponseEntity<String> postLyricToDb(@RequestBody Song song){
        System.out.println(song.getLyricName());
        String response = ai.makePostRequest(song.getLyricName());
        System.out.println(response);
        Song aiResponse = new Song();
        aiResponse.setLyricName(response);
        songService.saveLyric(aiResponse);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<String> getLyric() {
        String newLyric = "whatever inside";
        return ResponseEntity.ok().body(newLyric);
    }
}
