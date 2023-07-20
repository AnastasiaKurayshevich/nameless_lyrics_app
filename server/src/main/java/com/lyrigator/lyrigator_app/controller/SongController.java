package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.openAi.Prompt;
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

    @GetMapping("/songs")
    public ResponseEntity<List<Song>> getAllSongs(){
       List<Song> songList = songService.findAllSongs();
       return ResponseEntity.ok().body(songList);
    }

    @PostMapping("/new-song")
    public ResponseEntity<Song> createSong(@RequestBody Prompt prompt) {
        String message = createAiCall(prompt);
        String response = ai.makePostRequest(message);
        return null;
    }

    private String createAiCall(Prompt prompt) {
       String mood = prompt.mood();
       String genre = prompt.genre();
       String description = prompt.description();
       String structure = prompt.structure();

       String promptMessage =
               "You are a song writer, generate a song based on these parameters: \n mood: " + mood +
                       " \n genre: " + genre + " \n description: " + description + " \n structure: " + structure +
                       " \n If any of the fields are null, generate the whole song based on random parameters. \n If the structure field is " +
                       "not null, you should follow the exact structure. Your response should only contain " +
                       "the " + " lyrics and song part name (like verse, pre-chorus, chorus and etc...). Important: Before and After each song part place wildcard " +
                       "character (*).";
       return promptMessage;
    }

    private List<LyricPart> parseResponse(String aiResponse) {

        return null;
    }








    @PostMapping
    public ResponseEntity<String> postLyricToDb(@RequestBody Song song){
        System.out.println(song.getSongName());
        String response = ai.makePostRequest(song.getSongName());
        System.out.println(response);
        Song aiResponse = new Song();
        aiResponse.setSongName(response);
//        songService.saveLyric(aiResponse);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<String> getLyric() {
        String newLyric = "whatever inside";
        return ResponseEntity.ok().body(newLyric);
    }
}
