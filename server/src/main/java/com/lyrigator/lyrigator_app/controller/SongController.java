package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SongController {
    private final SongService songService;

    private final OpenAiClient ai;

    @Autowired
    public SongController(SongService songService, OpenAiClient ai) {
        this.songService = songService;
        this.ai = ai;
    }

    @GetMapping("/songs")
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songList = songService.findAllSongs();
        return ResponseEntity.ok().body(songList);
    }

    @PostMapping("/new-song")
    public ResponseEntity<Song> createSong(@RequestBody String prompt) {
        String response = ai.makePostRequest(prompt);
        List<LyricPart> lyricParts = parseSong(response);
        System.out.println(prompt);

        Song song = new Song();
        song.setSongList(lyricParts);
        System.out.println(lyricParts);
        return ResponseEntity.ok().body(song);
    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable("id") Integer id) {
        Song song = songService.getSongById(id);
        return ResponseEntity.ok().body(song);
    }

    private static List<LyricPart> parseSong(String songString) {
        List<LyricPart> song = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\*(.*?)\\*\\s*([\\s\\S]*?)(?=\\*|$)");

        Matcher matcher = pattern.matcher(songString);
        while (matcher.find()) {
            String lyricTitle = matcher.group(1).trim();
            String lyric = matcher.group(2).trim();
            song.add(new LyricPart(lyricTitle, lyric));
        }
        return song;
    }

    @PostMapping("/regenerate-part")
    public ResponseEntity<LyricPart> createSongPart(@RequestBody String prompt) {
        String response = ai.makePostRequest(prompt);
        LyricPart regeneratedPart = parseSingleSongPart(response);
        return  ResponseEntity.ok().body(regeneratedPart);
    }

    private static LyricPart parseSingleSongPart(String songPart) {
        Pattern pattern = Pattern.compile("\\*(.*?)\\*\\s*([\\s\\S]*?)(?=\\*|$)");
        Matcher matcher = pattern.matcher(songPart);
        String lyricTitle = matcher.group(1).trim();
        String lyric = matcher.group(2).trim();
        return new LyricPart(lyricTitle, lyric);
    }


    @PostMapping
    public ResponseEntity<String> postLyricToDb(@RequestBody Song song) {
        System.out.println(song.getSongName());
        String response = ai.makePostRequest(song.getSongName());
        System.out.println(response);
        Song aiResponse = new Song();
        aiResponse.setSongName(response);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<String> getLyric() {
        String newLyric = "whatever inside";
        return ResponseEntity.ok().body(newLyric);
    }
}
