package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
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

    @PostMapping("/save-song")
    public ResponseEntity<Song> saveSongToDb(@RequestBody Song song) {
        Song songToSave = new Song();
        songToSave.setSongName(song.getSongName());
        songToSave.setGenre(song.getGenre());
        songToSave.setMood(song.getMood());
        songToSave.setDescription(song.getDescription());
        songToSave.setSongList(song.getSongList());

        songService.saveLyric(songToSave);
        return ResponseEntity.ok().body(songToSave);
    }

    @PostMapping("/regenerate-part")
    public ResponseEntity<LyricPart> createSongPart(@RequestBody String prompt) {
        String response = ai.makePostRequest(prompt);
        System.out.println(response);
        LyricPart regeneratedPart = parseSingleSongPart(response);
        return  ResponseEntity.ok().body(regeneratedPart);
    }

    private static LyricPart parseSingleSongPart(String songPart) {
        String cleanSongPart = songPart.replaceAll("(?m)^\\s*\\r?\\n", "");

        String[] lines = cleanSongPart.split("\n");

        if (lines.length > 1) {
            String firstLine = lines[0].trim();
            String[] possibleTitles = {"INTRO", "VERSE", "CHORUS", "PRE-CHORUS", "BRIDGE"};

            String lyricTitle = "";
            for (String title : possibleTitles) {
                if (firstLine.toUpperCase().startsWith(title)) {
                    lyricTitle = title;
                    break;
                }
            }

            String lyric;
            if (!lyricTitle.isEmpty()) {
                lyric = String.join("\n", Arrays.copyOfRange(lines, 1, lines.length)).trim();
            } else {
                lyric = String.join("\n", lines).trim();
            }

            return new LyricPart(lyricTitle, lyric);
        } else {
            return null;
        }
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

    @PutMapping("/songs/{id}")
    public ResponseEntity<Song> editSong(@PathVariable Integer id, @RequestBody Song song) {
        Song songEdit = songService.editSong(id, song);
        if (songEdit == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(songEdit);
    }

    @DeleteMapping("/songs/{id}")
    public ResponseEntity<Integer> deleteSongById(@PathVariable Integer id) {
        Song songToDelete = songService.getSongById(id);
        if (songToDelete == null){
            return ResponseEntity.notFound().build();
        }
        songService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
